import React from "react";
import "../../../../../../styles/global.css";
import Header from "@/components/Header";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";

const page = async ({
  params: { userid, boardnumber },
}: {
  params: { userid; boardnumber: string };
}) => {
  console.log("photoでFetching session...");
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const photos = await prisma.tripboards.findUnique({
    where: { id: boardnumber },
    include: {
      Tripcards: { select: { id: true, thumbnail: true, title: true } },
    },
  });

  return (
    <div className="h-screen w-screen layer-gradient flex flex-col">
      <Header menu />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-center border-b-2 border-gray-400 py-3">
          <h2 className="text-xl">写真一覧</h2>
        </div>
        <div className="overflow-y-auto flex-1">
          {photos.Tripcards.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <h2 className="text-2xl">写真がまだありません</h2>
            </div>
          )}
          {photos.Tripcards.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 py-5 px-20">
                {photos.Tripcards.map((photo, index) => (
                  <div
                    key={index}
                    className=" rounded-xl aspect-square shadow-custom-shadow relative overflow-hidden hover:scale-110 hover:shadow-none transition cursor-pointer"
                  >
                    <Image
                      src={`${photo.thumbnail}`}
                      fill
                      className="object-cover"
                      alt={`${photo.title}`}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
