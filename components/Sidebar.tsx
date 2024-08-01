import { cn } from "../@/lib/utils";
import React from "react";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center pt-3 px-1 bg-yellow-200 ",
          className
        )}
      >
        <div className=" p-2 w-full h-auto space-y-1 flex flex-col  hover:scale-105 transition cursor-pointer group">
          <span className="w-full h-1 bg-gray-700 group-hover:bg-black"></span>
          <span className="w-full h-1 bg-gray-700 group-hover:bg-black"></span>
          <span className="w-full h-1 bg-gray-700 group-hover:bg-black"></span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
