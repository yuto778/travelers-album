"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CircleUserRoundIcon,
  HomeIcon,
  PenIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { cn } from "../@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

interface HamburgerProps {
  className?: string;
}

const Hamburger: React.FC<HamburgerProps> = ({ className }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const router = useRouter();
  const deleteHamburgerDeleteModal = () => {
    setIsHamburgerOpen(false);
  };

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const handlelogout = () => {
    router.push("/login");
  };

  return (
    <>
      <div
        className={cn("", className)}
        onClick={() => setIsHamburgerOpen(true)}
      >
        <span className="w-full h-1 bg-gray-700 group-hover:bg-black"></span>
        <span className="w-full h-1 bg-gray-700 group-hover:bg-black"></span>
        <span className="w-full h-1 bg-gray-700 group-hover:bg-black"></span>
      </div>
      <AnimatePresence>
        {isHamburgerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-85 flex justify-end z-10"
            onClick={deleteHamburgerDeleteModal}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="bg-white p-8 rounded-lg w-2/5 h-full overflow-auto relative flex flex-col z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 self-center">メニュー</h2>
              {/* モーダルの内容 */}
              <div
                onClick={deleteHamburgerDeleteModal}
                className="absolute top-2 right-2 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none"
              >
                <ArrowRight />
              </div>
              {/* ここにモーダルの内容を追加 */}
              <div className="py-7 px-1 sm:px-8 md:px-10 lg:px-16 h-full flex flex-col items-center space-y-8">
                <div className="flex items-center w-full space-x-4  p-2 rounded-lg border cursor-pointer hover:scale-105 transition hover:border-green-300 shadow-custom-shadow hover:shadow-none relative">
                  <HomeIcon />
                  <h2 className="text-sm">ホーム</h2>
                  <Link href={"/"} className="absolute inset-0"></Link>
                </div>
                <div className="flex items-center  w-full space-x-4  p-2 rounded-lg border cursor-pointer hover:scale-105 transition  hover:border-green-300 shadow-custom-shadow hover:shadow-none relative">
                  <PenIcon />
                  <h2 className="text-sm">追加</h2>
                  <Link href={"/tripadd"} className="absolute inset-0"></Link>
                </div>
                <div className="flex items-center w-full space-x-4  p-2 rounded-lg border cursor-pointer hover:scale-105 transition  hover:border-green-300 shadow-custom-shadow  hover:shadow-none relative">
                  <CircleUserRoundIcon />
                  <h2 className="text-sm">アカウント</h2>
                  <Link href={"/1/mypage"} className="absolute inset-0"></Link>
                </div>
                <span className="flex-1"></span>
                <Button
                  className="shadow-custom-shadow hover:shadow-none transition bg-green-200 active:bg-red-200"
                  variant="ghost"
                  onClick={handlelogout}
                >
                  ログアウト
                </Button>
              </div>
              <span className="flex-1"></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hamburger;
