"use client";

import React, { createContext, useContext, useState } from "react";
import ContactModal from "../ContactForm/ContactModal";
import BookDemoModal from "../ContactForm/BookDemoModal";

type ModalName = "contact" | "demo" | null;

type ModalContextValue = {
  open: (m: Exclude<ModalName, null>) => void;
  close: () => void;
  current: ModalName;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<ModalName>(null);

  const open = (m: Exclude<ModalName, null>) => setCurrent(m);
  const close = () => setCurrent(null);

  return (
    <ModalContext.Provider value={{ open, close, current }}>
      {children}
      <ContactModal open={current === "contact"} onClose={close} />
      <BookDemoModal open={current === "demo"} onClose={close} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export default ModalProvider;
