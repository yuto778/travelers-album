import React from "react";
import Header from "../../../components/Header";
import Image from "next/image";
import { Button } from "../../../components/ui/button";

const Page = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 背景画像用のコンテナ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/routephoto.jpg"
          alt="route photo"
          fill
          className="opacity-50 object-cover"
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 h-full flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-around py-40">
          <h2 className="text-black mb-4 text-3xl">
            家族や友達との旅行記録を残しませんか
          </h2>
          <Button>ログインへ</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
