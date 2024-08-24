import React from "react";
import Header from "../../../../components/Header";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Metadata } from "next";
import "../../../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "メンバーの追加",
  description: "メンバーを追加します",
  icons: {
    icon: "/favicon.png",
  },
};

const page = async () => {
  console.log("memberaddでFetching session...");
  let Username, UserId, UserEmail;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("memberaddでセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("memberaddでセッションの情報を出してみます", session);
      Username = session.user.name;
      UserId = session.user.id;
      UserEmail = session.user.email;

      console.log(Username, UserId, UserEmail);
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
  }
  return (
    <div className="h-screen w-full flex flex-col layer-gradient">
      <Header menu />
      <div className="flex-1  flex flex-col  items-center py-10 ">
        <div className="flex-1 flex flex-col  items-center justify-around w-1/2  py-32 px-10 bg-green-400 bg-opacity-25 shadow-custom-shadow rounded-xl ">
          <h2 className="text-3xl">メンバーを追加</h2>

          <div className="flex items-center   md:w-2/3  ">
            <label htmlFor="member" className="text-xl  whitespace-nowrap px-5">
              ID検索 :
            </label>
            <Input
              id="member"
              type="text"
              className="rounded-lg pr-5 shadow-custom-shadow cursor-pointer"
            />
          </div>

          <Button
            variant="outline"
            className="bg-yellow-400 hover:bg-yellow-500 shadow-custom-shadow hover:shadow-none "
          >
            新規メンバーを登録！
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
