"use server";

import { prisma } from "@/lib/client";
import { UserEmailUpdateForm } from "@/src/app/[userid]/mypage/Mypage";

export const EmailUpdate = async (value: UserEmailUpdateForm, userid) => {
  try {
    const updateUser = await prisma.users.update({
      where: { id: userid },
      data: { email: value.Email },
    });
    console.log("updateに成功", updateUser);
    return { success: true, message: "メールアドレスの更新されました" };
  } catch (error) {
    console.log("メールアドレスの更新エラー", error);
    return { success: false, message: "メールアドレスの更新に失敗しました" };
  }
};
