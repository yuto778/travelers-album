"use server";

import { prisma } from "@/prisma/client";
// /action/GetUser.tsx

export const getAllUser = async () => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return { success: false, message: "ユーザーが見つかりませんでした" };
    }

    return { success: true, data: users };
  } catch (error) {
    console.error("ユーザー取得エラー:", error);
    return { success: false, message: "ユーザー取得中にエラーが発生しました" };
  } finally {
    await prisma.$disconnect();
  }
};
