"use client";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // initializing the useRouter hook
  const router = useRouter();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useLayoutEffect(() => {
    // checking if user info already exists then redirect user to dashboard page
    if (userInfo) {
      router.push("/admin/dashboard");
    }
  }, [userInfo, router]);

  return <div>{children}</div>;
}
