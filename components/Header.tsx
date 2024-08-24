// /Header.tsx

import React from "react";
import HeaderClient from "./HeaderClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";

interface HeaderProps {
  menu?: boolean;
}

const Header: React.FC<HeaderProps> = async ({ menu }) => {
  const session = await getServerSession(authOptions);

  const notifications = await prisma.fellowtravelers.findMany({
    where: { fellow_id: session?.user.id, requestion: null },
    select: { id: true, user_id: true, fellow_id: true },
  });

  return <HeaderClient menu={menu && menu} notifications={notifications} />;
};

export default Header;
