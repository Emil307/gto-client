"use client";

import React from "react";
import { useRouter } from "next/navigation";
import authState from "@/src/entities/auth/store/authState";

export const PrivacyStep: React.FC = () => {
  const router = useRouter();

  function handleConfirm() {
    if (authState.registerDto) {
      authState.registration(authState.registerDto).then(() => {
        router.replace(
          `/auth/signInConfirm?email=${authState.registerDto?.email}`
        );
      });
    }
  }

  return (
    <div>
      <button onClick={handleConfirm}>Продолжить</button>
    </div>
  );
};
