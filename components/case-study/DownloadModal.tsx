import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Earth, Globe, Loader2, MailCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { redirect } from "next/navigation";

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
    selectedCaseStudy: z.string().optional(),
});



const WHATSAPP_NUMBER = "+919007271601";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`;

export default function DownloadModal({ onClose, selectedCasestudy }: DownloadModalProps) {

    const [toast, setToast] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);


    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        // populate hidden selectedCaseStudy field
        if (selectedCasestudy) setValue("selectedCaseStudy", selectedCasestudy);
    }, [selectedCasestudy, setValue]);



    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const res = await fetch("/api/sendCaseStudy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed");

      
            setToast({ message: "Your case study has been delivered to your email. Please review it to see the real results achieved in your industry.", type: "success" });
            // start countdown to auto-close
            setCountdown(3);
            localStorage.setItem("filledForm", "true");


            reset({
                fullName: "",
                companyName: "",
                businessEmailId: "",
                phoneNumber: "",
                website: "",
                message: "",
                selectedCaseStudy: "",
            });


        } catch (error) {
            console.log(error);
            setToast({ message: "Something went wrong. Try again.", type: "error" });
            
        } finally {
            setLoading(false);
        }
    };

    // handle auto-close countdown when success
    useEffect(() => {

        if (toast.type === "success" && countdown && countdown > 0) {
            const id = setInterval(() => setCountdown((c) => (c ? c - 1 : null)), 1000);
            return () => clearInterval(id);
        }
        if (toast.type === "success" && countdown === 0) {
            // close and reset
            reset();
            setTimeout(() => {
                setToast({ message: "", type: "" });
                setCountdown(null);
            console.log("selectedCasestudy", selectedCasestudy);

                   window.open(`/case-studies/${selectedCasestudy}.pdf`, "_blank", 'noopener,noreferrer');
                    onClose();
            }, 250);
        }
    }, [countdown, toast.type, onClose, reset]);




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
                        <h2 className="text-xl md:text-2xl font-bold">See Case Study</h2>
                        <p className=" text-xs font-space md:text-sm text-gray-500">Enter your email to open the case study PDF.</p>
                    </div>

                    <button className="text-gray-500 cursor-pointer transition-all ease-in-out hover:text-gray-700" onClick={onClose}>
                        <X />
                    </button>
                </div>

            { 
                (toast?.type !== "success" && !loading) ?
                (<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col font-space gap-3 min-h-[50vh] text-sm">
                    {/* Full Name */}
                    <div>
                        <input
                            placeholder="Full Name*"
                            disabled={loading || toast.type === "success"}
                            aria-disabled={loading || toast.type === "success"}
                            className={`w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ${loading || toast.type === "success" ? "opacity-60 cursor-not-allowed" : ""}`}
                            {...register("fullName")}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <input
                            placeholder="Company Name*"
                            disabled={loading || toast.type === "success"}
                            aria-disabled={loading || toast.type === "success"}
                            className={`w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ${loading || toast.type === "success" ? "opacity-60 cursor-not-allowed" : ""}`}
                            {...register("companyName")}
                        />
                        {errors.companyName && (
                            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            placeholder="Business Email*"
                            disabled={loading || toast.type === "success"}
                            aria-disabled={loading || toast.type === "success"}
                            className={`w-full border p-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 ${loading || toast.type === "success" ? "opacity-60 cursor-not-allowed" : ""}`}
                            {...register("businessEmailId")}
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
                            disabled={loading || toast.type === "success"}
                            aria-disabled={loading || toast.type === "success"}
                            className={`w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ${loading || toast.type === "success" ? "opacity-60 cursor-not-allowed" : ""}`}
                            {...register("website")}
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
                                    disabled={loading || toast.type === "success"}
                                    className={`PhoneInputInput w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ${loading || toast.type === "success" ? "opacity-60" : ""}`}
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
                            disabled={loading || toast.type === "success"}
                            aria-disabled={loading || toast.type === "success"}
                            className={`w-full border p-2 rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ${loading || toast.type === "success" ? "opacity-60 cursor-not-allowed" : ""}`}
                            {...register("message")}
                        />
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || toast.type === "success"}
                        className={`bg-orange-500 rounded-lg text-white py-2 cursor-pointer hover:bg-orange-600  group flex items-center justify-center gap-2 transition-all ease-in-out duration-300 ${loading || toast.type === "success" ? "opacity-60 cursor-not-allowed" : ""}`}
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
                </form>) : loading ? (
                    <div className="flex flex-col text-gray-200 items-center justify-center min-h-[50vh]">
                        <Loader2 className="w-10 h-10 text-gray-200 animate-spin" />
                   
                    </div>
                ) : (
                    <div className="flex items-center flex-col justify-center min-h-[50vh] gap-3">
                        <div className="p-6 rounded-full bg-green-50 flex items-center justify-center">
                          <MailCheck className="w-20 h-20 text-green-500" />
                        </div>
                        <h1 className="text-xl font-semibold text-green-700 text-center max-w-[22rem]">
                            {toast?.message}
                        </h1>
                        {countdown !== null && (
                          <p className="text-sm text-stone-500">Redirecting you to case study {countdown}s</p>
                        )}
                    </div>
                )

            }
            </div>
        </div>
    )
}