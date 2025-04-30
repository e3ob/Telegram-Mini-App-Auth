"use client";
import React, { useState, useEffect } from "react";
import { useAuthUser } from "@/hooks";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { usePathname, useRouter } from "next/navigation";

const protectedRoutes = [
  "/",
  "init-data",
  "launch-params",
  "theme-params",
  "ton-connect",
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const teleData = useSignal(initData.raw);
  const { isLoading, data: userData, refetch } = useAuthUser(teleData);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/login") return;
    if (!isLoading && !userData && protectedRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [router, pathname, isLoading]);
  useEffect(() => {
    refetch();
  }, [teleData]);
  return children;
};
