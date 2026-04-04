import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Earth, Loader2, MailCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";



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

export default function ContactFormV2() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [countdown, setCountdown] = useState<number | null>(null);



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

      setToast({
        message: "Your message has been delivered to our team. We will get back to you soon.",
        type: "success",
      });

      setCountdown(3);

      reset({
        fullName: "",
        companyName: "",
        businessEmailId: "",
        phoneNumber: "",
        website: "",
        message: "",
      });
    } catch(err) {
      setToast({
        message: "Something went wrong. Try again.",
        type: "error",
      })
    } finally {
      setLoading(false);
    }
  };

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
                  
              }, 250);
          }
      }, [countdown, toast.type, reset]);
  
  

  return (
    <div className="w-full lg:w-[420px] shrink-0">
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
      <div className="rounded-2xl border border-gray-100 shadow-xl bg-white overflow-hidden">
        <div className="p-6 flex flex-col gap-3">
          <h2 className="text-center text-lg font-bold text-orange-500 mb-1">
            Get a Free Consultation
          </h2>

        { (toast.type !== "success" && !loading) ?  (
          <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-[50vh] flex-col gap-3">
            {(
              [
                { name: "fullName", placeholder: "Full Name *", type: "text" },
                { name: "companyName", placeholder: "Company Name *", type: "text" },
                { name: "businessEmailId", placeholder: "Business Email *", type: "email" },
                { name: "website", placeholder: "Business Website", type: "text" },
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

            <div
              className="border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                    className={`PhoneInput w-full border ring-none p-2 rounded border-gray-200 bg-gray-50 text-sm focus:outline-none ring-0`}
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Tell us about your project..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition-all bg-gray-50 resize-none placeholder:text-gray-400"
                />
              )}
            />
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-0.5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
              >
                {/* WhatsApp SVG icon */}
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Faster via WhatsApp

              </a>
            </div>
            <button
              type="submit"
              className="btn-shimmer group w-full flex items-center gap-2 justify-center cursor-pointer bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold py-3 rounded-lg text-sm shadow-md shadow-orange-200"
            >
              {
                loading ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  <>
                  Submit Now <ArrowRight className="group-hover:translate-x-1 transition-all ease-in-out duration-200"/>
                  </>
                )
              }
            </button>
          </form>) : loading ? (
                  <div className="flex flex-col text-gray-200 items-center justify-center min-h-[50vh]">
                        <Loader2 className="w-14 h-14 text-gray-200 animate-spin" />
                        <p className="animate-pulse">Sending Email</p>
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
                          <p className="text-sm text-stone-500">Closing in {countdown}s</p>
                        )}
                    </div>
          )

        }
        </div>
      </div>
    </div>
  )
}