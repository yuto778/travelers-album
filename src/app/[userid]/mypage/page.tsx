import React from "react";
import Header from "../../../../components/Header";

const page = ({ params: { userid } }: { params: { userid: string } }) => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <Header menu />
      <div className="flex flex-col py-5 px-20 bg-gradient-to-b from-green-400 to-green-200 flex-1">
        <h2 className="text-xl">{userid}:userid</h2>
      </div>
    </div>
  );
};

export default page;
