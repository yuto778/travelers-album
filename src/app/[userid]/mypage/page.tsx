// /app/[userid]/mypage/page.tsx

import { authOptions } from "@/@/lib/auth";
import { prisma } from "@/lib/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../../../../components/Header";
import "../../../../styles/global.css";
import Mypage from "./Mypage";
import { Users } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "マイページ",
  icons: {
    icon: "/favicon.png",
  },
};

// params:{userid}でurlの[userid]を取得
const page = async ({ params: { userid } }: { params: { userid: string } }) => {
  console.log("mypageでFetching session...");

  let user: Users | null = null;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("mypageでセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("mypageでセッションの情報を出してみます", session);

      user = await prisma.users.findUnique({
        where: { id: session.user.id },
      });
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
        <Mypage user={user} />
      </div>
    </>
  );
};

export default page;
