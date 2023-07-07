import { BigNumber, ethers } from "ethers";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const alarms = [
    {
        id: 1,
        name: "Alarm 1",
        stake: "500 eth",
        time: "4am"
    },
    {
        id: 2,
        name: "Alarm 2",
        stake: "420 eth",
        time: "69am"
    },
];

export interface Alarm {
    valueStake: BigNumber;
    deadline: BigNumber;
}

interface AlarmListProps {
    alarm: Alarm;
}

export default function AlarmList({alarm}: AlarmListProps) {
    let {valueStake, deadline} = alarm;

    const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "dismissAlarm",
        args: [],
        // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
        blockConfirmations: 1,
        // The callback function to execute when the transaction is confirmed.
        onBlockConfirmation: (txnReceipt) => {
            console.log("Transaction blockHash", txnReceipt.blockHash);
        },
    });

    const currentTime = new Date();
    let timeLeft = (deadline.toNumber() - currentTime.getTime()) / 1000;

    let timeStamp = new Date(deadline.toNumber()).toTimeString()
    const regex = /(\d{1,2}):(\d{2})/;
    const time = regex.exec(timeStamp);

    if (time[1] > 12) {
        time[1] = (time[1] - 12).toString();
        time[2] = time[2] + "pm";
    } else {
        time[2] = time[2] + "am";
    }

    const timeString = time[1] + ":" + time[2];

    function canDismiss() {
        // should be able to dismiss if the time left is 1 hour or less
        return !(timeLeft < 3600)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1> Active Alarm: </h1>
            <div className="flex-col">
                <h3> Stake: {ethers.utils.formatEther(valueStake.toString())} Eth </h3>
                <h3> Deadline: {timeString} </h3>
                <button className="btn" disabled={canDismiss()} onClick={writeAsync}> Dismiss Alarm </button>
            </div>
        </div>
    );
}
