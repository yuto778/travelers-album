import React from "react";
import Header from "../../../../components/Header";
import { Input } from "../../../../components/ui/input";
import { Metadata } from "next";
import "../../../../styles/global.css";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import Email from "next-auth/providers/email";
import Mypage from "./Mypage";

export const metadata: Metadata = {
  title: "マイページ",
  icons: {
    icon: "/favicon.png",
  },
};

// params:{userid}でurlの[userid]を取得
const page = async ({ params: { userid } }: { params: { userid: string } }) => {
  console.log("mypageでFetching session...");
  let UserId, UserEmail, password;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("mypageでセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("mypageでセッションの情報を出してみます", session);

      UserEmail = session.user.email;
      UserId = session.user.id;

      console.log(UserEmail);

      const user = await prisma.users.findUnique({
        where: { id: UserId },
      });
      UserEmail = user.email;
      password = user.password;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col  layer-gradient">
        {/* /components/Header.tsx */}
        <Header menu />
        <Mypage email={UserEmail} password={password} />
      </div>
    </>
  );
};

export default page;
