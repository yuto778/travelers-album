import { Metadata } from "next";
import React from "react";
import Header from "../../../../../components/Header";

// メタデータの設定
export const metadata: Metadata = {
  title: "写真",
  description: "カードに保存されている写真を表示します",
  icons: {
    icon: "/favicon.png",
  },
};

// params:{id}でurlの[id]を取得
const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <div className="h-screen w-full flex flex-col">
        {/* /components/Header.tsx */}
        <Header menu />
        <div className="flex-1 w-full flex flex-col overflow-hidden">
          <div className="h-16 w-full flex items-center justify-center bg-blue-200">
            {id} : page
          </div>
          <div className="flex-1 bg-gradient-to-b from-green-300 to-green-200 px-10 py-6 grid grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
