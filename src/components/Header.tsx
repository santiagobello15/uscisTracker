"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import NotificationsPanel from "./NotificationsPanel";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border-light">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="font-semibold tracking-tight">USCIS Tracker</span>
          </div>

          <button
            onClick={() => setShowNotifications(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
      </header>

      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-6 bg-foreground/20 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-lg">
            <NotificationsPanel onClose={() => setShowNotifications(false)} />
          </div>
        </div>
      )}
    </>
  );
}
