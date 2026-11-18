"use client";

import { useEffect, useRef } from "react";
import { Chakra_Petch, Unbounded } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const display = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const body = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const stages = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business.",
  },
  {
    number: "02",
    title: "Strategise",
    description: "Identify opportunities.",
  },
  {
    number: "03",
    title: "Create",
    description: "Design, develop and execute.",
  },
  {
    number: "04",
    title: "Optimise",
    description: "Measure, improve and scale.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-process-reveal]");

      if (reduce) {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        elements,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[#171717] px-6 py-24 text-white md:px-10 md:py-36`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-20 grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end md:gap-20">
          <div>
            <p
              data-process-reveal
              className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
            >
              Our process
            </p>
            <h2
              data-process-reveal
              className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,7.5vw,8rem)] font-medium leading-[0.94] tracking-[-0.06em] opacity-0"
            >
              From the first conversation to measurable growth.
            </h2>
          </div>
          <p
            data-process-reveal
            className="max-w-sm font-[family-name:var(--font-body)] text-xl leading-[1.2] opacity-0 md:text-2xl"
          >
            A clear, collaborative path from a good question to meaningful
            progress.
          </p>
        </div>

        <div className="grid border-t border-white/30 md:grid-cols-4">
          {stages.map((stage) => (
            <article
              key={stage.number}
              data-process-reveal
              className="border-b border-white/30 py-8 opacity-0 md:border-b-0 md:border-r md:px-8 md:py-10 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
            >
              <span className="font-[family-name:var(--font-body)] text-sm text-white/50">
                {stage.number}
              </span>
              <h3 className="mt-16 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.04em] md:mt-28 md:text-4xl">
                {stage.title}
              </h3>
              <p className="mt-5 max-w-xs font-[family-name:var(--font-body)] text-base leading-[1.35] text-white/65">
                {stage.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
