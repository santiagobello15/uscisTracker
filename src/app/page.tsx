"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import CaseStatusCard from "@/components/CaseStatusCard";

interface CaseStatus {
  receiptNumber: string;
  status: string;
  statusDate: string;
  caseType: string;
  description: string;
  history?: { date: string; event: string }[];
}

const mockCases: Record<string, CaseStatus> = {
  EAC9999103403: {
    receiptNumber: "EAC9999103403",
    status: "Approved",
    statusDate: "May 2, 2026",
    caseType: "I-129F",
    description: "Petition for Alien Fianc\u00e9(e) — Your petition was approved and sent to the Department of State.",
    history: [
      { date: "Jan 15, 2026", event: "Case Was Received" },
      { date: "Feb 28, 2026", event: "Request for Evidence Was Sent" },
      { date: "Mar 20, 2026", event: "Response To USCIS' Request for Evidence Was Received" },
      { date: "May 2, 2026", event: "Case Was Approved" },
    ],
  },
  EAC9999103404: {
    receiptNumber: "EAC9999103404",
    status: "Pending",
    statusDate: "Apr 28, 2026",
    caseType: "I-485",
    description: "Application to Register Permanent Residence or Adjust Status — We are processing your case.",
    history: [
      { date: "Dec 10, 2025", event: "Case Was Received" },
      { date: "Jan 22, 2026", event: "Fingerprint Fee Was Received" },
      { date: "Feb 15, 2026", event: "Fingerprints Were Taken" },
      { date: "Apr 28, 2026", event: "Case Was Updated To Show Fingerprints Were Taken" },
    ],
  },
  EAC9999103405: {
    receiptNumber: "EAC9999103405",
    status: "Rejected",
    statusDate: "Apr 15, 2026",
    caseType: "I-765",
    description: "Application for Employment Authorization — Your application was denied. Please review the notice for details.",
    history: [
      { date: "Feb 1, 2026", event: "Case Was Received" },
      { date: "Mar 10, 2026", event: "Request for Evidence Was Sent" },
      { date: "Apr 15, 2026", event: "Case Was Denied" },
    ],
  },
};

export default function Home() {
  const [caseData, setCaseData] = useState<CaseStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (receiptNumber: string) => {
    setIsLoading(true);
    setError(null);
    setCaseData(null);

    await new Promise((r) => setTimeout(r, 800));

    const found = mockCases[receiptNumber];
    if (found) {
      setCaseData(found);
    } else {
      setError("Case not found. Try: EAC9999103403, EAC9999103404, or EAC9999103405");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-transparent" />
          <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-tight animate-fade-in-up">
              Track your USCIS
              <br />
              <span className="text-accent">case status.</span>
            </h1>
            <p className="mt-6 text-lg text-secondary max-w-md mx-auto animate-fade-in-up-delay leading-relaxed">
              Enter your receipt number to get real-time updates on your immigration case. Simple, fast, and secure.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {error && (
          <section className="max-w-5xl mx-auto px-6 pb-8 animate-fade-in-up">
            <div className="w-full max-w-lg mx-auto p-4 bg-error/10 border border-error/20 rounded-xl">
              <p className="text-sm text-error text-center">{error}</p>
            </div>
          </section>
        )}

        {caseData && (
          <section className="max-w-5xl mx-auto px-6 pb-16">
            <CaseStatusCard data={caseData} />
          </section>
        )}

        {!caseData && !error && !isLoading && (
          <section className="max-w-5xl mx-auto px-6 pb-24">
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "Real-time Status",
                  description: "Get the latest updates directly from USCIS systems.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  title: "Case History",
                  description: "View the complete timeline of your case progress.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                      <path d="M12 7v5l4 2" />
                    </svg>
                  ),
                },
                {
                  title: "Notifications",
                  description: "Get alerts when your case status changes.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  ),
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface border border-border-light text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-secondary leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
