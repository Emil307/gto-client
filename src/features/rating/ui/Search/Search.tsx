"use client";

import React, { useState, useEffect } from "react";
import ratingState from "@/src/entities/rating/store/ratingState";
import { useDebounce } from "@/src/shared";

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (typeof debouncedSearchTerm === "string") {
      ratingState.setSearchTerm(searchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
