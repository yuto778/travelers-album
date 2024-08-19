// /app/login/page.tsx

import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Form from "../../../components/Form";
import Header from "../../../components/Header";
import "../../../styles/global.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

// メタデータの設定
export const metadata: Metadata = {
  title: "ログインページ",
  description: "ログインと新規登録を行うページになります",
  icons: {
    icon: "/favicon.png",
  },
};

const page = async () => {
  console.log("loginでsession取得");
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/${session.user.id}/board`);
  }

  return (
    <>
      {/* トースターの表示（1秒表示) */}
      <Toaster toastOptions={{ duration: 1000 }} />
      <div className="h-screen w-full flex flex-col layer-gradient">
        {/* /components/Header.tsx */}
        <Header className="" />
        <div className="flex-1  flex items-center justify-center ">
          {/* /components/Form.tsx */}
          <Form />
        </div>
      </div>
    </>
  );
};

export default page;
