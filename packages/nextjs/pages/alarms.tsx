import Head from "next/head";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import AlarmList from "~~/components/AlarmList";
import CreateAlarm from "~~/components/CreateAlarm";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const ExampleUI: NextPage = () => {
  const { address, isConnected } = useAccount();

  const { data: alarm } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "alarms",
    args: [address],
  });

  function alarmSet(alarm: any | undefined) {
    return alarm ? alarm.valueStake.toString() !== "0" : false;
  }

  return (
    <>
      <Head>
        <title>Ethereum Alarm Clock</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-1 flex-grow bg-base-300">
        {isConnected && address ? (
          alarmSet(alarm as any) ? (
            <AlarmList alarm={alarm as any} />
          ) : (
            <CreateAlarm userAddress={address} />
          )
        ) : (
          <div className="flex justify-center items-center">
            <h1> Please connect your wallet to create an alarm {":)"} </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ExampleUI;
