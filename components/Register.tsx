"use client";

import { PlusCircleIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Registeradd } from "@/action/Registeradd";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type RegisterProps = {
  userid: string;
  findUser: {
    id: string;
    find_id: string;
    name: string;
    icon: string;
  }[];
  registers: {
    id: string;
    user_id: string;
    fellow_id: string;
    fellow: {
      name: string;
      icon: string | null;
    };
  }[];
};

const RegsteraddformSchema = z.object({
  find_id: z.string(),
});

export type RegisteraddForm = z.infer<typeof RegsteraddformSchema>;

const Register: React.FC<RegisterProps> = ({ registers, findUser, userid }) => {
  const [filteredUsers, setFilteredUsers] = useState<typeof findUser>(findUser);
  const [isRegisteraddModal, setIsRegisteraddModal] = useState<boolean>(false);
  const router = useRouter();

  const Registeraddform = useForm<RegisteraddForm>({
    resolver: zodResolver(RegsteraddformSchema),
    defaultValues: {
      find_id: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    Registeraddform.setValue("find_id", inputValue);

    const filtered = findUser.filter((user) =>
      user.find_id.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserClick = (find_id: string) => {
    Registeraddform.setValue("find_id", find_id);
  };

  const RegisteraddSubmit = async (value: RegisteraddForm) => {
    const Requestpromise = Registeradd(value, userid);

    try {
      const result = await toast.promise(Requestpromise, {
        loading: "少々お待ちください",
        success: "リクエストが送信されました",
        error: "エラーが発生しました",
      });

      if (result.success) {
        Registeraddform.reset();
        setIsRegisteraddModal(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      toast.error("予期せぬエラーが発生しました");
    }
  };

  const closemodal = () => {
    setIsRegisteraddModal(false);
    Registeraddform.reset();
  };

  return (
    <>
      <Toaster />
      <div className="h-3/4 w-1/2 bg-green-400 bg-opacity-25 rounded-xl shadow-custom-shadow  px-20  py-6 space-y-10 flex flex-col items-center justify-center relative">
        <h2 className=" text-2xl font-bold">登録者一覧</h2>
        {registers.length === 0 && (
          <div className=" text-xl flex-1 py-20 ">登録者がいません</div>
        )}
        {registers && (
          <>
            <div className="flex-1 ">
              <div className="grid grid-cols-2 gap-5 ">
                {registers.map((register, index) => (
                  <div
                    key={index}
                    className="border-b-2 border-gray-400 flex items-center space-x-4 pb-2 px-5"
                  >
                    <div className="size-12 bg-slate-500 relative rounded-full overflow-hidden">
                      <Image
                        src={register.fellow.icon}
                        fill
                        className="object-cover"
                        alt="プロフィール写真"
                      />
                    </div>
                    <span className="flex-1"></span>
                    <h2 className="text-lg truncate max-w-20">
                      {register.fellow.name}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div
          className="absolute bottom-5 right-3 md:right-5"
          onClick={() => setIsRegisteraddModal(true)}
        >
          <div className="relative p-2 bg-slate-400 rounded-full  cursor-pointer hover:scale-125 transition shadow-custom-shadow ">
            <PlusCircleIcon className="" />
          </div>
        </div>
      </div>
      {isRegisteraddModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={closemodal}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">メンバーに登録</h2>
            <div
              onClick={closemodal}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <Form {...Registeraddform}>
              <form
                onSubmit={Registeraddform.handleSubmit(RegisteraddSubmit)}
                className="space-y-8 flex flex-col pt-8"
              >
                <FormField
                  control={Registeraddform.control}
                  name="find_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="ユーザーID"
                          {...field}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleUserClick(user.find_id)}
                    >
                      {user.name} ({user.find_id})
                    </div>
                  ))}
                </div>
                <Button
                  type="submit"
                  className="self-center"
                  variant="destructive"
                >
                  リクエストを送信
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
