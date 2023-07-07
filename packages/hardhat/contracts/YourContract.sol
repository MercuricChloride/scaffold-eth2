//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error AlarmAlreadySet(uint256 alarmTime);
error SendFundsError();
error onlyUser();
error invalidStake();
error invalidDeadline();
error youSleptIn();
error youShouldBeSleeping();

error userStillSleeping();
error cantSlashYourself();

/**
 * A smart contract that allows users to create alarm clocks with financial stake to lose if they don't wake up on time.
 * @author BlindNabler
 */
contract YourContract {
  // State Variables
  // user -> Alarm config
  mapping(address user => Alarm) public alarms;
  // user -> stats
  mapping(address user => UserStats) public userStats;

  struct Alarm {
    uint256 deadline;
    uint256 valueStake;
  }

  struct UserStats {
    uint128 onTimeAlarms;
    uint128 missedAlarms;
  }

  // Events: a way to emit log statements from smart contract that can be listened to by external parties
  event AlarmSet(address indexed user, uint256 indexed alarmTime, uint256 indexed valueStake);
  event AlarmDismissed(address indexed user, uint256 indexed alarmTime);
  event AlarmMissed(address indexed user, address indexed dismisser, uint256 indexed valueLost);

  modifier onlyAlarmNotSet(address user) {
    Alarm memory alarm = alarms[user];

    if (alarm.deadline != 0 && alarm.deadline != 0) {
      revert AlarmAlreadySet(alarms[user].deadline);
    }
    _;
  }

  modifier onlyAlarmIsSet(address user) {
    Alarm memory alarm = alarms[user];
    if (alarm.deadline > block.timestamp) revert youSleptIn();
    _;
  }

  function setAlarm(uint256 deadline, uint256 valueStake, address user) public payable onlyAlarmNotSet(user) {
    if (msg.sender != user) revert onlyUser();
    if (msg.value != valueStake) revert invalidStake();
    if (block.timestamp >= deadline) revert invalidDeadline();

    alarms[user] = Alarm(deadline, valueStake);
    emit AlarmSet(user, deadline, valueStake);
  }

  function dismissAlarm() public {
    Alarm memory alarm = alarms[msg.sender];
    if (alarm.deadline < block.timestamp + 1 hours) revert youSleptIn();
    if (alarm.deadline > block.timestamp) revert youShouldBeSleeping();
    _sendFunds(alarm.valueStake, msg.sender, msg.sender);
    userStats[msg.sender].onTimeAlarms++;
    emit AlarmDismissed(msg.sender, alarm.deadline);
  }

  function missAlarm(address user) public {
    Alarm memory alarm = alarms[user];
    if (alarm.deadline > block.timestamp) revert userStillSleeping();
    if (user == msg.sender) revert cantSlashYourself();

    _sendFunds(alarm.valueStake, user, msg.sender);
    userStats[user].missedAlarms++;
    emit AlarmMissed(user, msg.sender, alarm.valueStake);
  }

  function _sendFunds(uint256 amount, address user, address recipient) internal {
    if (alarms[user].deadline == 0) {
      revert SendFundsError();
    }
    delete alarms[user];

    (bool success, ) = recipient.call{value: amount}("");

    if (!success) {
      revert SendFundsError();
    }
  }

  /**
   * Function that allows the contract to receive ETH
   */
  receive() external payable {}
}
