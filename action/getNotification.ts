"use server";

import { prisma } from "@/lib/client";

export const getNotification = async (userid) => {
  const notification = await prisma.fellowtravelers.findMany({
    where: { user_id: userid, requestion: null },
    include: { fellow: true },
  });

  console.log(notification);
  return notification;
};
