import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "image" | "text";
}

const sizeConfig = {
  sm: { width: 120, height: 30, text: "text-lg", class: "w-[120px] h-[30px]" },
  md: { width: 180, height: 45, text: "text-2xl", class: "w-[180px] h-[45px]" },
  lg: { width: 240, height: 60, text: "text-3xl", class: "w-[240px] h-[60px]" },
};

export function Logo({ className, size = "md", variant = "image" }: LogoProps) {
  const config = sizeConfig[size];
  
  if (variant === "image") {
    return (
      <Link href="/" className={cn("relative flex items-center", className)}>
        <img
          src="/images/logo/logo-horizontal.svg"
          alt="empentIA"
          className={config.class}
        />
      </Link>
    );
  }

  // Fallback a logo text si no hi ha imatge
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-1.5 font-bold text-emerald-500", 
        config.text, 
        className
      )}
    >
      <span className="font-semibold">empent</span>
      <span className="font-extrabold text-[1.1em]">IA</span>
    </Link>
  );
}
