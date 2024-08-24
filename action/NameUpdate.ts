"use server";

import { prisma } from "@/lib/client";
import { UserNameUpdateForm } from "@/src/app/[userid]/mypage/Mypage";

export const NameUpdate = async (value: UserNameUpdateForm, userid) => {
  try {
    const updateUser = await prisma.users.update({
      where: { id: userid },
      data: { name: value.UserName },
    });
    console.log("Updateに成功", updateUser);
    return { success: true, message: "名前が更新されました" };
  } catch (error) {
    console.log("名前の更新エラー", error);
    return { success: false, message: "名前の更新に失敗しました" };
  }
};
