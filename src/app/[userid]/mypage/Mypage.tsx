"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

interface MypageProps {
  password: string;
}

const Mypage: React.FC<MypageProps> = ({ password }) => {
  const [isUseridUpdateModalOpen, setIsUseridUpdateModalOpen] = useState(false);
  const [isUserEmailUpdateModalOpen, setIsUserEmailUpdateModalOpen] =
    useState(false);
  const [isUserPasswordUpdateModalOpen, setIsUserPasswordUpdateModalOpen] =
    useState(false);
  const { data: session } = useSession();

  const handleUseridUpdate = async () => {};

  return (
    <>
      <div className="flex items-center justify-center flex-1 ">
        <div className="bg-green-400 bg-opacity-25 px-20 py-10 w-1/2 rounded-2xl shadow-custom-shadow flex flex-col items-center space-y-5  ">
          <h2 className="text-2xl font-bold">マイページ</h2>
          <div className="flex w-2/3  justify-around items-center ">
            <div className="bg-gray-400 size-20 rounded-full relative overflow-hidden">
              <Image
                src={"/images/routephoto.jpg"}
                fill
                className="object-cover"
                alt="仮の写真です"
              />
            </div>
            <span className="underline text-xl">{session.user.name}</span>
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">ユーザーID</h2>
            <h2
              className="bg-white px-3 py-1 rounded-sm overflow-x-auto whitespace-nowrap cursor-pointer"
              onClick={() => setIsUseridUpdateModalOpen(true)}
            >
              {session.user.id}
            </h2>
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">メールアドレス</h2>
            <h2
              className="bg-white px-3 py-1 rounded-sm cursor-pointer"
              onClick={() => setIsUserEmailUpdateModalOpen(true)}
            >
              {session.user.email}
            </h2>
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">パスワード</h2>
            <h2
              className="bg-white px-3 py-1  rounded-sm overflow-x-auto whitespace-nowrap cursor-pointer"
              onClick={() => setIsUserPasswordUpdateModalOpen(true)}
            >
              {"*".repeat(password.length)}
            </h2>
          </div>
        </div>
      </div>
      {isUseridUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={() => setIsUseridUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-1/3 overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              ユーザーIDを変更
            </h2>
            <div
              onClick={() => setIsUseridUpdateModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <div className="py-10 md:px-10 lg:px-16 self-center">
              <p>本当に「{session.user.id}」を変更しますか</p>
            </div>
            <span className="flex-1"></span>
            <Button
              variant="destructive"
              className="self-center py-5 px-7 shadow-custom-shadow hover:shadow-none"
              onClick={handleUseridUpdate}
            >
              更新
            </Button>
          </div>
        </div>
      )}
      {isUserEmailUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={() => setIsUserEmailUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              メールアドレスを変更
            </h2>
            <div
              onClick={() => setIsUserEmailUpdateModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <div className="py-10 md:px-10 lg:px-16 self-center">
              <p>本当に「{session.user.email}」を変更しますか</p>
            </div>
            <span className="flex-1"></span>
            <Button
              variant="destructive"
              className="self-center py-5 px-7 shadow-custom-shadow hover:shadow-none"
              onClick={handleUseridUpdate}
            >
              更新
            </Button>
          </div>
        </div>
      )}
      {isUserPasswordUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={() => setIsUserPasswordUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              パスワードを変更
            </h2>
            <div
              onClick={() => setIsUserPasswordUpdateModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <div className="py-10 md:px-10 lg:px-16 self-center">
              <p>本当に「{password}」を変更しますか</p>
            </div>
            <span className="flex-1"></span>
            <Button
              variant="destructive"
              className="self-center py-5 px-7 shadow-custom-shadow hover:shadow-none"
              onClick={handleUseridUpdate}
            >
              更新
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
