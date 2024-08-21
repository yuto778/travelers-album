import Image from "next/image";
import React from "react";

type RegisterProps = {
  registers: {
    id: number;
    user_id: string;
    fellow_id: string;
    fellow: {
      name: string;
      icon: string | null;
    };
  }[];
};

const Register: React.FC<RegisterProps> = ({ registers }) => {
  return (
    <div className="h-3/4 w-1/2 bg-green-400 bg-opacity-25 rounded-xl shadow-custom-shadow  px-20  py-7 space-y-10 ">
      <h2 className="text-center text-2xl font-bold">登録者一覧</h2>
      <div className="grid grid-cols-2 gap-5 ">
        {registers.length === 0 && <div>登録者がいません</div>}
        {registers.map((register, index) => (
          <div
            key={index}
            className="border-b-2 border-gray-400 flex items-center  pb-2 px-10"
          >
            <div className="size-12 bg-slate-500 relative rounded-full overflow-hidden">
              <Image
                src={
                  register.fellow.icon
                    ? register.fellow.icon
                    : "/icons/Icon.jpeg"
                }
                fill
                className="object-cover"
                alt="プロフィール写真"
              />
            </div>
            <span className="flex-1"></span>
            <h2 className="text-lg ">{register.fellow.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Register;
