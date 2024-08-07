import { Metadata } from "next";
import Form from "../../../components/Form";
import Header from "../../../components/Header";
import { Toaster } from "react-hot-toast";

// メタデータの設定
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
      {/* トースターの表示（1秒表示) */}
      <Toaster toastOptions={{ duration: 1000 }} />
      <div className="h-screen w-full flex flex-col bg-gradient-to-b from-neutral-100 to-green-700">
        {/* /components/Header.tsx */}
        <Header className="" />
        <div className="flex-1  flex items-center justify-center ">
          {/* /components/Form.tsx */}
          <Form />
        </div>
      </div>
    </>
  );
};

export default page;
