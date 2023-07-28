import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { TreeCard } from "~~/components/TreeCard";

const CardRow = ({ title, children, className, containerClassName }: { title: string; children: React.ReactNode, className?: string, containerClassName?: string }) => {
  return (
    <div className={`flex flex-col w-screen mx-6 ${containerClassName}`}>
      <p className="text-center text-4xl">{title}</p>
      <div className={`flex ${className} flex-nowrap overflow-scroll gap-10`}>{children}</div>
    </div>
  );
};

const LandingPage = () => {
  return (
      <>
          <img src='./tech_tree_background.png' className="relative top-0 left-0 min-w-screen w-screen -z-1 p-0" />
          <div className="absolute top-44 right-1/4 rounded-full bg-orange-500 w-32 h-32 border-black border-2"> </div>
          <div className="absolute top-44 left-44 p-12 rounded-2xl bg-yellow-50 text-4xl border-black border-2">
            Welcome To Our <br /> Tech Tree!
          </div>
          <div className="absolute top-44 right-1/4 rounded-full bg-orange-500 w-32 h-32 border-black border-2"> </div>
      </>
  );
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eth Tech Tree</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="bg-primary">
          <div className="flex flex-col">
          <LandingPage />
            <CardRow title="Start Here!" className="justify-center" containerClassName="-mt-40 z-50">
              <TreeCard text="First thang"/>
            </CardRow>
            <CardRow title="Anotha one!">
              <TreeCard text="Another thang" />
              <TreeCard text="Another thang" />
              <TreeCard text="Another thang" />
              <TreeCard text="Another thang" />
              <TreeCard text="Another thang" />
              <TreeCard text="Another thang" />
              <TreeCard text="Another thang" />
              <TreeCard text="Another thang" />
            </CardRow>
          </div>
      </div>
    </>
  );
};

export default Home;
