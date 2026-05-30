"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { LangSwitcher } from "@/components/lang-switcher";
import type { Locale } from "@/i18n-config";

const navItems = [
  ["Home", ""],
  ["Tools", "tools"],
  ["Resources", "resources"],
  ["Courses", "courses"],
  ["Pricing", "pricing"],
  ["Blog", "blog"],
] as const;

export function PublicNav({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const prefix = `/${locale}`;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <div className="mx-auto max-w-6xl">
        <div
          className={`flex items-center justify-between gap-4 rounded-full border px-3 py-2 pl-5 transition-all duration-300 ${
            scrolled ? "glass-surface border-transparent" : "border-transparent"
          }`}
        >
          <Link href={prefix} className="flex items-center gap-2.5 text-[1.05rem] font-bold tracking-tight text-[#0b1220]">
            <span className="brand-mark grid size-9 place-items-center rounded-[10px] text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative size-[18px]"
              >
                <path d="M3 13l4 4 6-9 4 6 4-7" />
              </svg>
            </span>
            <span>
              Career<span className="text-blue-600">Studio</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(([label, href]) => (
              <Link
                key={label}
                href={`${prefix}/${href}`.replace(/\/$/, "")}
                className="rounded-[10px] px-3.5 py-2 text-[0.95rem] font-medium text-[#2a3850] transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                {t(label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitcher />
            <Link
              href={`${prefix}/auth/sign-in`}
              className="hidden rounded-xl border border-white/70 bg-white/70 px-4 py-2 text-[0.92rem] font-semibold text-blue-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
            >
              {t("Sign In")}
            </Link>
            <Link
              href={`${prefix}/auth/sign-up`}
              className="inline-flex items-center rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2 text-[0.92rem] font-semibold text-white shadow-[0_10px_40px_-8px_rgba(37,99,235,0.45)] transition hover:-translate-y-0.5"
            >
              {t("Get Started")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
