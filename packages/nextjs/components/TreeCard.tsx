import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export interface TreeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const TreeCard = ({ text, className }: TreeCardProps) => {
  return (
      <div
        className={`flex flex-shrink-0 flex-col justify-end mt-6 rounded-[40px] shadow-lg border-2 border-primary w-72 h-72 ${className}`}
        style={{
          backgroundImage: "url(./lil_dude.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <a href="https://buidlguidl.com">
          <div className="p-2 rounded-full shadow-lg border-2 bg-green-500">
              <p className="text-center">{text}</p>
          </div>
        </a>
      </div>
  );
};
