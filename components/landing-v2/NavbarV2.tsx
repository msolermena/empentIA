"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";

export function NavbarV2() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo size="md" variant="image" />
        <div className="flex items-center gap-6">
          <span className="hidden text-sm font-medium text-slate-400 md:block cursor-pointer hover:text-emerald-400 transition-colors">
            Com funciona
          </span>
          <span className="hidden text-sm font-medium text-slate-400 md:block cursor-pointer hover:text-emerald-400 transition-colors">
            Contacte
          </span>
          <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/20 cursor-pointer">
            Accés clients
          </span>
        </div>
      </nav>
    </header>
  );
}
