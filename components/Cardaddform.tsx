"use client";

// /cardaddform.tsx

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Cardadd } from "@/action/Cardadd";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useSession } from "next-auth/react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const CardAddSchema = z.object({
  Title: z.string(),
  photo: z.instanceof(File).optional(),
  Memo: z.string(),
});

export type CardAddForm = z.infer<typeof CardAddSchema>;

interface CarddaddProps {
  boardnumber: string;
}

const Cardaddform: React.FC<CarddaddProps> = ({ boardnumber }) => {
  const { data: session } = useSession();

  const CardAddform = useForm<CardAddForm>({
    resolver: zodResolver(CardAddSchema),
    defaultValues: {
      Title: "",
      photo: null,
      Memo: "",
    },
  });

  //formの要件が正しい時に動作<Button></Button>
  const CardaddonSubmit = async (value: CardAddForm) => {
    if (!value.photo) {
      toast.error("写真を選択してください");
      return;
    }
    const cardaddpromise = Cardadd(value, boardnumber);

    await toast.promise(cardaddpromise, {
      loading: "少々お待ちください",
      success: "カードの作成に成功しました",
      error: "エラーが発生しました",
    });

    const result = await cardaddpromise;

    if (!result.success) {
      toast.error("エラーが発生したようです");
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-green-400 bg-opacity-25 w-1/2 rounded-xl shadow-custom-shadow flex flex-col items-center px-20 py-10 space-y-6">
        <h2 className="text-2xl font-bold ">カードの追加</h2>
        <Form {...CardAddform}>
          <form
            onSubmit={CardAddform.handleSubmit(CardaddonSubmit)}
            className="space-y-5 flex flex-col w-full"
          >
            <FormField
              control={CardAddform.control}
              name="Title"
              render={({ field }) => (
                <FormItem className=" ">
                  <FormLabel className=" w-1/4 text-xl ">タイトル</FormLabel>
                  <FormControl className="flex-1 ">
                    <Input
                      placeholder="熱海"
                      {...field}
                      className=" shadow-custom-shadow"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={CardAddform.control}
              name="photo"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className="">
                  <FormLabel className="w-1/4 text-xl flex items-center">
                    写真
                  </FormLabel>
                  <FormControl className="flex-1 ">
                    <Input
                      type="file"
                      {...rest}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      className="shadow-custom-shadow cursor-pointer "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={CardAddform.control}
              name="Memo"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="w-1/4  text-xl">メモ</FormLabel>
                  <FormControl className="flex-1">
                    <Input
                      placeholder="楽しかった "
                      {...field}
                      className="shadow-custom-shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-center">
              追加
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Cardaddform;
