"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./Button";
import { ContactForm } from "./ContactForm";
import { DemoBookingForm } from "./DemoBookingForm";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";

export function CtaSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden relative">
      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1], rotate: [180, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of enterprises using Procuro to gain competitive
            advantage through intelligent procurement. Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-4 text-lg font-medium bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-soft hover:shadow-soft-lg"
            >
              Contact Us
            </button>
            <button
              onClick={() => setIsDemoOpen(true)}
              className="px-8 py-4 text-lg font-medium border-2 border-orange-600 text-orange-600 rounded-xl hover:bg-orange-50 transition-all"
            >
              Schedule Demo
            </button>
          </div>

          <ContactForm
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
          <DemoBookingForm
            isOpen={isDemoOpen}
            onClose={() => setIsDemoOpen(false)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 pt-12"
        >
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-bold text-lg mb-4">Procuro</h3>
              <p className="text-gray-400 text-sm">
                AI-powered procurement intelligence platform by Innovacio
                Technologies.
              </p>
            </motion.div>

            {/* Product */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  Features
                </li>
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  Pricing
                </li>
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  Security
                </li>
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  Roadmap
                </li>
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  About
                </li>
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  Blog
                </li>
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  Careers
                </li>
                <li className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer font-medium">
                  Contact
                </li>
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Terms
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Security
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Compliance
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 Innovacio Technologies. All rights reserved.
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#f97316" }}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#f97316" }}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#f97316" }}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#f97316" }}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Github size={20} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
