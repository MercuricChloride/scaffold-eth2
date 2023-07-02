import { ethers } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface CreateAlarmProps {
    userAddress: string;
}

export default function CreateAlarm({ userAddress }: CreateAlarmProps) {
    // alarm config
    const [checked, setChecked] = useState(false); // if checked is false, it is an AM alarm
    const [hour, setHour] = useState(0); // this is a string so we can concat
    const [min, setMin] = useState(0); // this is a string so we can concat
    const [valueStake, setValueStake] = useState("1");

    const {address} = useAccount();

    const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "setAlarm",
        args: [getAlarmTime(checked, hour, min), valueStake, address],
        // For payable functions, expressed in ETH
        value: ethers.utils.formatEther(valueStake),
        // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
        blockConfirmations: 1,
        // The callback function to execute when the transaction is confirmed.
        onBlockConfirmation: (txnReceipt) => {
            console.log("Transaction blockHash", txnReceipt.blockHash);
        },
    });

    function setAlarm () {
        writeAsync();
    }

    function getAlarmTime(isAm: boolean, hour: number, min: number) {
        let currentTime = new Date();

        let alarmTime = new Date();
        // if it isn't in AM, add 12 hours
        if (!isAm) {
            alarmTime.setHours(hour + 12);
        } else {
            alarmTime.setHours(hour);
        }
        alarmTime.setMinutes(min);

        if (alarmTime < currentTime) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }

        return alarmTime.getTime();
    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-center mb-8">
                <span className="block text-4xl font-bold">Create an alarm!</span>
            </h1>
            <div className="flex flex-col items-center justify-center p-6">
                <h3> What time do you need to wake up? </h3>
                <div className="flex items-center justify-center">
                    <select className="select w-1/4 max-w-xs m-6" onChange={(e) => {
                        setHour(e.target.value)
                    }}>
                        <option disabled selected>Hour to wake up</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                    </select>

                    <select className="select w-1/4 max-w-xs m-6" onChange={(e) => {
                        setMin(e.target.value)
                    }}>
                        <option disabled selected>Min</option>
                        <option value={0}>:00</option>
                        <option value={15}>:15</option>
                        <option value={30}>:30</option>
                        <option value={45}>:45</option>
                    </select>

                    <label className="swap">
                        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                        <div className="swap-off">AM</div>
                        <div className="swap-on">PM</div>
                    </label>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center">
                <h3> How bad do you need to wake up? </h3>
                <select className="select w-full max-w-xs m-6" onChange={(e) => {
                    setValueStake(e.target.value)
                }}>
                    <option disabled selected>Stake</option>
                    <option value={ethers.utils.parseEther("1")}>1 eth (I NEED TO BE UP)</option>
                    <option value={ethers.utils.parseEther("0.1")}>0.1 eth (Very bad)</option>
                    <option value={ethers.utils.parseEther("0.01")}>0.01 eth (A good amount)</option>
                    <option value={ethers.utils.parseEther("0.001")}>0.001 eth (A non zero amount)</option>
                </select>
            </div>

            <div className="flex flex-col justify-center items-center">
                <button className="btn bg-primary" onClick={setAlarm}> SET ALARM </button>
            </div>
        </div>
    )
}
