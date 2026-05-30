import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, FileText, Gauge, Network, PenLine } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultLocale, isLocale } from "@/i18n-config";
import { toolShowcaseItems } from "@/lib/public-content";

type LocaleParams = {
  params: Promise<{ locale: string }>;
};

const toolIcons = [FileText, Gauge, PenLine, Network, BriefcaseBusiness, Bot, Gauge, BriefcaseBusiness, FileText] as const;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "phase1.meta.tools" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ToolsPage({ params }: LocaleParams) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "phase1.tools" });
  const tg = await getTranslations();

  return (
    <div className="bg-white">
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {toolShowcaseItems.map((tool, index) => {
            const Icon = toolIcons[index];

            return (
              <Card key={tool.title} className="card-elevated bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                      <Icon className="size-5" />
                    </div>
                    <Badge variant="secondary" className="rounded-full">
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-neutral-600">{tool.description}</CardContent>
                <CardFooter className="bg-blue-50/60">
                  <Button asChild variant="outline" className="w-full border-blue-200 text-blue-800 hover:bg-blue-50">
                    <Link href={`/${locale}${tool.href ?? ""}`}>
                      {t("openTool")}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900 px-6 py-10 text-white shadow-xl md:px-10">
          <div
            className="pointer-events-none absolute inset-0 bg-brand-grid opacity-20 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]"
            aria-hidden
          />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">{t("proEyebrow")}</p>
              <h2 className="mt-3 text-3xl font-semibold">{t("proTitle")}</h2>
              <p className="mt-3 max-w-2xl text-blue-50/90">{t("proDescription")}</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-800 hover:bg-blue-50">
              <Link href={`/${locale}/auth/sign-up`}>
                {tg("Get Started")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
