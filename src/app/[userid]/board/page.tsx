// /app/[userid]/board

import { PlusCircle, Trash2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "../../../../components/Header";
import "../../../../styles/global.css";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { log } from "console";
import SessionChecker from "@/components/SessionChecker";

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
  let Userid;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("セッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("セッションの情報を出してみます", session);
      Userid = session.user.id;
    }
  } catch (error) {
    console.log("セッションのエラー", error);
    redirect("/login");
  }
  return (
    <>
      {/* トースターの使用 */}
      <Toaster />
      <div className="flex flex-col h-screen w-full  relative layer-gradient">
        {/* components/Header.tsx */}
        <Header menu />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1  overflow-y-auto  sm:p-12 md:p-14 lg:p-20 relative ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 md:gap-10 lg:gap-14">
                {[...Array(6)].map((_, index) => (
                  // ホバーした時に拡大して影が消える(className)
                  <div
                    key={index}
                    className="bg-slate-300 bg-opacity-50 rounded-lg shadow-custom-shadow aspect-square relative overflow-hidden cursor-pointer hover:scale-105 transition hover:shadow-none "
                  >
                    <div className="bg-green-700 bg-opacity-40 absolute w-full h-24 bottom-0 flex flex-col px-4 py-3 gap-4 items-center">
                      <h2>タイトル : {index + 1}の旅名</h2>
                      <h2>作成日 : 2024/7/15</h2>
                    </div>
                    {/* ボードクリック時に画面遷移する<Link> */}
                    <Link
                      key={index}
                      className="absolute inset-0 "
                      href={`/${userid}/board/${index + 1}`}
                    ></Link>
                  </div>
                ))}
              </div>
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
              href={`/${Userid}/boardadd`}
              className="absolute inset-0"
            ></Link>
          </div>
        </div>
      </div>
    </>
  );
}
