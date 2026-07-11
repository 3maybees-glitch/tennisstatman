"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Courtside watchlist: a member's saved players, persisted in localStorage. */

const STORAGE_KEY = "tsm-watchlist-v1";

const listeners = new Set<() => void>();

function emit() {
  for (const notify of listeners) notify();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function read(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  emit();
}

// Cache the parsed snapshot so useSyncExternalStore gets a stable reference.
const EMPTY: string[] = [];
let snapshotRaw = "";
let snapshotValue: string[] = [];

function getSnapshot(): string[] {
  let raw = "";
  try {
    raw = localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    raw = "";
  }
  if (raw !== snapshotRaw) {
    snapshotRaw = raw;
    snapshotValue = read();
  }
  return snapshotValue;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

export function useWatchlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = read();
    write(
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id],
    );
  }, []);

  const isWatched = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isWatched };
}
