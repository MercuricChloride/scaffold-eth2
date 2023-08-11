import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export interface TreeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  level: number;
  unlockLevel: number;
  setLevel: (level: number) => void;
  image: string;
  onClick?: () => void;
}

export const TreeCard = ({ text, className, level, setLevel, unlockLevel, onClick, image }: TreeCardProps) => {

  const increaseLevel = () => {
    if (level == unlockLevel) {
      setLevel(level + 1);
    }
  }

  return (
      <div
        className={`flex flex-shrink-0 flex-col justify-end mt-6 rounded-[40px] shadow-lg border-2 border-primary w-72 h-72 ${className}`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          filter: level >= unlockLevel ?"grayscale(0)": "grayscale(1)"
        }}
      >
          <div className={`p-2 rounded-full shadow-lg border-2 bg-green-500 cursor-pointer`} onClick={increaseLevel}>
              <p className="text-center">{text}</p>
          </div>
      </div>
  );
};
