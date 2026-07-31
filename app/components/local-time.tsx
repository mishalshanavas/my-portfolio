"use client";

import { useSyncExternalStore } from "react";

function formatTime() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 10000);
  return () => window.clearInterval(id);
}

export default function LocalTime() {
  const time = useSyncExternalStore(subscribe, formatTime, () => "");

  if (!time) return null;
  return <span>{time} IST</span>;
}
