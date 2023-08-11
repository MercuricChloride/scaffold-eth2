import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { TreeCard } from "~~/components/TreeCard";
import { useState } from "react";

const LandingPage = () => {
  return (
      <>
          <img src='./tech_tree_background.png' className="relative top-0 left-0 min-w-screen w-screen -z-1 p-0 m-0" />
          <div className="absolute top-44 right-1/4 rounded-full bg-orange-500 w-32 h-32 border-black border-2"> </div>
          <div className="absolute top-44 left-44 p-12 rounded-2xl bg-yellow-50 text-4xl border-black border-2">
            Welcome To Our <br /> Tech Tree!
          </div>
          <div className="absolute top-44 right-1/4 rounded-full bg-orange-500 w-32 h-32 border-black border-2"> </div>
      </>
  );
}

const CardRow = ({ title, children, className, containerClassName }: { title: string; children: React.ReactNode, className?: string, containerClassName?: string }) => {
  return (
    <div className={`flex flex-col my-6 px-6 w-screen ${containerClassName}`}>
      <p className="text-center text-4xl">{title}</p>
      <div className={`flex ${className} flex-nowrap overflow-scroll gap-10`}>{children}</div>
    </div>
  );
};


const Home: NextPage = () => {
  const [level, setLevel] = useState(0);

  return (
    <>
      <Head>
        <title>Eth Tech Tree</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="bg-primary">
          <div className="flex flex-col">
          <LandingPage />
            <CardRow title="Start Here!" className="justify-center" containerClassName="-mt-50 z-50">
              <TreeCard setLevel={setLevel} level={level} unlockLevel={0} text="Speedrun Ethereum" image="./lil_dude.png"/>
            </CardRow>
            <CardRow title="Level Up!" className="justify-center" containerClassName="-mt-50 z-50">
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={1} text="Challenge Timing + incentives"/>
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={1} text="Challenge 3. Dice Games"/>
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={1} text="Token Wrapper WETH"/>
            </CardRow>
            <CardRow title="Level Up 2!">
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={2} text="Token WALLET" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={2} text="Build your own Simple Smart Contract Wallet" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={2} text="Run your own node EL && CL" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={2} text="Price Feed" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={2} text="Dex Challenge" />
            </CardRow>
            <CardRow title="Level Up 3!">
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Token WALLET" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Build your own Simple Smart Contract Wallet" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Run your own node EL && CL" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Price Feed" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Dex Challenge" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Run your own node EL && CL" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Price Feed" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={3} text="Dex Challenge" />
            </CardRow>
            <CardRow title="LAST ROUNDS!!!">
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={4} text="1v1 Vitalik" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={4} text="Think about whether or not the uniswap v3 license is cool" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={4} text="Decide it isn't" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={4} text="????" />
              <TreeCard image="lil_dude.png" setLevel={setLevel} level={level} unlockLevel={4} text="Profit!" />
            </CardRow>
          </div>
      </div>
    </>
  );
};

export default Home;
