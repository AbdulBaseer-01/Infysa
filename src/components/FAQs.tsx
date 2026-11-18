"use client";

import { useEffect, useRef, useState } from "react";
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

const faqs = [
  {
    question: "What services does Infysa offer?",
    answer:
      "Infysa helps businesses move forward through digital marketing, websites and landing pages, creative direction, and branding.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. The work is shaped around your stage, goals, and available resources, whether you are building the foundation or ready to grow.",
  },
  {
    question: "Can I hire you just for a website?",
    answer:
      "Yes. A website or landing page can be a focused engagement. We will first understand what it needs to achieve, then recommend the right scope.",
  },
  {
    question: "Do you manage advertising campaigns?",
    answer:
      "Yes, advertising can be part of a broader growth engagement. The channels, scope, and reporting approach are defined around your goals.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on the scope, complexity, and timeline. After an initial conversation, Infysa can recommend a clear scope and provide a tailored proposal.",
  },
  {
    question: "How do we get started?",
    answer:
      "Start with a conversation about your business, what is not working, and where you want to go. From there, we will identify the most useful next step.",
  },
];

export default function FAQs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-faq-reveal]");

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
          stagger: 0.1,
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
      id="faqs"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[#1c1be6] px-6 py-24 text-white md:px-10 md:py-36`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-20 grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end md:gap-20">
          <div>
            <p
              data-faq-reveal
              className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
            >
              FAQs
            </p>
            <h2
              data-faq-reveal
              className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,7.5vw,8rem)] font-medium leading-[0.94] tracking-[-0.06em] opacity-0"
            >
              Questions, answered.
            </h2>
          </div>
          <p
            data-faq-reveal
            className="max-w-sm font-[family-name:var(--font-body)] text-xl leading-[1.2] opacity-0 md:text-2xl"
          >
            A few useful things to know before we start.
          </p>
        </div>

        <div className="border-t border-white/35">
          {faqs.map((faq, index) => {
            const isOpen = openQuestion === index;

            return (
              <div
                key={faq.question}
                data-faq-reveal
                className="border-b border-white/35 opacity-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenQuestion(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-8 py-7 text-left font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.03em] md:py-9 md:text-3xl"
                >
                  <span>{faq.question}</span>
                  <span
                    className="shrink-0 font-[family-name:var(--font-body)] text-2xl font-normal transition-transform duration-300 group-hover:rotate-90"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  hidden={!isOpen}
                  className="max-w-2xl pb-8 pr-12 font-[family-name:var(--font-body)] text-base leading-[1.4] text-white/75 md:pb-10 md:text-lg"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
