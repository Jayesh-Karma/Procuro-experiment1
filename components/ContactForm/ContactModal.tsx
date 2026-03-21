"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up to API — for now just log and close
    console.log({ name, email, company, phone, location });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X />
        </button>
        <h3 className="text-lg font-bold mb-2">Contact Us</h3>
        <p className="text-sm text-stone-500 mb-4">Tell us about your needs and we’ll get back within one business day.</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="px-3 py-2 border rounded-lg" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="px-3 py-2 border rounded-lg" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="px-3 py-2 border rounded-lg" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="px-3 py-2 border rounded-lg" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (City, Country)" className="px-3 py-2 border rounded-lg" />
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold">{sent ? "Sending..." : "Send"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
