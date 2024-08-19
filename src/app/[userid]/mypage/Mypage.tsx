"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordUpdate } from "@/action/PasswordUpdate";
import toast, { Toaster } from "react-hot-toast";
import { EmailUpdate } from "@/action/EmailUpdate";
import { NameUpdate } from "@/action/NameUpdate";
import { id } from "date-fns/locale";

interface MypageProps {
  password: string;
  email: string;
}

const UserNameUpdateformSchema = z.object({
  UserName: z.string(),
});
const UserIdUpdateformSchema = z.object({
  UserId: z.string().min(6),
});
const UserEmailUpdateformSchema = z.object({
  Email: z.string().email(),
});
const UserPasswordUpdateformSchema = z
  .object({
    FirstPassword: z
      .string()
      .min(6, "パスワードは6文字以上である必要があります"),
    SecondPassword: z
      .string()
      .min(6, "パスワードは6文字以上である必要があります"),
  })
  .refine((data) => data.FirstPassword === data.SecondPassword, {
    message: "パスワードが一致しません",
    path: ["SecondPassword"],
  });

export type UserNameUpdateForm = z.infer<typeof UserNameUpdateformSchema>;
export type UserIdUpdateForm = z.infer<typeof UserIdUpdateformSchema>;
export type UserEmailUpdateForm = z.infer<typeof UserEmailUpdateformSchema>;
export type UserPasswordUpdateForm = z.infer<
  typeof UserPasswordUpdateformSchema
>;

