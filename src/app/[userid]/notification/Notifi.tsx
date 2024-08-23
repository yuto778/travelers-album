"use client";

import { Circle, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { ApproveRegister } from "@/action/Approveregister";
import { FellowTravelersDelete } from "@/action/fellow_travelerDelete";
import toast, { Toaster } from "react-hot-toast";

interface NotifiProps {
  Register_notifications: ({
    user: {
      name: string;
    };
  } & {
    id: string;
    user_id: string;
    fellow_id: string | null;
    requestion: boolean | null;
    requestion_at: Date;
  })[];
}

const Notifi: React.FC<NotifiProps> = ({ Register_notifications }) => {
  const [tripmodal, setTripmodal] = useState<Boolean>(false);
  const router = useRouter();

  const closeModal = () => {
    setTripmodal(false);
  };

  const opentripmodal = () => {
    setTripmodal(true);
  };

  const handleapprove = async (user_id, fellow_id) => {
    try {
      const result = await ApproveRegister(user_id, fellow_id);

      if (!result.success) {
        toast.error(`${result.message}`);
      }

      toast.success("登録に成功しました");
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました");
    }
  };

  const handleDelete = async (registers_id) => {
    try {
      const result = await FellowTravelersDelete(registers_id);
      if (!result.success) {
        toast.error(`${result.message}`);
      }
      toast.success(`${result.message}`);
      router.refresh();
    } catch (error) {
      toast.error("失敗したようです");
    }
  };

  return (
    <>
      <Toaster />
      {(!Register_notifications || Register_notifications.length === 0) && (
        <h2 className="text-center text-xl">通知はありません</h2>
      )}

      {Register_notifications && Register_notifications.length > 0 && (
        <>
          {Register_notifications.map((register_notification, index) => (
            <div
              key={index}
              className="w-full border-b-2 border-gray-500 flex items-center justify-around"
            >
              <h2 className="text-xl cursor-pointer" onClick={opentripmodal}>
                {register_notification.user?.name}からリクエストが届いてます
              </h2>
              <div className="flex space-x-5">
                <div
                  className="bg-slate-300 rounded-full p-2 cursor-pointer"
                  onClick={() =>
                    handleapprove(
                      register_notification.user_id,
                      register_notification.fellow_id
                    )
                  }
                >
                  <Circle className="text-red-600" />
                </div>
                <div
                  className="bg-slate-300 rounded-full p-2 cursor-pointer"
                  onClick={() => handleDelete(register_notification.id)}
                >
                  <X className="" />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {tripmodal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-1/2 h-2/3 overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 self-center">旅行内容</h2>
            {/* モーダルの内容 */}
            <div
              onClick={closeModal}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            {/* ここにモーダルの内容を追加 */}
            <div className="h-full py-10 md:px-10 lg:px-16 flex flex-col items-center justify-around ">
              <div className="flex text-xl">
                <h2 className="">タイトル</h2>

                <h2>黒部宇奈月旅行</h2>
              </div>
              <div className="flex text-xl">
                <h2 className="">出発日</h2>
                <h2>2024年8月10日</h2>
              </div>
              <div className="flex text-xl">
                <h2 className="">到着日</h2>
                <h2>2024年9月10日</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifi;
