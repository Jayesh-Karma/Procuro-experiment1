"use client";

import ContactFormV2 from "./ContactFormV2";

export default function ContactPage() {
    return (
<main className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white font-space py-25 md:py-20 overflow-hidden">
  <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16">
    
    {/* LEFT CONTENT */}
    <div className="w-full max-w-xl space-y-5 text-center lg:text-left">
      
      <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-500 font-bold text-xs tracking-wider">
        Contact
      </div>

      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
        Let&apos;s build something that moves the needle.
      </h1>

      <p className="text-sm sm:text-base text-black/75 leading-relaxed">
        We specialise in supply-chain intelligence, tailored AI, and integrated dashboards that deliver measurable ROI. Tell us about your challenge and we&apos;ll respond within one business day.
      </p>

      <div className="rounded-lg border border-black/5 p-4 sm:p-6 bg-black/[0.02] text-left">
        <h3 className="text-sm font-semibold mb-2">Quick contact details</h3>
        <p className="text-sm text-black/70">
          Phone: <a className="text-orange-500 font-medium" href="tel:+919007271601">+91 90072 71601</a>
        </p>
        <p className="text-sm text-black/70">
          Email: <a className="text-orange-500 font-medium" href="mailto:hello@innovaciotech.com">hello@innovaciotech.com</a>
        </p>
        <p className="text-sm text-black/70">
          Website: <a className="text-orange-500 font-medium break-all" href="https://innovaciotech.com" target="_blank">
            innovaciotech.com
          </a>
        </p>
      </div>

 
    </div>

    {/* RIGHT FORM */}
    <div className="w-full lg:w-auto flex justify-center">
      <ContactFormV2 />
    </div>
  </section>

  {/* FOOTER */}
  <div className="mt-12">
    <div className="max-w-6xl mx-auto text-center text-xs text-black/50">
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
        <a href="tel:+919007271601" className="hover:text-orange-400 transition-colors">
          +91 90072 71601
        </a>
        <span className="hidden sm:inline">·</span>
        <a href="mailto:hello@innovaciotech.com" className="hover:text-orange-400 transition-colors">
          hello@innovaciotech.com
        </a>
        <span className="hidden sm:inline">·</span>
        <a href="https://innovaciotech.com" className="hover:text-orange-400 transition-colors break-all">
          innovaciotech.com
        </a>
      </div>
    </div>
  </div>
</main>
    );
}