"use server";

import { prisma } from "@/lib/client";
import { UserIdUpdateForm } from "@/src/app/[userid]/mypage/Mypage";

export const IdUpdate = async (value: UserIdUpdateForm, sessionUserId) => {
  try {
    const Updateuser = await prisma.users.update({
      where: { id: sessionUserId },
      data: { find_id: value.UserId },
    });

    console.log("useridの更新に成功", Updateuser);
    return { success: true, message: "useridの更新に成功" };
  } catch (error) {
    console.log("useridの更新に失敗", error);
    return { success: false, message: "useridの更新に失敗" };
  }
};
