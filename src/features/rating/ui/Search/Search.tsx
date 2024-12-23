"use client";

import React, { useState, useEffect } from "react";
import ratingState from "@/src/entities/rating/store/ratingState";
import { SearchInput, useDebounce } from "@/src/shared";
import Image from "next/image";

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (typeof debouncedSearchTerm === "string") {
      ratingState.setSearchTerm(searchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <SearchInput
      leftSection={
        <Image src="/icons/search.svg" width={24} height={24} alt="search" />
      }
      placeholder="Найти спортсмена"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};
