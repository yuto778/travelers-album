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
import React, { useState } from "react";
import { cn } from "../@/lib/utils";
import Hamburger from "./Hamburger";

interface HeaderProps {
  menu?: boolean;
  className?: string;
  userid?: string;
}

type Variant = "notification" | "none";

const Header: React.FC<HeaderProps> = ({ menu, className, userid }) => {
  const [variant, setVariant] = useState<Variant>("none");
  const router = useRouter();

  const handlelogout = () => {
    router.push("/login");
  };

  const toggleVariant = () => {
    if (variant === "none") {
      setVariant("notification");
    }

    if (variant === "notification") {
      setVariant("none");
    }
  };

  return (
    <div
      className={cn(
        "h-20 flex items-center justify-between  px-4  md:h-20 md:px-12 ",
        className
      )}
    >
      <Link
        href={`/${userid}/board`}
        className="font-bold text-2xl md:text-2xl cursor-pointer"
      >
        Travelers Album
      </Link>
      <span className="flex-1"></span>
      {menu && (
        <>
          <div className="md:flex items-center space-x-5 hidden px-5">
            <div onClick={toggleVariant} className="cursor-pointer">
              通知
            </div>
            <div className="flex flex-col relative w-16  rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
              <Home className="self-center " />
              <h2 className="text-xs ">ホーム</h2>
              <Link
                href={`/${userid}/board`}
                className="absolute inset-0"
              ></Link>
            </div>
            <div className="flex flex-col relative w-16  rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
              <div className="relative ">
                <BellIcon className="self-center " />
                {variant === "notification" && (
                  <span className="h-2 w-2 rounded-full bg-red-600 absolute top-0 right-0 "></span>
                )}
              </div>
              <h2 className="text-xs ">通知</h2>
              <Link
                href={`/${userid}/notification`}
                className="absolute inset-0"
              ></Link>
            </div>
            <div className="flex flex-col relative w-16 rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
              <Pen className="self-center" />
              <h2 className="text-xs ">追加</h2>
              <Link
                href={`/${userid}/boardadd`}
                className="absolute inset-0"
              ></Link>
            </div>
            <div className="flex flex-col relative w-auto  rounded-lg items-center space-y-1 hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
              <BookUserIcon className="self-center" />
              <h2 className="text-xs mx-2 ">登録者一覧</h2>
              <Link
                href={`/${userid}/register`}
                className="absolute inset-0"
              ></Link>
            </div>
            <div className="flex flex-col relative w-auto  rounded-lg items-center space-y-1  hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
              <CircleUserIcon className="self-center" />
              <h2 className="text-xs mx-2">マイページ</h2>
              <Link
                href={`/${userid}/mypage`}
                className="absolute inset-0"
              ></Link>
            </div>
            <div className="flex flex-col relative w-auto  rounded-lg items-center space-y-1  hover:scale-105 transition py-1 border border-gray-200 shadow-md hover:shadow-none hover:border-green-300">
              <LogOutIcon className="self-center" />
              <h2 className="text-xs mx-2">ログアウト</h2>
              <Link href={"/login"} className="absolute inset-0"></Link>
            </div>
          </div>
          <Hamburger className="flex flex-col  md:hidden p-2 pr-0 w-10 space-y-1 hover:scale-105 transition cursor-pointer group" />
        </>
      )}
    </div>
  );
};

export default Header;
