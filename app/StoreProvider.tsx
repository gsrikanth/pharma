"use client";
import type { AppStore } from "@/lib/store";
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef, createContext } from "react";
import { Provider } from "react-redux";
import localforage from "localforage";

interface Props {
  readonly children: ReactNode;
}

export const LocalForageContext = createContext<LocalForage | null>(null);

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);
  const localForageRef = useRef(localforage);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
    if (!localForageRef.current) {
      // Create the store instance the first time this renders
      localForageRef.current = localforage.createInstance({
        name: "pharmaApp",
        storeName: "pharmaStore",
        driver: [
          localforage.INDEXEDDB,
          localforage.WEBSQL,
          localforage.LOCALSTORAGE,
        ],
      });
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <LocalForageContext.Provider value={localForageRef.current}>
        {children}
      </LocalForageContext.Provider>
    </Provider>
  );
};
