import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { SparklesIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
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
            The idea here is that you set an alarm and attach a stake of eth to it. If you don't wake up on time and
            disable your alarm, you money will then be elligible to be claimed by someone liquidating you and they get
            your stake.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex flex-row items-center justify-center">
            <Link href="/alarms">
              <button className="btn flex flex-row items-center justify-center px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm ">
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
