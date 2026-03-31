import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Earth, Globe, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface DownloadModalProps {
    onClose: () => void;
    selectedCasestudy: string | undefined;
}

// ---------------- SCHEMA ----------------
const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    companyName: z.string().min(1, "Company name is required"),
    businessEmailId: z.string().min(1, "Email is required"),
    phoneNumber: z
        .string()
        .optional(),
    website: z.string().optional(),
    message: z.string().optional(),
    selectedCaseStudy: z.string().optional() ,
});



const WHATSAPP_NUMBER = "+919007271601";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`;

export default function DownloadModal({ onClose, selectedCasestudy }: DownloadModalProps) {

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

    useEffect(() => {
        control.register("selectedCaseStudy", { value: selectedCasestudy });

    }, [control, selectedCasestudy]);

    const showToast = (message: any, type: string = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
    };

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const res = await fetch("/api/sendCaseStudy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed");

            showToast("Message sent successfully!", "success");
            onClose();
            reset();
        } catch (error) {
            showToast("Something went wrong. Try again.", "error");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50">
            <style>
                {`
        /* globals.css */

.PhoneInput {
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb; /* gray-200 */
  border-radius: 0.375rem;
  padding: 0.5rem;
}

.PhoneInputInput {
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.875rem;
}

.PhoneInputCountry {
  margin-right: 0.5rem;
}`}
            </style>


            <div className="bg-white rounded-lg p-8 md:max-w-md max-w-[90%]   w-full">
                <div className="flex items-center mb-5 justify-between">

                    <div className="leading-0">
                        <h2 className="text-xl md:text-2xl font-bold">Download Case Study</h2>
                        <p className=" text-xs md:text-sm text-gray-500">Enter your email to receive the case study PDF.</p>
                    </div>

                    <button className="text-gray-500 cursor-pointer transition-all ease-in-out hover:text-gray-700" onClick={onClose}>
                        <X />
                    </button>
                </div>

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
                    <div 
                    className="border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <PhoneInput
                                    value={field.value}
                                    internationalIcon={() => (<Earth className="text-blue-400" size={20} />)}
                                    international

                                    onChange={field.onChange}
                                    placeholder="Enter phone number"
                                    className="PhoneInputInput w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                        Get the case study
                        {
                            loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
                            )
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}