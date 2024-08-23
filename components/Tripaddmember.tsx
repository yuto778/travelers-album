"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PlusCircleIcon, X } from "lucide-react";
import { TypeOf, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

interface Tripaddmemberform {
  boardnumber: string;
  userid: string;
  finduser: {
    id: string;
    find_id: string;
    name: string;
    icon: string;
  }[];
  Tripboars_Users: {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

const Tripaddmemberformschema = z.object({
  find_id: z.string(),
});

export type TripaddmemberForm = z.infer<typeof Tripaddmemberformschema>;

const Tripaddmember: React.FC<Tripaddmemberform> = ({
  userid,
  finduser,
  boardnumber,
  Tripboars_Users,
}) => {
  const [filteredUsers, setFilteredUsers] = useState<typeof finduser>([]);
  const [isRegisteraddModal, setIsRegisteraddModal] = useState<boolean>(false);
  const [isTripaddModal, setIsTripaddModal] = useState(false);

  //usericonの更新フォーム
  const Tripaddmemberform = useForm<TripaddmemberForm>({
    resolver: zodResolver(Tripaddmemberformschema),
    defaultValues: {
      find_id: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    Tripaddmemberform.setValue("find_id", inputValue);

    const filtered = finduser.filter((user) =>
      user.find_id.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserClick = (find_id: string) => {
    Tripaddmemberform.setValue("find_id", find_id);
    setFilteredUsers([]);
  };

  const closemodal = () => {
    setIsTripaddModal(false);
    Tripaddmemberform.reset();
    setFilteredUsers([]);
  };

  const TripaddmemberSubmit = async (value: TripaddmemberForm) => {};
  return (
    <>
      <div className="flex-1 flex py-5">
        <div className="w-1/2 flex items-center justify-center">
          <Button className="relative" size="lg">
            <h2 className="text-2xl py-5 px-3">写真を表示</h2>
            <Link
              href={`/${userid}/board/${boardnumber}/photo`}
              className="absolute inset-0"
            ></Link>
          </Button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-neutral-200 rounded-xl m-4 pt-3 relative">
          <h2 className="text-xl">メンバー</h2>
          <div className="flex-1 flex items-center justify-center">
            {Tripboars_Users.map((user) => (
              <div key={user.user.id}>
                <h2 className="text-xl">{user.user.name}</h2>
              </div>
            ))}
          </div>
          <div
            className="absolute bottom-3 right-3 "
            onClick={() => setIsTripaddModal(true)}
          >
            <div className="p-2 bg-gray-400 rounded-full shadow-custom-shadow hover:scale-105 hover:shadow-none cursor-pointer transition">
              <PlusCircleIcon />
            </div>
          </div>
        </div>
      </div>
      {isTripaddModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={closemodal}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              旅行メンバーを追加
            </h2>
            <div
              onClick={closemodal}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <Form {...Tripaddmemberform}>
              <form
                onSubmit={Tripaddmemberform.handleSubmit(TripaddmemberSubmit)}
                className="space-y-8 flex flex-col pt-8"
              >
                <FormField
                  control={Tripaddmemberform.control}
                  name="find_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="ユーザーIDを入力"
                          {...field}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {filteredUsers.length > 0 && (
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onDoubleClick={() => handleUserClick(user.find_id)}
                      >
                        {user.name} ({user.find_id})
                      </div>
                    ))}
                  </div>
                )}
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

export default Tripaddmember;
