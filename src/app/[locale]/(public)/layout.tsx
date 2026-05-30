import Link from "next/link";

import { CookieConsentBanner } from "@/components/cookie-consent";
import { PublicNav } from "@/components/nav/public-nav";
import { defaultLocale, isLocale } from "@/i18n-config";
import { getTranslations } from "next-intl/server";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNav locale={locale} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#e4eaf5] bg-white">
        <div className="mx-auto max-w-6xl px-7 pb-10 pt-14">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
            <div>
              <Link
                href={`/${locale}`}
                className="mb-3.5 flex items-center gap-2.5 text-[1.05rem] font-bold tracking-tight text-[#0b1220]"
              >
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
              <p className="max-w-xs text-[#5a6b86]">{t("Sri Lankan career tools for every step")}</p>
            </div>
            <div>
              <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#8493ab]">
                {t("Quick Links")}
              </h4>
              <div className="grid gap-1.5 text-[0.96rem] text-[#2a3850]">
                <Link href={`/${locale}/tools`} className="py-1.5 transition-colors hover:text-blue-700">
                  {t("Tools")}
                </Link>
                <Link href={`/${locale}/courses`} className="py-1.5 transition-colors hover:text-blue-700">
                  {t("Courses")}
                </Link>
                <Link href={`/${locale}/blog`} className="py-1.5 transition-colors hover:text-blue-700">
                  {t("Blog")}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#8493ab]">
                {t("Legal")}
              </h4>
              <div className="grid gap-1.5 text-[0.96rem] text-[#2a3850]">
                <Link href={`/${locale}/privacy`} className="py-1.5 transition-colors hover:text-blue-700">
                  {t("Privacy Policy")}
                </Link>
                <Link href={`/${locale}/terms`} className="py-1.5 transition-colors hover:text-blue-700">
                  {t("Terms of Service")}
                </Link>
                <span className="py-1.5">{t("Feedback")}</span>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-[#e4eaf5] pt-6 text-[0.9rem] text-[#8493ab]">
            <span>© 2026 Career Studio. Made for Sri Lankan job seekers.</span>
            <span>Phase 1 · Next.js migration</span>
          </div>
        </div>
      </footer>
      <CookieConsentBanner locale={locale} />
    </div>
  );
}
