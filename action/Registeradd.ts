"use server";

import { RegisteraddForm } from "@/components/Register";
import { prisma } from "@/lib/client";

export const Registeradd = async (
  value: RegisteraddForm,
  ownUser_id: string
) => {
  try {
    //find_idからuseridを特定
    const Users_userid = await prisma.users.findFirst({
      where: { find_id: value.find_id },
      select: { id: true },
    });

    // 既存のエントリーを確認
    const existingEntry = await prisma.fellowtravelers.findFirst({
      where: {
        user_id: ownUser_id,
        fellow_id: Users_userid.id,
      },
    });

    if (existingEntry) {
      return {
        success: false,
        message: "既に登録されているかリクエストを送っています",
      };
    }

    // 新しいエントリーを作成
    const newEntry = await prisma.fellowtravelers.create({
      data: {
        user_id: ownUser_id,
        fellow_id: Users_userid.id,
        requestion: null,
      },
    });

    return {
      success: true,
      message: "リクエストが送信されました。",
      data: newEntry,
    };
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return {
      success: false,
      message: "エラーが発生しました。もう一度お試しください。",
    };
  }
};