const Mypage: React.FC<MypageProps> = ({ password, email }) => {
  const [isUserNameUpdateModalOpen, setIsUserNameUpdateModalOpen] =
    useState(false);
  const [isUseridUpdateModalOpen, setIsUseridUpdateModalOpen] = useState(false);
  const [isUserEmailUpdateModalOpen, setIsUserEmailUpdateModalOpen] =
    useState(false);
  const [isUserPasswordUpdateModalOpen, setIsUserPasswordUpdateModalOpen] =
    useState(false);

  const router = useRouter();
  //sessionの取得
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  //usernameの更新フォーム
  const UserNameUpdateform = useForm<UserNameUpdateForm>({
    resolver: zodResolver(UserNameUpdateformSchema),
    defaultValues: {
      UserName: `${session.user.name}`,
    },
  });

  //useridの更新フォーム
  const UserIdUpdateform = useForm<UserIdUpdateForm>({
    resolver: zodResolver(UserIdUpdateformSchema),
    defaultValues: {
      UserId: `${session.user.id}`,
    },
  });

  //useremailの更新フォーム
  const UserEmailUpdateform = useForm<UserEmailUpdateForm>({
    resolver: zodResolver(UserEmailUpdateformSchema),
    defaultValues: {
      Email: `${email}`,
    },
  });

  //userpasswordの更新フォーム
  const UserPasswordUpdateform = useForm<UserPasswordUpdateForm>({
    resolver: zodResolver(UserPasswordUpdateformSchema),
    defaultValues: {
      FirstPassword: "",
      SecondPassword: "",
    },
  });

  const handleUseridUpdate = async () => {};

  const UsernameUpdateSubmit = async (value: UserNameUpdateForm) => {
    try {
      const result = await NameUpdate(value, session.user.id);
      if (!result.success) {
        return null;
      }
      toast.success("名前の更新に成功");
      UserNameUpdateform.reset();
      setIsUserNameUpdateModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("名前の更新に失敗");
      console.error("メールアドレスの更新に失敗したよ", error);
    }
  };

  const UserIdUpdateSubmit = async (value: UserIdUpdateForm) => {};

  const UserEmailUpdateSubmit = async (value: UserEmailUpdateForm) => {
    try {
      const result = await EmailUpdate(value, session.user.id);
      if (!result.success) {
        return null;
      }

      toast.success("メールアドレスの更新に成功");
      UserEmailUpdateform.reset();
      setIsUserEmailUpdateModalOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("メールアドレスの更新に失敗");
      console.error("メールアドレスの更新に失敗したよ", error);
    }
  };

  const UserPasswordUpdateSubmit = async (value: UserPasswordUpdateForm) => {
    try {
      if (value.FirstPassword === value.SecondPassword) {
        const result = await PasswordUpdate(
          value.FirstPassword,
          session.user.id
        );
        if (!result.success) {
          return null;
        }

        toast.success("パスワードの更新に成功");
        UserPasswordUpdateform.reset();
        setIsUserPasswordUpdateModalOpen(false);
      } else {
        toast.error("パスワードが一致しません");
      }
    } catch (error) {
      toast.error("パスワードの更新に失敗しました");
      console.error("パスワード更新中にエラーが発生しました:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center flex-1 ">
        <div className="bg-green-400 bg-opacity-25 px-20 py-10 w-1/2 rounded-2xl shadow-custom-shadow flex flex-col items-center space-y-5  ">
          <h2 className="text-2xl font-bold">マイページ</h2>
          <div className="flex w-2/3  justify-around items-center ">
            <div className="bg-gray-400 size-20 rounded-full relative overflow-hidden">
              <Image
                src={"/icons/icon.jpeg"}
                fill
                className="object-cover"
                alt="仮の写真です"
              />
            </div>
            <span
              className="underline text-2xl cursor-pointer"
              onClick={() => setIsUserNameUpdateModalOpen(true)}
            >
              {session.user.name}
            </span>
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">ユーザーID</h2>
            <h2
              className="bg-white px-3 py-1 rounded-sm overflow-x-auto whitespace-nowrap cursor-pointer"
              onClick={() => setIsUseridUpdateModalOpen(true)}
            >
              {session.user.id}
            </h2>
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">メールアドレス</h2>
            <h2
              className="bg-white px-3 py-1 rounded-sm cursor-pointer"
              onClick={() => setIsUserEmailUpdateModalOpen(true)}
            >
              {email}
            </h2>
          </div>
          <div className="space-y-2 w-2/3">
            <h2 className="text-xl">パスワード</h2>
            <h2
              className="bg-white px-3 py-1  rounded-sm overflow-x-auto whitespace-nowrap cursor-pointer"
              onClick={() => setIsUserPasswordUpdateModalOpen(true)}
            >
              {"*".repeat(password.length)}
            </h2>
          </div>
        </div>
      </div>
      {isUserNameUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={() => setIsUserNameUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              ユーザーIDを変更
            </h2>
            <div
              onClick={() => setIsUserNameUpdateModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <Form {...UserNameUpdateform}>
              <form
                onSubmit={UserNameUpdateform.handleSubmit(UsernameUpdateSubmit)}
                className="space-y-8 flex flex-col pt-8"
              >
                <FormField
                  control={UserNameUpdateform.control}
                  name="UserName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="self-center"
                  variant="destructive"
                >
                  更新
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
      {isUseridUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={() => setIsUseridUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              ユーザーIDを変更
            </h2>
            <div
              onClick={() => setIsUseridUpdateModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <Form {...UserIdUpdateform}>
              <form
                onSubmit={UserIdUpdateform.handleSubmit(UserIdUpdateSubmit)}
                className="space-y-8 flex flex-col pt-8"
              >
                <FormField
                  control={UserIdUpdateform.control}
                  name="UserId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>6文字以上</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="self-center"
                  variant="destructive"
                >
                  更新
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
      {isUserEmailUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={() => setIsUserEmailUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              メールアドレスを変更
            </h2>
            <div
              onClick={() => setIsUserEmailUpdateModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <Form {...UserEmailUpdateform}>
              <form
                onSubmit={UserEmailUpdateform.handleSubmit(
                  UserEmailUpdateSubmit
                )}
                className="space-y-8 flex flex-col pt-8"
              >
                <FormField
                  control={UserEmailUpdateform.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="・・・@gmail.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="self-center"
                  variant="destructive"
                >
                  更新
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
      {isUserPasswordUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={() => setIsUserPasswordUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              パスワードを変更
            </h2>
            <div
              onClick={() => setIsUserPasswordUpdateModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <Form {...UserPasswordUpdateform}>
              <form
                onSubmit={UserPasswordUpdateform.handleSubmit(
                  UserPasswordUpdateSubmit
                )}
                className="space-y-8 flex flex-col pt-8"
              >
                <FormField
                  control={UserPasswordUpdateform.control}
                  name="FirstPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>パスワード</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="6文字以上"
                          type="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={UserPasswordUpdateform.control}
                  name="SecondPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>パスワード2回目</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="6文字以上"
                          type="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="self-center"
                  variant="destructive"
                >
                  更新
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
