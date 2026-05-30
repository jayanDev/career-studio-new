"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Compass,
  CreditCard,
  FileText,
  Gauge,
  Handshake,
  LayoutDashboard,
  MessageSquare,
  Network,
  PenLine,
  Presentation,
  Settings,
  ShieldCheck,
  Users,
  User,
  Search,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { PlanTier } from "@prisma/client";

import { PlanTierBadge } from "@/components/account/plan-tier-badge";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n-config";

const sidebarItems = [
  ["Dashboard", "dashboard", LayoutDashboard],
  ["Resumes", "resumes", FileText],
  ["ATS Checker", "ats", ShieldCheck],
  ["Cover Letters", "cover-letter", PenLine],
  ["Graphical CV", "gcv", Presentation],
  ["My Career Profile", "talent", User],
  ["Find Candidates", "talent-pool", Search],
  ["Shortlists", "talent-pool/shortlist", Network],
  ["Job Tracker", "job-tracker", BriefcaseBusiness],
  ["Interview", "interview", MessageSquare],
  ["Salary Insights", "salary", Gauge],
  ["Career GPS", "career-gps", Compass],
  ["LinkedIn Optimizer", "linkedin", BadgeCheck],
  ["Messages", "messaging", MessageSquare],
  ["Forum", "forum", Users],
  ["Connections", "connections", Network],
  ["Mentorship", "mentorship", Handshake],
  ["Notifications", "notifications", Bell],
  ["Admin", "admin", ShieldCheck],
  ["Billing", "billing", CreditCard],
  ["Settings", "settings", Settings],
] as const;

export function AppSidebar({ locale, planTier }: { locale: Locale; planTier: PlanTier }) {
  const t = useTranslations();
  const pathname = usePathname();
  const prefix = `/${locale}`;

  // Highlight the most specific matching nav item (longest path prefix).
  const activeHref =
    sidebarItems
      .map(([, href]) => href)
      .filter((href) => {
        const full = `${prefix}/${href}`;
        return pathname === full || pathname.startsWith(`${full}/`);
      })
      .sort((a, b) => b.length - a.length)[0] ?? null;

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/60 bg-white/70 backdrop-blur-xl lg:block">
      <div className="flex h-16 items-center gap-2.5 px-5">
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
        <span className="font-bold tracking-tight text-[#0b1220]">
          Career<span className="text-blue-600">Studio</span>
        </span>
      </div>
      <div className="px-5 pb-4">
        <PlanTierBadge planTier={planTier} label={t(`phase2.plans.${planTier}`)} />
      </div>
      <Separator className="bg-white/60" />
      <nav className="grid gap-1 p-3">
        {sidebarItems.map(([label, href, Icon]) => {
          const active = href === activeHref;
          return (
            <Link
              key={href}
              href={`${prefix}/${href}`}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_8px_24px_-10px_rgba(37,99,235,0.7)]"
                  : "text-[#5a6b86] hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon className="size-4" />
              {t(label)}
            </Link>
          );
        })}
      </nav>
      <div className="mt-3 px-6 text-xs text-muted-foreground">
        <BookOpen className="mb-2 size-4" />
        {t("Sri Lanka first")}
      </div>
    </aside>
  );
}
