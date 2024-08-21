"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

const CardAddSchema = z.object({
  Title: z.string(),

  photo: z.instanceof(File).optional(),
  Memo: z.string(),
});

export type CardAddForm = z.infer<typeof CardAddSchema>;

const Cardaddform = () => {
  const CardAddform = useForm<CardAddForm>({
    resolver: zodResolver(CardAddSchema),
    defaultValues: {
      Title: "",
      photo: null,
      Memo: "",
    },
  });

  //formの要件が正しい時に動作<Button></Button>
  const CardaddonSubmit = async (value: CardAddForm) => {};

  return (
    <>
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
                <FormItem className="flex items-center border h-auto ">
                  <FormLabel className=" w-1/4 text-xl">タイトル</FormLabel>
                  <FormControl className="flex-1 ">
                    <Input
                      placeholder="熱海"
                      {...field}
                      className=" shadow-custom-shadow "
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
                <FormItem className="flex items-center border">
                  <FormLabel className="w-1/4 text-xl">写真</FormLabel>
                  <FormControl className="flex-1">
                    <Input
                      type="file"
                      {...rest}
                      onChange={(e) => {
                        const file = e.target.files[0];
                      }}
                      className="shadow-custom-shadow cursor-pointer"
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
                <FormItem className="flex items-center border">
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
