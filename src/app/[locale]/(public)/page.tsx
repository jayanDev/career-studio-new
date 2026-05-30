import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Compass,
  FileText,
  Mail,
  MapPin,
  Network,
  ScanLine,
  Sparkles,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultLocale, isLocale } from "@/i18n-config";
import { landingFeatures, landingStats, resumeTemplateTiers } from "@/lib/public-content";

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

const tools = [
  { name: "ATS Checker", blurb: "Score your CV against any job in seconds.", href: "ats", icon: ScanLine },
  { name: "Resume Builder", blurb: "Live ATS feedback as you write.", href: "resumes", icon: FileText },
  { name: "Cover Letters", blurb: "Tailored to the role, on brand.", href: "cover-letter", icon: Mail },
  { name: "LinkedIn Optimizer", blurb: "Audit and lift your profile.", href: "linkedin", icon: Network },
  { name: "Career GPS", blurb: "A step-by-step plan to your next role.", href: "career-gps", icon: Compass },
  { name: "Talent Pool", blurb: "Get discovered by recruiters.", href: "talent-pool", icon: Users },
] as const;

export default async function LandingPage({ params }: LocaleParams) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "phase1.landing" });
  const prefix = `/${locale}`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-brand-wash">
        <div
          className="pointer-events-none absolute inset-0 bg-brand-grid opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Badge
              variant="outline"
              className="h-8 gap-1.5 rounded-full border-blue-200 bg-white/80 px-3 text-blue-700 shadow-sm backdrop-blur"
            >
              <MapPin className="size-3.5" />
              {t("kicker")}
            </Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
              {t("headline")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{t("subheadline")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-sm">
                <Link href={`${prefix}/auth/sign-up`}>
                  {t("primaryCta")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-200 bg-white text-blue-800">
                <Link href={`${prefix}/ats`}>{t("secondaryCta")}</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-blue-600" />
                {t("trustOne")}
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-blue-600" />
                {t("trustTwo")}
              </span>
            </div>
          </div>

          {/* Preview card with floating score chip */}
          <div className="relative">
            <div
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-100 via-transparent to-sky-100 blur-2xl"
              aria-hidden
            />
            <div className="rounded-2xl border border-blue-100 bg-white/90 p-3 shadow-2xl shadow-blue-900/10 backdrop-blur">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950">
                <Image
                  src="/images/ats-preview.jpg"
                  alt={t("previewAlt")}
                  width={920}
                  height={620}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                {landingStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
                    <div className="text-xl font-semibold text-blue-900">{stat.value}</div>
                    <div className="mt-1 text-xs leading-5 text-blue-950/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-3 -top-3 hidden items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 shadow-lg sm:flex">
              <Sparkles className="size-4" />
              AI-powered
            </div>
          </div>
        </div>
      </section>

      {/* Tools showcase — every tool, one home */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
        <SectionHeading
          eyebrow="One platform"
          title="Every tool your job hunt needs"
          description="From a first ATS scan to a recruiter-ready profile — all under one clean, consistent workspace."
          align="center"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                href={`${prefix}/${tool.href}`}
                className="group card-elevated flex items-start gap-4 p-5 hover:border-blue-200"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-semibold text-slate-900">
                    {tool.name}
                    <ArrowRight className="size-4 -translate-x-1 text-blue-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{tool.blurb}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="border-y border-blue-100 bg-brand-wash">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
          <SectionHeading
            eyebrow={t("featuresEyebrow")}
            title={t("featuresTitle")}
            description={t("featuresDescription")}
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {landingFeatures.map((feature, index) => {
              const icons = [Sparkles, BadgeCheck, FileText] as const;
              const Icon = icons[index] ?? Sparkles;

              return (
                <Card key={feature.title} className="card-elevated border-blue-100/80 bg-white">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-slate-600">{feature.description}</CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t("templatesEyebrow")}
            title={t("templatesTitle")}
            description={t("templatesDescription")}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {resumeTemplateTiers.map((tier) => (
              <Card key={tier.name} className="card-elevated bg-white">
                <CardHeader>
                  <Badge variant={tier.name === "Basic" ? "secondary" : "default"} className="w-fit rounded-full">
                    {tier.price}
                  </Badge>
                  <CardTitle className="text-slate-900">{tier.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-slate-600">{tier.description}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-blue-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3">
          {landingStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-semibold tracking-tight text-blue-700 md:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900 px-6 py-12 text-white shadow-xl md:px-12">
          <div
            className="pointer-events-none absolute inset-0 bg-brand-grid opacity-20 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]"
            aria-hidden
          />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-blue-100">
                <BarChart3 className="size-4" />
                {t("ctaEyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t("ctaTitle")}</h2>
              <p className="mt-3 max-w-2xl text-blue-50/90">{t("ctaDescription")}</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-800 hover:bg-blue-50">
              <Link href={`${prefix}/auth/sign-up`}>
                {t("primaryCta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
