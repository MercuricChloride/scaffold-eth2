import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import AlarmList from "~~/components/AlarmList";
import CreateAlarm from "~~/components/CreateAlarm";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { NavLink } from "~~/components/Header";

const Home: NextPage = () => {
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
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-1/2">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Ethereum Alarm Clock 💰⏰</span>
          </h1>
          <p className="text-center text-lg m-10">
            All billionaires say they wake up at 5, and now you'll be broke if you don't!
          </p>
          <p className="text-center text-lg m-10">
            The idea here is that you set an alarm and attach a stake of eth to it. If you don't wake up on time and disable your alarm, you money wil elligible to be claimed by someone liquidating you and they get your stake.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex flex-row items-center justify-center">
            <Link
              href="/alarms"
            >
              <button className="flex flex-row items-center justify-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <SparklesIcon className="w-6 h-6 mr-2" />
                <span>Get Started</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
