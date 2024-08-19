import { Metadata } from "next";
import Header from "../../../../components/Header";
import TripAddForm from "../../../../components/TripAddForm";
import "../../../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "旅行追加画面",
  description: "旅行カードを追加できます",
  icons: {
    icon: "/favicon.png",
  },
};

const page = async ({ params: { userid } }: { params: { userid: string } }) => {
  console.log("boardaddでFetching session...");
  let Username, UserId, UserEmail;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("boardaddでセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("boardaddでセッションの情報を出してみます", session);
      Username = session.user.name;
      UserId = session.user.id;
      UserEmail = session.user.email;

      console.log(Username, UserId, UserEmail);
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
  }
  return (
    <>
      <div className="h-screen w-full  layer-gradient flex flex-col">
        <Header menu userid={UserId} />
        <div className="flex-1 flex flex-col ">
          <div className=" flex-1">
            <TripAddForm userid={userid} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
