// /app/[userid]/board

import { authOptions } from "@/@/lib/auth";
import { PlusCircle, Trash2 } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "../../../../components/Header";
import "../../../../styles/global.css";
import { prisma } from "@/lib/client";

export const metadata: Metadata = {
  title: "ホーム",
  description: "アカウントに保存されている旅行一覧が見れます",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function Home({
  params: { userid },
}: {
  params: { userid: string };
}) {
  console.log("Fetching session...");

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const boards = await prisma.tripboards.findMany({
    where: { owner_id: session.user.id },
  });

  return (
    <>
      {/* トースターの使用 */}
      <Toaster />
      <div className="flex flex-col h-screen w-screen  layer-gradient">
        {/* components/Header.tsx */}
        <Header menu />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1  overflow-y-auto  sm:p-12 md:p-14 lg:p-20 relative ">
              {boards.length === 0 && (
                <>
                  <div className="w-full h-full flex items-center justify-center">
                    <h2 className="text-center text-2xl">
                      ボードがまだありません
                    </h2>
                  </div>
                </>
              )}
              {boards.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 md:gap-10 lg:gap-14">
                  {boards.map((board, index) => (
                    // ホバーした時に拡大して影が消える(className)
                    <div
                      key={board.id}
                      className="bg-slate-300 bg-opacity-50 rounded-lg relative shadow-custom-shadow aspect-square flex flex-col  overflow-hidden cursor-pointer hover:scale-105 transition hover:shadow-none "
                    >
                      <div className="flex-1 relative">
                        <Image
                          src={`${board.thumbnail}`}
                          alt="写真です"
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="bg-green-700 bg-opacity-40  w-full h-24 bottom-0 flex  px-4 py-3 gap-4 items-center justify-center">
                        <h2 className="text-xl">タイトル： </h2>
                        <h2 className="truncate text-xl">{board.title}</h2>
                      </div>
                      {/* ボードクリック時に画面遷移する<Link> */}
                      <Link
                        key={index}
                        className="absolute inset-0 "
                        href={`/${userid}/board/${board.id}`}
                      ></Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 right-3 md:right-5">
          <div className="relative p-2 bg-slate-400 rounded-full  cursor-pointer hover:scale-125 transition ">
            <Trash2 className="" />
            <Link href={"/tripadd"} className="absolute inset-0"></Link>
          </div>
        </div>
        <div className="absolute bottom-5 right-3 md:right-5">
          <div className="relative p-2 bg-slate-400 rounded-full  cursor-pointer hover:scale-125 transition shadow-custom-shadow ">
            <PlusCircle className="" />
            <Link
              href={`/${userid}/boardadd`}
              className="absolute inset-0"
            ></Link>
          </div>
        </div>
      </div>
    </>
  );
}
