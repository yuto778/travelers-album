import { Metadata } from "next";
import Header from "../../../../../../../components/Header";
import { Button } from "../../../../../../../components/ui/button";
import TripDetail from "../../../../../../../components/TripDetail";

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
const page = ({
  params: { cardnumber },
}: {
  params: { cardnumber: string };
}) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-neutral-100 to-green-700">
      {/* /components/Header.tsx */}
      <Header menu />
      <div className="flex overflow-hidden flex-1 flex-col">
        <div className="flex-1 flex flex-col ">
          <div className="h-12 flex items-center justify-center border-b-2 border-gray-200 ">
            <h2 className="text-2xl font-bold">{cardnumber}</h2>
          </div>

          {/* /components/TripDetail.tsx */}
          <TripDetail id={cardnumber} />
        </div>
      </div>
    </div>
  );
};

export default page;
