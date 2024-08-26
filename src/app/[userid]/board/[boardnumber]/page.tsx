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
import Tripaddmember from "@/components/Tripaddmember";
import { prisma } from "@/lib/client";
import Image from "next/image";

// メタデータの設定
export const metadata: Metadata = {
  title: "ボード情報",
  description: "ボード情報",
  icons: {
    icon: "/favicon.png",
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// params:{id}でurlの[id]を取得
const page = async ({
  params: { userid, boardnumber },
}: {
  params: { userid; boardnumber: string };
}) => {
  console.log("[boardnumber]でFetching session...");

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const tripwithUser = await prisma.tripboards_Users.findMany({
    where: { tripboard_id: boardnumber },
    include: { user: true },
  });

  const find_cards = await prisma.tripcards.findMany({
    where: { board_id: boardnumber },
    select: { id: true, board_id: true, title: true, thumbnail: true },
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

  await new Promise((resolve) => setTimeout(resolve, 500));

  const triptitle = await prisma.tripboards.findUnique({
    where: { id: boardnumber },
    select: { title: true },
  });

  console.log(tripwithUser);
  console.log(find_cards);

  return (
    <>
      <div className="h-screen w-full flex flex-col layer-gradient">
        {/* /components/Header.tsx */}
        <Header menu />
        <div className="flex-1 w-full flex flex-col overflow-hidden">
          <div className="h-16 w-full flex items-center justify-center border-b-2 border-gray-400  ">
            <h2 className="text-xl font-bold">{triptitle?.title}</h2>
          </div>
          <div className="h-1/2  flex flex-col  rounded-3xl   relative shadow-custom-shadow ">
            <h2 className="self-center text-2xl font-bold pt-5 ">Cards</h2>
            {find_cards.length === 0 && (
              <div className="h-full w-full flex items-center justify-center">
                <h2 className="text-center text-2xl">カードがまだありません</h2>
              </div>
            )}
            {find_cards.length > 0 && (
              <>
                <div className="h-2/3 px-5  w-full rounded-3xl flex gap-6 items-center overflow-x-scroll relative mx-5">
                  {find_cards.map((card, index) => (
                    <div key={card.id} className="flex flex-col items-center">
                      <div className="bg-green-200 p-16 rounded-2xl shadow-custom-shadow hover:scale-110 transition hover:shadow-none cursor-pointer relative overflow-hidden mb-2">
                        <h3 className="whitespace-nowrap truncate z-20 relative bg-white bg-opacity-70 p-1 rounded">
                          {card.title}
                        </h3>
                        <div className="absolute inset-0">
                          <Image
                            src={card.thumbnail}
                            alt={card.title}
                            layout="fill"
                            objectFit="cover"
                            className="z-10"
                          />
                        </div>
                        <Link
                          href={`/${userid}/board/${boardnumber}/card/${card.id}`}
                          className="absolute inset-0 z-10"
                        ></Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="absolute bottom-3 right-10 z-20">
              <div className="relative p-2 bg-slate-400 rounded-full  cursor-pointer hover:scale-125 transition shadow-custom-shadow hover:shadow-none">
                <PlusCircleIcon />
                <Link
                  href={`/${userid}/board/${boardnumber}/cardadd`}
                  className="inset-0 absolute"
                ></Link>
              </div>
            </div>
          </div>
          <Tripaddmember
            finduser={findUser}
            userid={session.user.id}
            boardnumber={boardnumber}
            Tripboars_Users={tripwithUser}
          />
        </div>
      </div>
    </>
  );
};

export default page;
