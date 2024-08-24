"use client";

// /SessionChecker.tsx

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SessionChecker = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("unauthenticatedです");

      router.push("/login");
    }
  }, [status, router]);

  return null; // このコンポーネントは何も表示しません
};

export default SessionChecker;
