"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function BookDemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, company, role, when, notes });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X />
        </button>
        <h3 className="text-lg font-bold mb-2">Book a Demo</h3>
        <p className="text-sm text-stone-500 mb-4">30-minute session tailored to your data and goals.</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="px-3 py-2 border rounded-lg" />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className="px-3 py-2 border rounded-lg" />
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="px-3 py-2 border rounded-lg" />
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role / title" className="px-3 py-2 border rounded-lg" />
          </div>
          <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="Preferred time / timezone" className="px-3 py-2 border rounded-lg" />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything you'd like us to know" className="px-3 py-2 border rounded-lg" rows={3} />
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold">{sent ? "Scheduling..." : "Book demo"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
