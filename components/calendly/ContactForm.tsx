"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { ArrowRight, Loader2 } from "lucide-react";

// ---------------- SCHEMA ----------------
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  companyName: z.string().min(1, "Company name is required"),
  businessEmailId: z.string().min(1, "Email is required"),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .optional(),
  website: z.string().optional(),
  message: z.string().optional(),
});

// ---------------- CUSTOM TOAST ----------------
const Toast = ({ message, type, onClose } : any) => {
  if (!message) return null;

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="font-bold">×</button>
      </div>
    </div>
  );
};

// ---------------- COMPONENT ----------------
const ContactForm = () => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const showToast = (message: any, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/sendContactEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      showToast("Message sent successfully!", "success");

      reset();
    } catch (error) {
      showToast("Something went wrong. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" max-w-xl min-w-md bg-white mx-auto p-4 border border-gray-200 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3">Contact Us</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-sm">
        {/* Full Name */}
        <div>
          <input
            placeholder="Full Name*"
            className="w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            {...control.register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <input
            placeholder="Company Name*"
            className="w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            {...control.register("companyName")}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            placeholder="Business Email*"
            className="w-full border p-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
            {...control.register("businessEmailId")}
          />
          {errors.businessEmailId && (
            <p className="text-red-500 text-sm">
              {errors.businessEmailId.message}
            </p>
          )}
        </div>

        {/* Website */}
        <div>
          <input
            placeholder="Website"
            className="w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            {...control.register("website")}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm">Phone Number</label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <PhoneInput
                className="border p-2 rounded w-full border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                {...field}
                international
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            placeholder="Message"
            className="w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            {...control.register("message")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 rounded-lg text-white py-2 cursor-pointer hover:bg-orange-600  group flex items-center justify-center gap-2 transition-all ease-in-out duration-300"
        >
          Send Message 
          {
            loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
            )
          }
        </button>
      </form>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
};

export default ContactForm;
