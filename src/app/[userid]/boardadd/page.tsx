import { Metadata } from "next";
import Header from "../../../../components/Header";
import TripAddForm from "../../../../components/TripAddForm";
import "../../../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";

export const metadata: Metadata = {
  title: "旅行追加画面",
  description: "旅行カードを追加できます",
  icons: {
    icon: "/favicon.png",
  },
};

const page = async ({ params: { userid } }: { params: { userid: string } }) => {
  console.log("boardaddでFetching session...");
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const registers = await prisma.fellowtravelers.findMany({
    where: { user_id: session.user.id, requestion: true },
    include: { fellow: { select: { name: true, id: true } } },
  });

  const userfind_id = await prisma.users.findUnique({
    where: { id: session.user.id },
    select: { find_id: true },
  });

  console.log(registers, userfind_id);

  return (
    <>
      <div className="h-screen w-full  layer-gradient flex flex-col">
        <Header menu />
        <div className="flex-1 flex flex-col ">
          <div className=" flex-1">
            <TripAddForm registers={registers} userid={userfind_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
