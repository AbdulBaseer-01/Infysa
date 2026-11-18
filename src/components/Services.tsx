"use client";

import { useEffect, useRef } from "react";
import { Chakra_Petch, Unbounded } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

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

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-service-reveal]");

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
      id="services"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[#1c1be6] px-6 py-24 text-white md:px-10 md:py-36`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-20 grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end md:gap-20">
          <div>
            <p
              data-service-reveal
              className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
            >
              What we do
            </p>
            <h2
              data-service-reveal
              className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,7.5vw,8rem)] font-medium leading-[0.94] tracking-[-0.06em] opacity-0"
            >
              Everything your brand needs to move forward.
            </h2>
          </div>
          <p
            data-service-reveal
            className="max-w-sm font-[family-name:var(--font-body)] text-xl leading-[1.2] opacity-0 md:text-2xl"
          >
            Clear thinking, sharp creative, and digital work that makes
            progress visible.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.number}
              href={`/services/${service.slug}`}
              data-service-reveal
              className="group flex min-h-[360px] flex-col rounded-[2px] border border-white/30 bg-white/10 p-7 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:text-[#171717] md:p-9"
            >
              <span className="font-[family-name:var(--font-body)] text-sm opacity-60">
                {service.number}
              </span>
              <h3 className="mt-20 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-5 max-w-md font-[family-name:var(--font-body)] text-base leading-[1.35] text-white/75 transition-colors group-hover:text-[#171717]/70">
                {service.shortDescription}
              </p>
              <span
                className="mt-auto pt-10 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] transition-transform group-hover:translate-x-2"
                aria-hidden="true"
              >
                View <span className="ml-2">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
