import Cardaddform from "@/components/Cardaddform";
import Header from "@/components/Header";
import "../../../../../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  console.log("cardaddでFetching session...");
  let Userid;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("cardaddでセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("cardaddでセッションの情報を出してみます", session);
      Userid = session.user.id;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
  }
  return (
    <>
      <div className="h-screen w-screen layer-gradient flex flex-col">
        <Header menu userid={Userid} />
        <div className="flex-1 flex items-center justify-center ">
          <Cardaddform />
        </div>
      </div>
    </>
  );
};

export default page;
