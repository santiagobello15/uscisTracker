"use client";

import { Bell, Mail, Smartphone, X } from "lucide-react";
import { useState } from "react";

interface NotificationsPanelProps {
  receiptNumber?: string;
  onClose: () => void;
}

export default function NotificationsPanel({ receiptNumber, onClose }: NotificationsPanelProps) {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [frequency, setFrequency] = useState<"instant" | "daily" | "weekly">("instant");

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="bg-surface border border-border-light rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Set Up Notifications</h3>
              {receiptNumber && (
                <p className="text-sm text-secondary mt-0.5">Tracking {receiptNumber}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
          >
            <X className="w-4 h-4 text-secondary" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Email notifications</span>
            </div>
            <button
              onClick={() => setEmail(!email)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                email ? "bg-accent" : "bg-border"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  email ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Push notifications</span>
            </div>
            <button
              onClick={() => setPush(!push)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                push ? "bg-accent" : "bg-border"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  push ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="py-3">
            <span className="text-sm font-medium mb-3 block">Frequency</span>
            <div className="flex gap-2">
              {(["instant", "daily", "weekly"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                    frequency === f
                      ? "bg-accent text-white"
                      : "bg-background text-secondary hover:text-foreground"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-3 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent-hover transition-colors duration-200">
            {receiptNumber ? "Update Notifications" : "Save Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
}
