import Head from "next/head";
import Link from "next/link";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import AlarmList from "~~/components/AlarmList";
import CreateAlarm from "~~/components/CreateAlarm";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const AlarmCard = ({ alarm }: { alarm: any }) => {
  const { user, alarmTime, valueStake } = alarm;

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "missAlarm",
    args: [user],
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  console.log(alarmTime.toNumber());

  const currentTime = new Date().getTime();

  let timeStamp = new Date(alarmTime.toNumber()).toTimeString();
  const regex = /(\d{1,2}):(\d{2})/;
  const time = regex.exec(timeStamp);

  if (time === null) return <div> Error </div>;
  if (Number(time[1]) > 12) {
    time[1] = (Number(time[1]) - 12).toString();
    time[2] = time[2] + "pm";
  } else {
    time[2] = time[2] + "am";
  }

  const timeString = time[1] + ":" + time[2];

  return (
    <div className="flex flex-col justify-center items-center p-6 m-6 w-full">
      <h1> Active Alarm: </h1>
      <div className="flex-col">
        <h3> Stake: {ethers.utils.formatEther(valueStake.toString())} Eth </h3>
        <h3> Deadline: {timeString} </h3>
        <h3> CreatedBy: {<Address address={user.toString()} disableAddressLink />} </h3>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-sm m-3" disabled={alarmTime.toNumber() > currentTime} onClick={writeAsync}>
          {" "}
          WAKE THEM UP{" "}
        </button>
        <Link href={"/" + user.toString()}>
          <button className="btn btn-sm m-3"> User Stats </button>
        </Link>
      </div>
    </div>
  );
};

const ExampleUI: NextPage = () => {
  const { address, isConnected } = useAccount();

  const { data: alarm } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "alarms",
    args: [address],
  });

  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "AlarmSet",
    fromBlock: 0,
  });

  function alarmSet(alarm: any | undefined) {
    return alarm ? alarm.valueStake.toString() !== "0" : false;
  }

  return (
    <>
      <Head>
        <title>All Active Clocks</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-4 flex-grow bg-base-100">
        {isLoadingEvents ? (
          <div className="col-span-4 row-span-full flex justify-center items-center">Loading...</div>
        ) : events?.length > 0 ? (
          events.map(event => {
            const alarm = {
              user: event.args.user,
              alarmTime: event.args.alarmTime,
              valueStake: event.args.valueStake,
            };
            return <AlarmCard alarm={alarm} />;
          })
        ) : (
          <div className="col-span-4 row-span-full flex justify-center items-center">No alarms set yet!</div>
        )}
      </div>
    </>
  );
};

export default ExampleUI;
