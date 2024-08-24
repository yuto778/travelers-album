"use server";

import { prisma } from "@/lib/client";

export const FellowTravelersDelete = async (fellowtable_id) => {
  try {
    await prisma.fellowtravelers.delete({ where: { id: fellowtable_id } });
    return { success: true, message: "削除しました" };
  } catch (error) {
    return { success: false, message: "失敗しました" };
  }
};
