import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CareerStudioHome } from "@/components/marketing/career-studio-home";
import { defaultLocale, isLocale } from "@/i18n-config";

type LocaleParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "phase1.meta.landing" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: "https://careerstudio.app/",
      images: ["/images/og-image.png"],
    },
  };
}

export default async function LandingPage({ params }: LocaleParams) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return <CareerStudioHome locale={locale} />;
}
