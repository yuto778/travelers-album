// /app/notification/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../../../../components/Header";
import { authOptions } from "@/@/lib/auth";
import Notifi from "./Notifi";
import { Metadata } from "next";
import { prisma } from "@/lib/client";

export const metadata: Metadata = {
  title: "通知",
  description: "通知を表示するページ",
  icons: { icon: "/favicon.png" },
};
const page = async () => {
  console.log("notificationでFetching session...");
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const Register_notifications = await prisma.fellowtravelers.findMany({
    where: { fellow_id: session.user.id, requestion: null },
    include: { user: { select: { name: true } } },
  });

  console.log("登録者通知", Register_notifications);

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-neutral-100 to-green-700">
      <Header menu />
      <div className="flex-1 flex items-center justify-center ">
        <div className="bg-green-400 bg-opacity-25 h-2/3 w-1/2 flex flex-col items-center px-10 py-10 shadow-custom-shadow rounded-xl ">
          <h2 className="text-xl font-bold ">通知</h2>
          <div className="flex flex-col w-full justify-center h-2/3">
            <Notifi
              Register_notifications={
                Register_notifications && Register_notifications
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
