import React from "react";
import Header from "../../../../components/Header";

const page = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-neutral-100 to-green-700 flex flex-col">
      <Header menu />
      <div className="flex-1 flex items-center justify-center ">
        <div className="h-3/4 w-1/2 bg-green-400 bg-opacity-25 rounded-xl shadow-custom-shadow  px-20  py-7 space-y-10 ">
          <h2 className="text-center text-2xl font-bold">登録者一覧</h2>
          <div className="grid grid-cols-2 gap-5 ">
            <div className="border-b-2 border-gray-400 flex items-center  pb-2 px-10 ">
              <div className="size-12 bg-slate-500 rounded-full "></div>
              <span className="flex-1"></span>
              <h2 className="text-xl ">ゆう</h2>
            </div>
            <div className="border-b-2 border-gray-400 flex items-center  pb-2 px-10">
              <div className="size-12 bg-slate-500 rounded-full"></div>
              <span className="flex-1"></span>
              <h2 className="text-xl ">すずき</h2>
            </div>
            <div className="border-b-2 border-gray-400 flex items-center  pb-2 px-10">
              <div className="size-12 bg-slate-500 rounded-full"></div>
              <span className="flex-1"></span>
              <h2 className="text-xl ">さとさん</h2>
            </div>
            <div className="border-b-2 border-gray-400 flex items-center  pb-2 px-10">
              <div className="size-12 bg-slate-500 rounded-full"></div>
              <span className="flex-1"></span>
              <h2 className="text-xl ">なお</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
