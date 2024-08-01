import React from "react";
import Header from "../../../../components/Header";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "メンバーの追加",
  description: "メンバーを追加します",
  icons: {
    icon: "/favicon.png",
  },
};

const page = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header menu />
      <div className="flex-1  flex flex-col  px-10 md:px-28 py-10 bg-gradient-to-b from-green-300 to-green-200">
        <h2 className="text-3xl">Add Member</h2>
        <div className="flex-1 flex flex-col items-center   py-32 px-10 ">
          <div className="flex items-center  w-auto md:w-2/3  ">
            <label htmlFor="member" className="text-xl  whitespace-nowrap px-5">
              ID検索 :
            </label>
            <Input
              id="member"
              type="text"
              className="rounded-lg pr-5 shadow-custom-shadow cursor-pointer"
            />
          </div>
          <span className="flex-1"></span>
          <Button
            variant="outline"
            className="bg-yellow-400 hover:bg-yellow-500 shadow-custom-shadow hover:shadow-none "
          >
            新規メンバーを登録！
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
