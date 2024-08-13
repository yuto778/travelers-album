import React from "react";
import Header from "../../../../components/Header";
import Image from "next/image";
import "../../../../styles/global.css";

const Users = ["ゆう", "すずき", "さとさん", "なお"];

const page = ({ params: { userid } }: { params: { userid: string } }) => {
  const datafetch = () => {
    // useridでデータフェッチ
    userid;
  };
  return (
    <div className="h-screen w-full layer-gradient flex flex-col">
      <Header menu />
      <div className="flex-1 flex items-center justify-center ">
        <div className="h-3/4 w-1/2 bg-green-400 bg-opacity-25 rounded-xl shadow-custom-shadow  px-20  py-7 space-y-10 ">
          <h2 className="text-center text-2xl font-bold">登録者一覧</h2>
          <div className="grid grid-cols-2 gap-5 ">
            {Users.map((user, index) => (
              <div
                key={index}
                className="border-b-2 border-gray-400 flex items-center  pb-2 px-10"
              >
                <div className="size-12 bg-slate-500 relative rounded-full overflow-hidden">
                  <Image
                    src={"/images/routephoto.jpg"}
                    fill
                    className="object-cover"
                    alt="プロフィール写真"
                  />
                </div>
                <span className="flex-1"></span>
                <h2 className="text-xl ">{user}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
