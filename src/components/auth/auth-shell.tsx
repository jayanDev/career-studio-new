import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import type { Locale } from "@/i18n-config";

export function AuthShell({
  locale,
  brand,
  title,
  subtitle,
  featureTitleOne,
  featureBodyOne,
  featureTitleTwo,
  featureBodyTwo,
  featureTitleThree,
  featureBodyThree,
  children,
}: {
  locale: Locale;
  brand: string;
  title: string;
  subtitle: string;
  featureTitleOne: string;
  featureBodyOne: string;
  featureTitleTwo: string;
  featureBodyTwo: string;
  featureTitleThree: string;
  featureBodyThree: string;
  children: React.ReactNode;
}) {
  const features = [
    { icon: Sparkles, title: featureTitleOne, body: featureBodyOne },
    { icon: ShieldCheck, title: featureTitleTwo, body: featureBodyTwo },
    { icon: CheckCircle2, title: featureTitleThree, body: featureBodyThree },
  ];

  return (
    <main className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 px-6 py-10 text-white lg:px-12">
        {/* soft glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-24 size-96 rounded-full bg-[#76a4ff]/40 blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 size-[26rem] rounded-full bg-cyan-400/25 blur-[90px]"
        />
        <div className="relative mx-auto max-w-lg">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span className="brand-mark grid size-10 place-items-center rounded-xl text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative size-5"
              >
                <path d="M3 13l4 4 6-9 4 6 4-7" />
              </svg>
            </span>
            {brand}
          </Link>
          <h1 className="mt-10 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-blue-100">{subtitle}</p>
          <div className="mt-9 grid gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{feature.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-blue-100">{feature.body}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-brand-wash flex items-center px-4 py-10">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
