import React from "react";
import Header from "../../../../components/Header";
import { Circle, X } from "lucide-react";
import Notifi from "./Notifi";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-neutral-100 to-green-700">
      <Header menu />
      <div className="flex-1 flex items-center justify-center ">
        <div className="bg-green-400 bg-opacity-25 h-2/3 w-1/2 flex flex-col items-center px-10 py-10 shadow-custom-shadow rounded-xl ">
          <h2 className="text-xl font-bold ">通知</h2>
          <div className="flex flex-col w-full justify-center h-2/3">
            <Notifi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
