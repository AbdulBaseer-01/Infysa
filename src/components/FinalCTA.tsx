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

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-cta-reveal]");

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
      id="contact"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-white px-6 py-28 text-[#171717] md:px-10 md:py-48`}
    >
      <div className="mx-auto max-w-[1440px]">
        <p
          data-cta-reveal
          className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
        >
          Start a conversation
        </p>
        <h2
          data-cta-reveal
          className="max-w-6xl font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,10rem)] font-medium leading-[0.92] tracking-[-0.06em] opacity-0"
        >
          Your next stage of growth starts here.
        </h2>
        <div className="mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <p
            data-cta-reveal
            className="max-w-lg font-[family-name:var(--font-body)] text-xl leading-[1.2] opacity-0 md:text-2xl"
          >
            Tell us what you&apos;re building. Let&apos;s figure out how to take
            it further.
          </p>
          <a
            data-cta-reveal
            href="mailto:hello@infysa.com"
            className="group inline-flex w-fit items-center gap-4 border-b border-[#171717] pb-3 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] opacity-0 transition-opacity hover:opacity-60"
          >
            Let&apos;s build something
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
