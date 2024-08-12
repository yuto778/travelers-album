import Cardaddform from "@/components/Cardaddform";
import Header from "@/components/Header";
import "../../../../../../styles/global.css";

const page = () => {
  return (
    <>
      <div className="h-screen w-screen layer-gradient flex flex-col">
        <Header menu />
        <div className="flex-1 flex items-center justify-center ">
          <Cardaddform />
        </div>
      </div>
    </>
  );
};

export default page;
