"use client";

import {
  BellIcon,
  BookUserIcon,
  CircleUserIcon,
  Home,
  LogOutIcon,
  Pen,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "../@/lib/utils";
import Hamburger from "./Hamburger";
import { signOut, useSession } from "next-auth/react";
import { getNotification } from "@/action/getNotification";

type Variant = "notification" | "none";

interface HeaderProps {
  menu?: boolean;
  className?: string;
  userid?: string;
  notifications: {
    id: string;
    user_id: string;
    fellow_id: string;
  }[];
}

const HeaderClient: React.FC<HeaderProps> = ({ menu, notifications }) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const handlelogout = () => {
    router.push("/login");
  };

  return (
    <>
      <div
        className={cn(
          "h-20 flex items-center justify-between  px-4  md:h-20 md:px-12 "
        )}
      >
        <Link
          href={`/${session?.user.id}/board`}
          className="font-bold text-2xl md:text-2xl cursor-pointer"
        >
          Travelers Album
        </Link>
        <span className="flex-1"></span>
        {menu && (
          <>
            <div className="md:flex items-center space-x-5 hidden px-5">
              <h2>{session?.user.name}</h2>
              <div className="flex flex-col relative w-16  rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
                <Home className="self-center " />
                <h2 className="text-xs ">ホーム</h2>
                <Link
                  href={`/${session?.user.id}/board`}
                  className="absolute inset-0"
                ></Link>
              </div>
              <div className="flex flex-col relative w-16  rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
                <div className="relative ">
                  <BellIcon className="self-center " />
                  {notifications?.length > 0 && (
                    <span className="h-2 w-2 rounded-full bg-red-600 absolute top-0 right-0 "></span>
                  )}
                </div>
                <h2 className="text-xs ">通知</h2>
                <Link
                  href={`/${session?.user.id}/notification`}
                  className="absolute inset-0"
                ></Link>
              </div>
              <div className="flex flex-col relative w-16 rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
                <Pen className="self-center" />
                <h2 className="text-xs ">追加</h2>
                <Link
                  href={`/${session?.user.id}/boardadd`}
                  className="absolute inset-0"
                ></Link>
              </div>
              <div className="flex flex-col relative w-auto  rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
                <BookUserIcon className="self-center" />
                <h2 className="text-xs mx-2 ">登録者一覧</h2>
                <Link
                  href={`/${session?.user.id}/register`}
                  className="absolute inset-0"
                ></Link>
              </div>
              <div className="flex flex-col relative w-auto  rounded-lg items-center space-y-1  hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
                <CircleUserIcon className="self-center" />
                <h2 className="text-xs mx-2">マイページ</h2>
                <Link
                  href={`/${session?.user.id}/mypage`}
                  className="absolute inset-0"
                ></Link>
              </div>
              <div
                className="flex flex-col relative w-auto  rounded-lg items-center space-y-1  hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300 cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOutIcon className="self-center" />
                <h2 className="text-xs mx-2">ログアウト</h2>
              </div>
            </div>
            <Hamburger className="flex flex-col  md:hidden p-2 pr-0 w-10 space-y-1 hover:scale-105 transition cursor-pointer group" />
          </>
        )}
      </div>
    </>
  );
};

export default HeaderClient;
