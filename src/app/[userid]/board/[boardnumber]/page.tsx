import { Metadata } from "next";
import React from "react";
import Header from "../../../../../components/Header";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../../components/ui/button";
import "../../../../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";

// メタデータの設定
export const metadata: Metadata = {
  title: "写真",
  description: "カードに保存されている写真を表示します",
  icons: {
    icon: "/favicon.png",
  },
};

// params:{id}でurlの[id]を取得
const page = async ({
  params: { userid, boardnumber },
}: {
  params: { userid; boardnumber: string };
}) => {
  console.log("[boardnumber]でFetching session...");
  let Userid;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("[boardnumber]でセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("[boardnumber]でセッションの情報を出してみます", session);
      Userid = session.user.id;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
  }
  return (
    <>
      <div className="h-screen w-full flex flex-col layer-gradient">
        {/* /components/Header.tsx */}
        <Header menu userid={Userid} />
        <div className="flex-1 w-full flex flex-col overflow-hidden">
          <div className="h-16 w-full flex items-center justify-center border-b-2 border-gray-400  ">
            {boardnumber} : page
          </div>
          <div className="h-1/2  flex flex-col  rounded-3xl   relative shadow-custom-shadow ">
            <h2 className="self-center text-2xl font-bold pt-5 ">Cards</h2>
            <div
              className="h-2/3 px-5 w-full rounded-3xl flex  gap-6 items-center overflow-x-scroll relative mx-5 
          "
            >
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="bg-green-200
                   p-16 rounded-2xl shadow-custom-shadow hover:scale-110 transition hover:shadow-none cursor-pointer relative"
                >
                  <h3 className="whitespace-nowrap">カード{index + 1}</h3>
                  <Link
                    href={`/${userid}/board/${boardnumber}/card/${index + 1}`}
                    className="absolute inset-0"
                  ></Link>
                </div>
              ))}
            </div>
            <div className="absolute bottom-3 right-10 z-20">
              <div className="relative p-2 bg-slate-400 rounded-full  cursor-pointer hover:scale-125 transition ">
                <PlusCircleIcon />
                <Link
                  href={`/${userid}/board/${boardnumber}/cardadd`}
                  className="inset-0 absolute"
                ></Link>
              </div>
            </div>
          </div>
          <div className="flex-1 flex py-5">
            <div className="w-1/2 flex items-center justify-center">
              <Button className="relative" size="lg">
                <h2 className="text-2xl py-5 px-3">写真を表示</h2>
                <Link
                  href={`/${userid}/board/${boardnumber}/photo`}
                  className="absolute inset-0"
                ></Link>
              </Button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-neutral-400 rounded-xl m-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
