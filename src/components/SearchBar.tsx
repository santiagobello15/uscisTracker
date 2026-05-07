"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (receiptNumber: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toUpperCase();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-surface border border-border-light rounded-2xl overflow-hidden focus-within:border-accent transition-colors duration-200">
          <Search className="w-5 h-5 text-secondary ml-4 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter receipt number (e.g. EAC9999103403)"
            className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder-secondary/60 outline-none text-base"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="mr-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "Tracking..." : "Track"}
          </button>
        </div>
      </div>
    </form>
  );
}
