"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Cardadd = () => {
  return (
    <>
      <div className="bg-green-400 bg-opacity-25 w-1/2 rounded-xl shadow-custom-shadow flex flex-col px-10 py-10">
        <h2 className="text-center text-2xl">カードを追加</h2>
        <div className="px-14 py-10 flex flex-col justify-around space-y-10 ">
          <div className="flex space-x-5  items-center justify-center ">
            <h2 className="text-xl flex-1 text-right ">タイトル :</h2>
            <Input className="w-3/4" />
          </div>
          <div className="flex space-x-5 justify-center items-center">
            <h2 className="text-xl flex-1 text-right">写真 :</h2>
            <Input className="w-3/4" />
          </div>
          <div className="flex space-x-5 justify-center items-center">
            <h2 className="text-xl flex-1 text-right">メモ :</h2>
            <Input className="w-3/4" />
          </div>
        </div>
        <Button variant="outline" className="self-center px-10 py-5">
          カードを追加
        </Button>
      </div>
    </>
  );
};

export default Cardadd;
