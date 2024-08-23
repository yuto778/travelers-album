import { prisma } from "@/lib/client";

import { authOptions } from "@/@/lib/auth";
import Register from "@/components/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../../../../components/Header";
import "../../../../styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "登録者一覧",
  description: "登録者一覧を表示するページ",
  icons: { icon: "/favicon.png" },
};

const page = async ({ params: { userid } }: { params: { userid: string } }) => {
  console.log("registerでFetching session...");
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const registers = await prisma.fellowtravelers.findMany({
    where: { user_id: session.user.id, requestion: true },
    include: { fellow: { select: { name: true, icon: true } } },
  });

  const findUser = await prisma.users.findMany({
    where: {
      id: {
        not: session.user.id,
      },
    },
    select: {
      id: true,
      find_id: true,
      name: true,
      icon: true,
    },
  });

  console.log(registers);

  return (
    <div className="h-screen w-full layer-gradient flex flex-col">
      <Header menu />
      <div className="flex-1 flex items-center justify-center ">
        <Register
          registers={registers}
          findUser={findUser}
          userid={session.user.id}
        />
      </div>
    </div>
  );
};

export default page;
