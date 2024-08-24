"use server";

import { prisma } from "@/lib/client";
import bcrypt from "bcrypt";

export const PasswordUpdate = async (FirstPassword: string, userid: string) => {
  console.log("パスワードの更新開始");

  //パスワードをハッシュ化
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(FirstPassword, saltRounds);

  try {
    // ユーザーのパスワードを更新
    const updatedUser = await prisma.users.update({
      where: { id: userid },
      data: { password: hashedPassword },
    });

    console.log("updateに成功", updatedUser);

    // 更新が成功した場合
    return { success: true, message: "パスワードが正常に更新されました。" };
  } catch (error) {
    // エラーが発生した場合
    console.error("パスワード更新エラー:", error);
    return { success: false, message: "パスワードの更新に失敗しました。" };
  }
};
