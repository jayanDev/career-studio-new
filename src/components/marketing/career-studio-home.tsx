"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Compass,
  FileText,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import type { Locale } from "@/i18n-config";

type Tool = {
  title: string;
  body: string;
  cta: string;
  href: string;
  icon: typeof FileText;
  feature?: boolean;
};

const PRICE_FEATURES = {
  basic: ["Clean starter templates", "Basic ATS scan", "PDF export"],
  pro: ["Everything in Basic", "Role-targeted layouts", "Advanced section controls", "Unlimited ATS scans"],
  premium: ["Everything in Pro", "Executive templates", "Rich presentation options", "Priority support"],
};

export function CareerStudioHome({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const p = `/${locale}`;

  const tools: Tool[] = [
    { title: "ATS Checker", body: "Score your CV against any job description in seconds and see exactly what to fix.", cta: "Scan a CV", href: `${p}/ats`, icon: ShieldCheck, feature: true },
    { title: "Resume Builder", body: "Structured sections with role-aware writing prompts and live ATS feedback as you type.", cta: "Start building", href: `${p}/resumes`, icon: FileText, feature: true },
    { title: "Cover Letters", body: "Tailored to the role, on brand.", cta: "Write one", href: `${p}/cover-letter`, icon: Mail },
    { title: "LinkedIn Optimizer", body: "Audit and lift your profile.", cta: "Audit profile", href: `${p}/linkedin`, icon: BadgeCheck },
    { title: "Career GPS", body: "A step-by-step plan to your next role.", cta: "Get my plan", href: `${p}/career-gps`, icon: Compass },
    { title: "Talent Pool", body: "Build a recruiter-ready profile and get discovered by employers hiring across Sri Lanka and beyond.", cta: "Get discovered", href: `${p}/talent`, icon: Users, feature: true },
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealEls = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    const blobs = Array.from(root.querySelectorAll<HTMLElement>(".blob"));
    const statNums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    const prog = root.querySelector<SVGCircleElement>("#atsProg");
    const atsNum = root.querySelector<HTMLElement>("#atsNum");
    const ring = root.querySelector<HTMLElement>(".ats-ring");
    const statStrip = root.querySelector<HTMLElement>("#statStrip");

    if (reduce) {
      revealEls.forEach((el) => el.classList.add("in", "shown"));
    }

    let pending = reduce ? [] : revealEls.slice();
    const checkReveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const trigger = vh * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < trigger) {
          el.classList.add("in");
          window.setTimeout(() => el.classList.add("shown"), 950);
          return false;
        }
        return true;
      });
    };

    const parallax = () => {
      const y = window.scrollY;
      blobs.forEach((b) => {
        const s = parseFloat(b.dataset.speed || "0.05");
        b.style.transform = `translateY(${y * s}px)`;
      });
    };

    const countUp = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const dec = parseInt(el.dataset.dec || "0", 10);
      const suffix = el.dataset.suffix || "";
      const finalText = (dec ? target.toFixed(dec) : target) + suffix;
      if (reduce) {
        el.textContent = finalText;
        return;
      }
      const dur = 1500;
      const start = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const prog2 = Math.min((now - start) / dur, 1);
        el.textContent = (target * ease(prog2)).toFixed(dec) + suffix;
        if (prog2 < 1) requestAnimationFrame(tick);
        else el.textContent = finalText;
      };
      requestAnimationFrame(tick);
      window.setTimeout(() => (el.textContent = finalText), dur + 250);
    };

    const SCORE = 92;
    const CIRC = 311;
    let statsDone = false;
    let ringDone = false;
    const fillRing = () => {
      if (!prog || !atsNum) return;
      const finalOffset = String(CIRC - (CIRC * SCORE) / 100);
      prog.style.strokeDashoffset = finalOffset;
      if (reduce) {
        atsNum.textContent = String(SCORE);
        return;
      }
      const start = performance.now();
      const dur = 1500;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const pr = Math.min((now - start) / dur, 1);
        atsNum.textContent = String(Math.round(SCORE * ease(pr)));
        if (pr < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      window.setTimeout(() => {
        atsNum.textContent = String(SCORE);
      }, dur + 250);
    };

    const maybeMeters = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!statsDone && statStrip && statStrip.getBoundingClientRect().top < vh * 0.85) {
        statsDone = true;
        statNums.forEach(countUp);
      }
      if (!ringDone && ring && ring.getBoundingClientRect().top < vh * 0.9) {
        ringDone = true;
        fillRing();
      }
    };

    const onScroll = () => {
      checkReveal();
      maybeMeters();
      if (!reduce) requestAnimationFrame(parallax);
    };

    checkReveal();
    maybeMeters();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", checkReveal);
    const settle = window.setTimeout(() => {
      checkReveal();
      maybeMeters();
    }, 80);

    // cursor glow on tool cards
    const tiltCards = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
    const onTilt = (ev: PointerEvent) => {
      const card = ev.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((ev.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty("--my", `${((ev.clientY - r.top) / r.height) * 100}%`);
    };
    tiltCards.forEach((c) => c.addEventListener("pointermove", onTilt));

    // hero pointer-reactive stage
    const stage = root.querySelector<HTMLElement>("#floatStage");
    const heroVisual = stage?.closest<HTMLElement>(".hero-visual");
    const onHeroMove = (ev: PointerEvent) => {
      if (!stage || !heroVisual) return;
      const r = heroVisual.getBoundingClientRect();
      const dx = (ev.clientX - r.left) / r.width - 0.5;
      const dy = (ev.clientY - r.top) / r.height - 0.5;
      stage.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    };
    const onHeroLeave = () => {
      if (stage) stage.style.transform = "";
    };
    if (heroVisual && !reduce) {
      heroVisual.addEventListener("pointermove", onHeroMove);
      heroVisual.addEventListener("pointerleave", onHeroLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkReveal);
      window.clearTimeout(settle);
      tiltCards.forEach((c) => c.removeEventListener("pointermove", onTilt));
      if (heroVisual) {
        heroVisual.removeEventListener("pointermove", onHeroMove);
        heroVisual.removeEventListener("pointerleave", onHeroLeave);
      }
    };
  }, []);

  return (
    <div className="cs-home" ref={rootRef}>
      <div className="cs-bg-field" aria-hidden>
        <div className="blob b1" data-speed="0.06" />
        <div className="blob b2" data-speed="0.10" />
        <div className="blob b3" data-speed="0.04" />
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 className="reveal shown">
                Land your dream job with an <span className="gradient-text">ATS-proof</span> resume.
              </h1>
              <p className="lead reveal" data-d="2">
                Career Studio brings AI resume building, instant ATS checks, LKR salary context, and job-search
                workflows into one focused, beautifully simple platform.
              </p>
              <div className="hero-cta reveal" data-d="3">
                <Link href={`${p}/auth/sign-up`} className="btn btn-primary btn-lg">
                  Build my resume — free
                  <ArrowRight />
                </Link>
                <Link href={`${p}/ats`} className="btn btn-ghost btn-lg">
                  Check ATS score
                </Link>
              </div>
              <div className="hero-trust reveal" data-d="4">
                <span>
                  <Check /> No credit card required
                </span>
                <span>
                  <Check /> Free templates included
                </span>
              </div>
            </div>

            <div className="hero-visual reveal" data-d="2">
              <div className="float-stage" id="floatStage">
                <div className="ats-ring">
                  <svg viewBox="0 0 116 116">
                    <defs>
                      <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3b6bf2" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle className="track" cx="58" cy="58" r="49.5" />
                    <circle className="prog" id="atsProg" cx="58" cy="58" r="49.5" />
                  </svg>
                  <div className="num">
                    <b id="atsNum">0</b>
                    <span>ATS score</span>
                  </div>
                </div>

                <div className="resume-card">
                  <div className="rc-head">
                    <div className="rc-avatar" />
                    <div>
                      <div className="rc-name" />
                      <div className="rc-role" />
                    </div>
                  </div>
                  <div className="rc-line" />
                  <div className="rc-line" />
                  <div className="rc-line short" />
                  <div className="rc-section-label" />
                  <div className="rc-line" />
                  <div className="rc-line short" />
                  <div className="rc-chips">
                    <div className="rc-chip">
                      <i />
                    </div>
                    <div className="rc-chip">
                      <i />
                    </div>
                    <div className="rc-chip">
                      <i />
                    </div>
                  </div>
                </div>

                <div className="fchip score">
                  <span className="ic green">
                    <CheckCircle2 />
                  </span>
                  <div>
                    Recruiter-ready<small>Passes global ATS</small>
                  </div>
                </div>
                <div className="fchip keys">
                  <span className="ic blue">
                    <Search />
                  </span>
                  <div>
                    18 keywords<small>matched to role</small>
                  </div>
                </div>
                <div className="fchip skill">
                  <span className="ic cyan">
                    <Sparkles />
                  </span>
                  <div>
                    +12 skills<small>suggested by AI</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats reveal" data-d="3">
            <div className="stats-inner glass" id="statStrip">
              <div className="stat">
                <div className="num" data-count="137" data-suffix="+">137+</div>
                <div className="label">resumes started in the pilot</div>
              </div>
              <div className="stat">
                <div className="num" data-count="153" data-suffix="+">153+</div>
                <div className="label">applications tracked by early users</div>
              </div>
              <div className="stat">
                <div className="num" data-count="4.8" data-suffix="/5" data-dec="1">4.8/5</div>
                <div className="label">early satisfaction score</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TOOLS BENTO */}
      <section className="section-pad">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="section-title">Every tool your job hunt needs</h2>
            <p className="lead">
              From a first ATS scan to a recruiter-ready profile — all under one clean, consistent workspace.
            </p>
          </div>

          <div className="tools-grid">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className={`tool reveal${tool.feature ? " feature" : ""}`}
                  data-d={i % 3}
                  data-tilt
                >
                  <span className="ticon">
                    <Icon />
                  </span>
                  <h3>{tool.title}</h3>
                  <p>{tool.body}</p>
                  <span className="arrow">
                    {tool.cta} <ArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section-pad feature-band">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="section-title">Move from resume draft to confident application</h2>
            <p className="lead">
              Every step stays visible and connected — so polishing a CV flows straight into tracking jobs and planning
              your next move.
            </p>
          </div>

          <div className="features">
            <div className="feature reveal">
              <div className="num-badge">01</div>
              <h3>ATS-ready resume builder</h3>
              <p>
                Structured sections, role-aware writing prompts, and export flows designed for Sri Lankan recruiters and
                global ATS systems.
              </p>
            </div>
            <div className="feature reveal" data-d="1">
              <div className="num-badge">02</div>
              <h3>Sri Lanka salary context</h3>
              <p>
                LKR-first salary insights, city cost-of-living comparisons, and local course pathways that stay close to
                the market you actually face.
              </p>
            </div>
            <div className="feature reveal" data-d="2">
              <div className="num-badge">03</div>
              <h3>Career workflow hub</h3>
              <p>
                Move from CV polishing to job tracking, interview practice, LinkedIn rewrites, and Career GPS plans
                without stitching tools together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-pad">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="section-title">Basic, Pro &amp; Premium tiers</h2>
            <p className="lead">
              Sri Lanka-focused pricing and a tier structure ready for the full resume engine — start free, upgrade only
              when you need more.
            </p>
          </div>

          <div className="pricing">
            <div className="price-card reveal">
              <div className="tier">Basic</div>
              <div className="amount">
                <small>Rs.</small> 0
              </div>
              <div className="desc">Clean starter templates for first resumes and quick applications.</div>
              <ul className="feat-list">
                {PRICE_FEATURES.basic.map((f) => (
                  <li key={f}>
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <Link href={`${p}/auth/sign-up`} className="btn btn-ghost">
                Start free
              </Link>
            </div>

            <div className="price-card popular reveal" data-d="1">
              <span className="pop-badge">Most popular</span>
              <div className="tier">Pro</div>
              <div className="amount">
                <small>Rs.</small> 1,000
              </div>
              <div className="desc">Role-targeted layouts with stronger section controls.</div>
              <ul className="feat-list">
                {PRICE_FEATURES.pro.map((f) => (
                  <li key={f}>
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <Link href={`${p}/auth/sign-up`} className="btn btn-primary">
                Go Pro
              </Link>
            </div>

            <div className="price-card reveal" data-d="2">
              <div className="tier">Premium</div>
              <div className="amount">
                <small>Rs.</small> 1,500
              </div>
              <div className="desc">Executive-ready templates with richer presentation options.</div>
              <ul className="feat-list">
                {PRICE_FEATURES.premium.map((f) => (
                  <li key={f}>
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <Link href={`${p}/auth/sign-up`} className="btn btn-ghost">
                Go Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta-wrap">
        <div className="container">
          <div className="cta-card reveal">
            <div className="cta-glow g1" />
            <div className="cta-glow g2" />
            <h2 className="section-title" style={{ marginTop: 22 }}>
              Build the first version, then improve it with ATS feedback.
            </h2>
            <p>Start with the free public tools to learn the workflow, then sign in to unlock the full AI editor.</p>
            <Link href={`${p}/auth/sign-up`} className="btn btn-primary btn-lg">
              Build my resume — free
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
