"use client";

import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

// Utility functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const consent = getCookie("cookie_consent");
      if (!consent) {
        setVisible(true);
      }
    }, 100);
    return () => clearTimeout(t);
  }, []);

  const handleAccept = () => {
    setCookie("cookie_consent", "accepted", 180);
    console.log("Full analytics enabled");
    setVisible(false);
  };

  const handleLimited = () => {
    setCookie("cookie_consent", "limited", 180);
    console.log("Limited analytics enabled");
    setVisible(false);
  };

  const handleReject = () => {
    setCookie("cookie_consent", "rejected", 180);
    console.log("Analytics disabled");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 w-[90%] sm:w-[360px] bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="text-2xl"><Cookie className="text-orange-500" /></div>
        <h3 className="text-sm font-semibold text-gray-800">
          Cookie Preferences
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
        We use cookies to enhance your experience, provide essential
        functionality, and analyze site usage. You can choose your preferred
        level of data sharing.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {/* Accept */}
        <button
          onClick={handleAccept}
          className="w-full py-2.5 cursor-pointer text-sm font-medium rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Accept All
        </button>

        {/* Limited */}
        <button
          onClick={handleLimited}
          className="w-full py-2.5 cursor-pointer text-sm font-medium rounded-xl border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 transition"
        >
          Limited Accept
        </button>

        {/* Reject */}
        <button
          onClick={handleReject}
          className="w-full py-2.5 cursor-pointer text-sm font-medium rounded-xl border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
