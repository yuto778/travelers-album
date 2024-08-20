"use server";

import { prisma } from "@/lib/client";
import { UserIconUpdateForm } from "@/src/app/[userid]/mypage/Mypage";
import { put } from "@vercel/blob";

export const IconUpdate = async (formdata: FormData, userid: string) => {
  try {
    console.log("imageのアップデート");

    const file = formdata.get("icon") as File;

    const { url } = await put(userid, file, { access: "public" });
    console.log("urlの取得に成功");

    const updateUser = await prisma.users.update({
      where: { id: userid },
      data: { icon: url },
    });

    console.log("updateに成功", updateUser);

    return { success: true, message: "iconの更新に成功" };
  } catch (error) {
    console.log("Error updating icon:", error);
    console.error("Error updating icon:", error);
    return { success: false, error: "iconの更新に失敗" };
  }
};
