import { Metadata } from "next";
import Header from "../../../../../../../components/Header";
import { Button } from "../../../../../../../components/ui/button";
import TripDetail from "../../../../../../../components/TripDetail";
import "../../../../../../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";

// メタデータの設定
export const metadata: Metadata = {
  title: "旅行カード",
  description: "旅行の詳細確認と各種変更ができます",
  icons: {
    icon: "/favicon.png",
  },
};

const Name = ["八村塁", "小池百合子", "ジョシュ・ホーキンソン"];

// params:{id}でurlの[id]を取得
const page = async ({
  params: { boardnumber, cardnumber },
}: {
  params: { boardnumber: string; cardnumber: string };
}) => {
  console.log("[cardnumber]でFetching session...");
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const boardinfo = await prisma.tripboards.findFirst({
    where: { id: boardnumber },
  });

  console.log(boardinfo);

  const cardinfo = await prisma.tripcards.findFirst({
    where: { id: cardnumber },
  });

  console.log(cardinfo);

  const pictureinfo = await prisma.cardpictures.findMany({
    where: { tripcard_id: cardnumber },
  });

  console.log(pictureinfo);

  return (
    <div className="flex flex-col h-screen w-screen layer-gradient">
      {/* /components/Header.tsx */}
      <Header menu />
      <div className="flex overflow-hidden flex-1 flex-col">
        <div className="flex-1 flex flex-col ">
          <div className="h-12 flex items-center justify-center border-b-2 border-gray-200 ">
            <h2 className="text-2xl font-bold">{boardinfo.title}</h2>
          </div>

          {/* /components/TripDetail.tsx */}
          <TripDetail
            cardnumber={cardnumber}
            cardinfo={cardinfo}
            pictureinfo={pictureinfo}
            boardinfo={boardinfo}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
