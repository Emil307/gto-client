"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import authState from "@/src/entities/auth/store/authState";

export const AuthProvider: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    authState.checkAuth(router);
  }, []);

  return null;
};
