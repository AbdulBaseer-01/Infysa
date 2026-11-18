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

const principles = [
  {
    number: "01",
    title: "Strategic thinking",
    description:
      "We start with the business, the audience, and the opportunity—not a template.",
  },
  {
    number: "02",
    title: "Transparent communication",
    description:
      "Clear plans, honest feedback, and no disappearing acts from first call to final delivery.",
  },
  {
    number: "03",
    title: "Creative execution",
    description:
      "Ideas only matter when they become focused, useful experiences people can feel.",
  },
  {
    number: "04",
    title: "Measurable outcomes",
    description:
      "We connect the work to meaningful signals, learn from what happens, and keep improving.",
  },
];

export type WhyInfysaTestimonial = {
  quote: string;
  client: string;
  role?: string;
};

type WhyInfysaProps = {
  testimonials?: WhyInfysaTestimonial[];
};

export default function WhyInfysa({ testimonials = [] }: WhyInfysaProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-why-reveal]");

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
  }, [testimonials]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[#f2f1eb] px-6 py-24 text-[#171717] md:px-10 md:py-36`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-16 md:grid-cols-[1.15fr_0.85fr] md:gap-24">
          <div>
            <p
              data-why-reveal
              className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
            >
              Why Infysa
            </p>
            <h2
              data-why-reveal
              className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,7.5vw,8rem)] font-medium leading-[0.94] tracking-[-0.06em] opacity-0"
            >
              Not another agency. A growth partner.
            </h2>
          </div>

          <div className="flex items-end">
            <p
              data-why-reveal
              className="max-w-md font-[family-name:var(--font-body)] text-xl leading-[1.2] opacity-0 md:text-2xl"
            >
              We bring clear thinking and creative energy to the same table,
              then stay close enough to make the work count.
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-[#171717]/30">
          {principles.map((principle) => (
            <article
              key={principle.number}
              data-why-reveal
              className="group grid gap-6 border-b border-[#171717]/30 py-7 opacity-0 transition-colors hover:bg-[#171717] hover:text-white md:grid-cols-[7rem_1fr_0.8fr] md:items-center md:gap-10 md:px-6 md:py-9"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.06em] opacity-30 transition-opacity group-hover:opacity-100 md:text-5xl">
                {principle.number}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                {principle.title}
              </h3>
              <p className="max-w-md font-[family-name:var(--font-body)] text-base leading-[1.35] opacity-60 transition-opacity group-hover:opacity-75">
                {principle.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-[#171717]/30 pt-8 md:mt-36 md:grid md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p
            data-why-reveal
            className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
          >
            What our clients say
          </p>
          <div>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <figure
                  key={`${testimonial.client}-${testimonial.quote}`}
                  data-why-reveal
                  className="mb-12 max-w-3xl opacity-0 last:mb-0"
                >
                  <blockquote className="font-[family-name:var(--font-display)] text-2xl leading-[1.05] tracking-[-0.04em] md:text-4xl">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.14em] opacity-60">
                    {testimonial.client}
                    {testimonial.role ? ` — ${testimonial.role}` : ""}
                  </figcaption>
                </figure>
              ))
            ) : (
              <p
                data-why-reveal
                className="max-w-xl font-[family-name:var(--font-body)] text-base leading-[1.35] opacity-60"
              >
                Client testimonials will be added here as verified feedback
                becomes available.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
