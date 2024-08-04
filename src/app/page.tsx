import { PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ホーム",
  description: "アカウントに保存されている旅行一覧が見れます",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function Home() {
  return (
    <>
      {/* トースターの使用 */}
      <Toaster />
      <div className="flex flex-col h-screen w-full  relative">
        {/* components/Header.tsx */}
        <Header menu />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="h-12 border-b-2  flex items-center justify-center bg-blue-200">
              <h2 className="text-xl">旅行ボード</h2>
            </div>
            <div className="flex-1  overflow-y-auto p-20 sm:p-12 md:p-14 lg:p-20 relative bg-gradient-to-b from-green-300 to-green-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 md:gap-10 lg:gap-14">
                {[...Array(6)].map((_, index) => (
                  // ホバーした時に拡大して影が消える(className)
                  <div
                    key={index}
                    className="bg-red-300 bg-opacity-50 rounded-lg shadow-custom-shadow aspect-square relative overflow-hidden cursor-pointer hover:scale-105 transition hover:shadow-none "
                  >
                    <div className="bg-green-700 bg-opacity-40 absolute w-full h-24 bottom-0 flex flex-col px-4 py-3 gap-4 items-center">
                      <h2>タイトル : {index + 1}の旅名</h2>
                      <h2>作成日 : 2024/7/15</h2>
                    </div>
                    {/* ボードクリック時に画面遷移する<Link> */}
                    <Link
                      key={index}
                      className="absolute inset-0 "
                      href={`/trip/${index + 1}`}
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
          <div className="relative p-2 bg-slate-400 rounded-full  cursor-pointer hover:scale-125 transition ">
            <PlusCircle className="" />
            <Link href={"/tripadd"} className="absolute inset-0"></Link>
          </div>
        </div>
      </div>
    </>
  );
}
