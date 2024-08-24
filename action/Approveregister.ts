"use server";

import { prisma } from "@/lib/client";

export const ApproveRegister = async (user_id: string, fellow_id: string) => {
  try {
    // トランザクションを使用して、複数の操作を一つの単位として扱う
    const result = await prisma.$transaction(async (prisma) => {
      // 既存のレコードを更新
      const approveregister = await prisma.fellowtravelers.updateMany({
        where: {
          user_id: user_id,
          fellow_id: fellow_id,
        },
        data: {
          requestion: true,
        },
      });

      if (approveregister.count > 0) {
        // 新しいレコードを追加
        await prisma.fellowtravelers.create({
          data: {
            user_id: fellow_id,
            fellow_id: user_id,
            requestion: true,
          },
        });

        console.log(
          `Successfully approved register for user_id: ${user_id} and fellow_id: ${fellow_id}`
        );
        return {
          success: true,
          message: "Register approved and new record created successfully",
        };
      } else {
        console.log(
          `No matching record found for user_id: ${user_id} and fellow_id: ${fellow_id}`
        );
        return { success: false, message: "No matching record found" };
      }
    });

    return result;
  } catch (error) {
    console.error("Error in ApproveRegister:", error);
    return { success: false, message: "Error in ApproveRegister process" };
  }
};
