import React from "react";
import Header from "../../../../components/Header";
import { Input } from "../../../../components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "マイページ",
  icons: {
    icon: "/favicon.png",
  },
};

// params:{userid}でurlの[userid]を取得
const page = ({ params: { userid } }: { params: { userid: string } }) => {
  const datafetch = async () => {
    // データフェッチ(userid)
  };
  return (
    <div className="w-full h-screen flex flex-col  bg-gradient-to-b from-neutral-100 to-green-700">
      {/* /components/Header.tsx */}
      <Header menu />
      <div className="flex items-center justify-center flex-1 ">
        <div className="bg-green-400 bg-opacity-25 px-20 py-10 w-1/2 rounded-2xl shadow-custom-shadow flex flex-col items-center space-y-5  ">
          <h2 className="text-2xl font-bold">マイページ</h2>
          <div className="flex w-2/3  justify-around items-center ">
            <div className="bg-gray-400 size-20 rounded-full"></div>
            <span className="underline text-xl">名前</span>
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">ユーザーID</h2>
            <Input />
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">メールアドレス</h2>
            <Input />
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">パスワード</h2>
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
