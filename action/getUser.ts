"use server";

import { prisma } from "@/lib/client";
import { useId } from "react";

export const getUser = async (userid: string) => {
  try {
    const user = await prisma.users.findUnique({ where: { id: userid } });
    return user;
  } catch (error) {
    console.log("getUsererror", error);
  }
};
