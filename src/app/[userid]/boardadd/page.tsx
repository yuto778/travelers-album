import { Metadata } from "next";
import Header from "../../../../components/Header";
import TripAddForm from "../../../../components/TripAddForm";

export const metadata: Metadata = {
  title: "旅行追加画面",
  description: "旅行カードを追加できます",
  icons: {
    icon: "/favicon.png",
  },
};

const page = ({ params: { userid } }: { params: { userid: string } }) => {
  return (
    <>
      <div className="h-screen w-full  bg-gradient-to-b from-neutral-100 to-green-700 flex flex-col">
        <Header menu />
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
