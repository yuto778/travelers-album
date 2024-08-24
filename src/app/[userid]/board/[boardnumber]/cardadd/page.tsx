import Cardaddform from "@/components/Cardaddform";
import Header from "@/components/Header";
import "../../../../../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Cardadd } from "@/action/Cardadd";

export const metadata: Metadata = {
  title: "カードの追加",
  icons: {
    icon: "/favicon.png",
  },
};

const page = async ({
  params: { userid, boardnumber },
}: {
  params: { userid: string; boardnumber: string };
}) => {
  console.log("cardaddでFetching session...");
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="h-screen w-screen layer-gradient flex flex-col">
        <Header menu />
        <div className="flex-1 flex items-center justify-center ">
          <Cardaddform boardnumber={boardnumber} />
        </div>
      </div>
    </>
  );
};

export default page;
