import { Metadata } from "next";
import Form from "../../../components/Form";
import Header from "../../../components/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ログインページ",
  description: "ログインと新規登録を行うページになります",
  icons: {
    icon: "/favicon.png",
  },
};

const page = () => {
  return (
    <>
      <Toaster toastOptions={{ duration: 1000 }} />
      <div className="h-screen w-full flex flex-col bg-gradient-to-b from-white to-black">
        <Header className="bg-neutral-300" />
        <div className="flex-1  flex items-center justify-center bg-gradient-to-b from-green-300 to-green-200">
          <Form />
        </div>
      </div>
    </>
  );
};

export default page;
