"use client";

import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // initializing the use router hook
  const router = useRouter();

  // getting the auth state from the store
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // checking if user information does not exists then redirect user to login screen
    if (!userInfo) {
      router.push("/admin/auth/login");
    }
  }, [userInfo, router]);

  return <div>{children}</div>;
}
