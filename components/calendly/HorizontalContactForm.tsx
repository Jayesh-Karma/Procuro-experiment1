import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Earth, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import zod from "zod";
import { ProgressLoader } from "../ui/Loader";

const formSchema = zod.object({
    fullName: zod.string().min(1),
    companyName: zod.string().min(1),
    businessEmailId: zod.string().email().min(1),
    phoneNumber: zod
        .string()
        .optional(),
    website: zod.string().optional(),
    message: zod.string().optional(),
    source: zod.string().optional(),
});
type TFormSchema = zod.infer<typeof formSchema>;


const WHATSAPP_NUMBER = "+919007271601";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`;

export default function HorizontalContactForm() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { source: pathname },
    });

    const onSubmit = async (e: TFormSchema) => {
        try {
            setLoading(true);
            await fetch("/api/sendContactEmail", {
                method: "POST",
                body: JSON.stringify(e),
                headers: { "content-type": "application/json" },
            });
            // toast.success("Thank you! We'll get back to you soon.", {
            //   position: "top-center",
            // });
            setSuccess("Thank you! We'll get back to you soon.");
            reset({
                fullName: "",
                companyName: "",
                businessEmailId: "",
                phoneNumber: "",
                website: "",
                message: "",
            });
        } catch {
            setError("Something went wrong, please try again.");
            // toast.error("Something went wrong, please try again.", {
            //   position: "bottom-center",
            // });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(null);
            }, 5000);
        }
    }, [success]);
    
    return (
 <div className="w-full max-w-5xl mx-auto">
  <style>
    {`
    .PhoneInput {
      display: flex;
      align-items: center;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 0.5rem;
    
      background: #f9fafb;
    }

    .PhoneInputInput {
      border: none;
      outline: none;
      flex: 1;
      font-size: 0.875rem;
      background: transparent;
    }

    .PhoneInputCountry {
      margin-right: 0.5rem;
    }
  `}
  </style>

  <div className="rounded-2xl border border-gray-200 shadow-lg bg-white overflow-hidden">
    <div className="p-4 sm:p-6 flex flex-col gap-4">

      <h2 className="text-center text-base sm:text-lg font-bold text-orange-500">
        Get a Free Consultation
      </h2>

      {/* FORM */}
      {!success && !loading && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >

          {/* INPUT ROW */}
          <div className="flex flex-col sm:flex-row gap-3">
            {(
                       [
                         { name: "fullName", placeholder: "Full Name *", type: "text" },
                         { name: "companyName", placeholder: "Company Name *", type: "text" },
                         { name: "businessEmailId", placeholder: "Business Email *", type: "email" },
                       ] as const
                     ).map(({ name, placeholder, type }) => (
                       <Controller
                         key={name}
                         control={control}
                         name={name}
                         render={({ field }) => (
                           <input
                             {...field}
                             type={type}
                             placeholder={placeholder}
                             className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all bg-gray-50 placeholder:text-gray-400 ${errors[name]
                               ? "border-red-400"
                               : "border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                               }`}
                           />
                         )}
                       />
                     ))}
          </div>

          {/* PHONE */}
          <div className="w-full flex flex-col md:flex-row items-center gap-5">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  international
                  internationalIcon={() => (
                    <Earth className="text-orange-400" size={18} />
                  )}
                  onChange={field.onChange}
                  placeholder="Enter phone number"
                  className=" w-full"
                />
              )}
            />

            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}


          <button
            type="submit"
            className="w-full sm:w-auto whitespace-nowrap sm:self-end px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 rounded-lg text-sm shadow-md shadow-orange-200 transition-all"
          >
            Submit Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
          </button>
          </div>

          {/* BUTTON */}
        </form>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center gap-2 min-h-[60px] text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Submitting...</span>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="text-green-600 text-sm font-medium text-center min-h-[60px]">
          Thank you for your submission! We'll get back to you soon.
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-red-500 text-sm font-medium text-center min-h-[60px]">
          Something went wrong. Please try again.
        </div>
      )}

    </div>
  </div>
</div>
    )
}