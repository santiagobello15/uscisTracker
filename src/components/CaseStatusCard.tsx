"use client";

import { CheckCircle, Clock, AlertCircle, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CaseStatus {
  receiptNumber: string;
  status: string;
  statusDate: string;
  caseType: string;
  description: string;
  history?: { date: string; event: string }[];
}

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  approved: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  rejected: { icon: AlertCircle, color: "text-error", bg: "bg-error/10" },
};

function getStatusInfo(status: string) {
  const lower = status.toLowerCase();
  if (lower.includes("approve") || lower.includes("complete") || lower.includes("issued")) {
    return statusConfig.approved;
  }
  if (lower.includes("reject") || lower.includes("deny") || lower.includes("refuse")) {
    return statusConfig.rejected;
  }
  return statusConfig.pending;
}

interface CaseStatusCardProps {
  data: CaseStatus;
}

export default function CaseStatusCard({ data }: CaseStatusCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { icon: StatusIcon, color, bg } = getStatusInfo(data.status);

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="bg-surface border border-border-light rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-secondary tracking-wide uppercase">Receipt</span>
              </div>
              <p className="text-lg font-semibold tracking-tight truncate">{data.receiptNumber}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bg}`}>
              <StatusIcon className={`w-4 h-4 ${color}`} />
              <span className={`text-xs font-medium ${color} capitalize`}>{data.status}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border-light">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-secondary shrink-0" />
              <div>
                <p className="text-sm font-medium">{data.caseType}</p>
                <p className="text-sm text-secondary">{data.description}</p>
              </div>
            </div>
            <p className="text-xs text-secondary mt-3">Last updated: {data.statusDate}</p>
          </div>
        </div>

        {data.history && data.history.length > 0 && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-center gap-1 py-3 text-sm text-secondary hover:text-foreground border-t border-border-light transition-colors"
            >
              {expanded ? (
                <>
                  Hide history
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show history ({data.history.length})
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>

            {expanded && (
              <div className="px-6 pb-6 border-t border-border-light">
                <div className="mt-4 space-y-4">
                  {data.history.map((event, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                        {i < (data.history?.length ?? 0) - 1 && (
                          <div className="w-px flex-1 bg-border-light mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium">{event.event}</p>
                        <p className="text-xs text-secondary mt-0.5">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
