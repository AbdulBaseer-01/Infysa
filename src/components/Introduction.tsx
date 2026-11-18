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

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-intro-reveal]");

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
      id="studio"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[#f2f1eb] px-6 py-24 text-[#171717] md:px-10 md:py-36`}
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[1.25fr_0.75fr] md:gap-20">
        <div>
          <p
            data-intro-reveal
            className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
          >
            Why Infysa
          </p>
          <h2
            data-intro-reveal
            className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,7.5vw,8rem)] font-medium leading-[0.94] tracking-[-0.06em] opacity-0"
          >
            Good businesses deserve better digital experiences.
          </h2>
        </div>

        <div className="flex flex-col justify-end md:pb-2">
          <p
            data-intro-reveal
            className="max-w-md font-[family-name:var(--font-body)] text-xl leading-[1.2] md:text-2xl"
          >
            Infysa exists for ambitious businesses that have outgrown
            forgettable websites and disconnected digital touchpoints.
          </p>
          <p
            data-intro-reveal
            className="mt-8 max-w-md font-[family-name:var(--font-body)] text-base leading-[1.35] opacity-70"
          >
            We find what makes a business matter, turn it into a clear
            experience, and build the digital system that helps it grow.
          </p>
          <div
            data-intro-reveal
            className="mt-12 flex items-center gap-4 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] opacity-0"
          >
            <span className="h-px w-12 bg-[#171717]" aria-hidden="true" />
            Strategy, identity, digital
          </div>
        </div>
      </div>
    </section>
  );
}
