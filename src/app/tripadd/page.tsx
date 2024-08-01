import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import TripAddForm from "../../../components/TripAddForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "旅行追加画面",
  description: "旅行カードを追加できます",
  icons: {
    icon: "/favicon.png",
  },
};

const page = () => {
  return (
    <>
      <div className="h-screen w-full bg-gradient-to-b from-white to-black flex flex-col">
        <Header menu />
        <div className="flex-1 flex flex-col ">
          <div className=" flex-1">
            <TripAddForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
