"use client";

import { useEffect, useRef } from "react";
import { Chakra_Petch, Unbounded } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SelectedWorkProject = {
  client: string;
  industry: string;
  services: string[];
  previewUrl: string;
  href: string;
  result?: string;
};

type SelectedWorkProps = {
  projects?: SelectedWorkProject[];
};

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

const DEMO_PROJECTS: SelectedWorkProject[] = [
  {
    client: "Horse Riding",
    industry: "Equestrian",
    services: ["Website", "Digital experience"],
    previewUrl: "https://hyd-horse-riding.vercel.app/",
    href: "https://hyd-horse-riding.vercel.app/",
  },
  {
    client: "Moskin",
    industry: "Brand experience",
    services: ["Website", "Creative direction"],
    previewUrl: "https://moskin-alpha.vercel.app/",
    href: "https://moskin-alpha.vercel.app/",
  },
];

export default function SelectedWork({
  projects = DEMO_PROJECTS,
}: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-work-reveal]");

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
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[#f2f1eb] px-6 py-24 text-[#171717] md:px-10 md:py-36`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-20 grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end md:gap-20">
          <div>
            <p
              data-work-reveal
              className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-0"
            >
              Selected work
            </p>
            <h2
              data-work-reveal
              className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,7.5vw,8rem)] font-medium leading-[0.94] tracking-[-0.06em] opacity-0"
            >
              Ideas turned into impact.
            </h2>
          </div>
          <p
            data-work-reveal
            className="max-w-sm font-[family-name:var(--font-body)] text-xl leading-[1.2] opacity-0 md:text-2xl"
          >
            A selection of digital experiences, campaigns, and identities
            built to move businesses forward.
          </p>
          <p
            data-work-reveal
            className="mt-5 max-w-sm font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.14em] opacity-50"
          >
            Live project previews — click a project to visit the website.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-12 md:grid-cols-2">
            {projects.map((project) => {
              const content = (
                <>
                  <div className="aspect-[4/3] overflow-hidden bg-black/10">
                    <iframe
                      src={project.previewUrl}
                      title={`${project.client} website preview`}
                      loading="lazy"
                      className="pointer-events-none h-full w-full border-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-6 border-t border-[#171717]/30 pt-5">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                          {project.client}
                        </h3>
                        <p className="mt-2 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.14em] opacity-60">
                          {project.industry}
                        </p>
                      </div>
                      {project.href && (
                        <span className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em]">
                          View <span className="ml-2">↗</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-5 font-[family-name:var(--font-body)] text-base opacity-70">
                      {project.services.join(" / ")}
                    </p>
                    {project.result && (
                      <p className="mt-3 font-[family-name:var(--font-body)] text-base">
                        {project.result}
                      </p>
                    )}
                  </div>
                </>
              );

              return project.href ? (
                <a
                  key={project.client}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  data-work-reveal
                  className="group opacity-0"
                >
                  {content}
                </a>
              ) : (
                <article
                  key={project.client}
                  data-work-reveal
                  className="group opacity-0"
                >
                  {content}
                </article>
              );
            })}
          </div>
        ) : (
          <div
            data-work-reveal
            className="border-y border-[#171717]/30 py-12 opacity-0 md:py-16"
          >
            <p className="max-w-xl font-[family-name:var(--font-display)] text-2xl leading-[1.05] tracking-[-0.04em] md:text-4xl">
              New work is taking shape.
            </p>
            <p className="mt-5 max-w-md font-[family-name:var(--font-body)] text-base leading-[1.35] opacity-70">
              Verified projects, previews, and outcomes will appear here as
              they are ready to share.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
