"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { getWesixConfig } from "@/lib/wesixConfig";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/about" },
  { name: "Funcionalidades", href: "/features" },
  { name: "Planos", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logoUrl, siteName } = getWesixConfig();
  const brandName = siteName || 'WeSix';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-4 ${
          scrolled
            ? "bg-white/85 backdrop-blur-md border-b border-border-light shadow-[0_4px_30px_rgba(94,61,255,0.03)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {logoUrl ? (
              <img src={logoUrl} alt={brandName} className="h-9 w-auto object-contain" />
            ) : (
              <span className="font-jakarta text-2xl font-extrabold tracking-tight text-text-navy transition-all duration-300">
                {brandName}<span className="text-primary group-hover:text-accent transition-all duration-300">.io</span>
              </span>
            )}
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-jakarta text-sm font-medium transition-all duration-300 relative py-2 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-text-gray hover:text-text-navy"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Action - Vibrant Sunset Orange as seen in the mockup */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/pricing"
              className="font-jakarta text-xs font-bold text-white bg-accent hover:bg-accent-dark shadow-[0_4px_15px_rgba(255,110,30,0.25)] hover:shadow-[0_4px_20px_rgba(255,110,30,0.4)] px-6 py-3 rounded-full transition-all duration-300 flex items-center group gap-1 border border-white/10"
            >
              <span>Experimentar agora</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-gray hover:text-text-navy focus:outline-none transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl md:hidden pt-28 px-6 pb-8 flex flex-col justify-between"
          >
            <nav className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`font-jakarta text-2xl font-bold tracking-tight block ${
                        isActive ? "text-primary text-3xl font-extrabold" : "text-text-gray"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col space-y-4"
            >
              <Link
                href="/pricing"
                className="font-jakarta font-bold text-center text-white bg-accent hover:bg-accent-dark shadow-[0_4px_20px_rgba(255,110,30,0.3)] px-6 py-4 rounded-xl transition-all duration-300 w-full"
              >
                Experimentar agora
              </Link>
              <p className="text-center text-xs text-text-gray font-jakarta">
                Seu parceiro para despesas e organização.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
