"use client";

import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

type ModalName = "contact" | "demo" | null;

type ModalContextValue = {
  open: (m: Exclude<ModalName, null>) => void;
  close: () => void;
  current: ModalName;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Instead of rendering modal components, route to dedicated pages.
  const open = (m: Exclude<ModalName, null>) => {
    if (m === "contact") router.push("/contact");
    if (m === "demo") router.push("/book-demo");
  };
  const close = () => {};

  return (
    <ModalContext.Provider value={{ open, close, current: null }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export default ModalProvider;
