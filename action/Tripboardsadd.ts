"use server";

import { prisma } from "@/lib/client";
import { put } from "@vercel/blob";

export const Tripboardsadd = async (
  title: string,
  DepartureDate: Date,
  ArrivalDate: Date,
  Member: string,
  formdata: FormData,
  invite_userid: string
) => {
  try {
    const file = formdata.get("thumbnail") as File;
    const memberNames = Member.split(",").map((name) => name.trim());

    console.log(memberNames);

    // ファイルのアップロードとユーザーの検索を並行して実行
    const [{ url }, users] = await Promise.all([
      put(invite_userid, file, { access: "public" }),
      prisma.users.findMany({
        where: { name: { in: memberNames } },
        select: { id: true },
      }),
    ]);

    // Tripboardsの作成
    const newTripboard = await prisma.tripboards.create({
      data: {
        title,
        thumbnail: url,
        owner_id: invite_userid,
        start_at: DepartureDate,
        end_at: ArrivalDate,
      },
    });

    // Tripboards_Usersの作成
    await prisma.tripboards_Users.createMany({
      data: users.map(({ id }) => ({
        user_id: id,
        tripboard_id: newTripboard.id,
        inviteuser_id: invite_userid,
        requestion: null,
      })),
    });

    return { success: true, message: "Tripboard and users added successfully" };
  } catch (error) {
    console.error("Error in Tripboardsadd:", error);
    return { success: false, message: "Failed to add Tripboard and users" };
  }
};
