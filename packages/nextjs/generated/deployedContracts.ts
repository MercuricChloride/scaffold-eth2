const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        YourContract: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "alarmTime",
                  type: "uint256",
                },
              ],
              name: "AlarmAlreadySet",
              type: "error",
            },
            {
              inputs: [],
              name: "SendFundsError",
              type: "error",
            },
            {
              inputs: [],
              name: "cantSlashYourself",
              type: "error",
            },
            {
              inputs: [],
              name: "invalidDeadline",
              type: "error",
            },
            {
              inputs: [],
              name: "invalidStake",
              type: "error",
            },
            {
              inputs: [],
              name: "onlyUser",
              type: "error",
            },
            {
              inputs: [],
              name: "userStillSleeping",
              type: "error",
            },
            {
              inputs: [],
              name: "youShouldBeSleeping",
              type: "error",
            },
            {
              inputs: [],
              name: "youSleptIn",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "alarmTime",
                  type: "uint256",
                },
              ],
              name: "AlarmDismissed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "dismisser",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "valueLost",
                  type: "uint256",
                },
              ],
              name: "AlarmMissed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "alarmTime",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "valueStake",
                  type: "uint256",
                },
              ],
              name: "AlarmSet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "alarms",
              outputs: [
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "valueStake",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "dismissAlarm",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "missAlarm",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "valueStake",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "setAlarm",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "userStats",
              outputs: [
                {
                  internalType: "uint128",
                  name: "onTimeAlarms",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "missedAlarms",
                  type: "uint128",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
