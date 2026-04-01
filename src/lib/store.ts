import { useState, useCallback } from "react";

// Simple global state without external dependencies
type Listener = () => void;

class Store<T> {
  private state: T;
  private listeners: Set<Listener> = new Set();

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(update: Partial<T> | ((prev: T) => T)) {
    if (typeof update === "function") {
      this.state = update(this.state);
    } else {
      this.state = { ...this.state, ...update };
    }
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

interface AppState {
  activeSection: string;
  backendUrl: string;
  isDemoMode: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export const appStore = new Store<AppState>({
  activeSection: "dashboard",
  backendUrl: "",
  isDemoMode: true,
  notifications: [],
});

export function useAppStore() {
  const [, forceUpdate] = useState(0);

  const state = appStore.getState();

  const setSection = useCallback((section: string) => {
    appStore.setState({ activeSection: section });
    forceUpdate((n) => n + 1);
  }, []);

  const setBackendUrl = useCallback((url: string) => {
    appStore.setState({ backendUrl: url, isDemoMode: !url });
    forceUpdate((n) => n + 1);
  }, []);

  return { ...state, setSection, setBackendUrl };
}
