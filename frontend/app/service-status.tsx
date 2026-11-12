"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "ready" | "unavailable";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export function ServiceStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function checkReadiness() {
      try {
        const response = await fetch(`${apiBaseUrl}/health/ready`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (mounted) setStatus(response.ok ? "ready" : "unavailable");
      } catch {
        if (mounted && !controller.signal.aborted) setStatus("unavailable");
      }
    }

    void checkReadiness();
    const intervalId = window.setInterval(checkReadiness, 5000);
    return () => {
      mounted = false;
      window.clearInterval(intervalId);
      controller.abort();
    };
  }, []);

  const message = {
    checking: "Checking API + database…",
    ready: "API + database connected",
    unavailable: "API or database not connected",
  }[status];

  return (
    <div className="service-status" aria-live="polite" aria-busy={status === "checking"}>
      <span className={`service-indicator service-indicator-${status}`} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
