import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-16 ">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-10 md:p-14 shadow-2xl border border-gray-800">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Content */}
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-block mb-4 px-4 py-1 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
              Book a Free Meet
            </span>

            <h1 className="text-4xl font-bold text-white leading-tight">
              Ready to Build Something{" "}
              <span className="text-orange-500">
                Great?
              </span>
            </h1>

            <p className="mt-5 text-gray-400 text-md leading-relaxed">
              Let’s discuss your idea and turn it into a powerful digital
              product with modern design and scalable technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col  gap-4 w-full sm:w-auto">
            
            {/* Primary CTA */}
            <Link href={'/demo'} className="px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-md transition-all cursor-pointer duration-300 shadow-lg hover:shadow-orange-500/30 hover:scale-105">
              Try Free Demo
            </Link>

            {/* Secondary CTA */}
            <Link href={'/contact'} className="px-8 py-4 text-center rounded-xl border border-gray-600 text-gray-200 hover:bg-white hover:text-black font-semibold text-md cursor-pointer transition-all duration-300">
              Contact Us
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}