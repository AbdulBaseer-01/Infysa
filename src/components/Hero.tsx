"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Unbounded, Chakra_Petch } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Fonts (Google Fonts via next/font, self-hosted at build time)       */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Config - swap these for your own content                            */
/* ------------------------------------------------------------------ */
type HeroProps = {
  /** Image URLs for the floating field. Fewer than `count` are reused. */
  images?: string[];
  /** How many floating cards to place. */
  count?: number;
  /** Manual image placement configuration, in appearance-space percentages. */
  placements?: HeroPlacement[];
  /** Headline, one entry per line. */
  lines?: string[];
  brand?: string;
  tagline?: string;
  links?: { label: string; href: string }[];
};

const DEFAULT_IMAGES = Array.from(
  { length: 20 },
  (_, i) => `https://picsum.photos/seed/hero-${i + 7}/600/800`
);

const PERSPECTIVE = 1000; // px, must match the `perspective` style below

export type HeroPlacement = {
  left: number;
  top: number;
  z: number;
  width: number;
  ratio: number;
  rotY: number;
  rotZ: number;
  driftX?: number;
  driftY?: number;
  driftRotation?: number;
  driftDuration?: number;
  driftDelay?: number;
};

type Card = {
  id: number;
  src: string;
  left: number; // % of container
  top: number; // % of container
  z: number; // px, negative = further away
  width: number; // vw
  ratio: number; // height / width
  rotY: number;
  rotZ: number;
  driftX: number;
  driftY: number;
  driftRotation: number;
  driftDuration: number;
  driftDelay: number;
  blur: number;
  opacity: number;
};

/*
 * Edit this array to control every image independently.
 * left/top are the card's visible position as a percentage of the hero.
 */
const DEFAULT_PLACEMENTS: HeroPlacement[] = [
  { left: 7, top: 10, z: -500, width: 11, ratio: 1.25, rotY: 8, rotZ: -4 },
  { left: 22, top: 8, z: -1100, width: 10, ratio: 0.9, rotY: 5, rotZ: 3 },
  { left: 39, top: 13, z: -750, width: 12, ratio: 1.35, rotY: 3, rotZ: -2 },
  { left: 62, top: 11, z: -1250, width: 10, ratio: 0.8, rotY: -4, rotZ: 4 },
  { left: 80, top: 9, z: -600, width: 12, ratio: 1.2, rotY: -8, rotZ: -3 },
  { left: 95, top: 18, z: -1000, width: 11, ratio: 1, rotY: -10, rotZ: 3 },
  { left: 5, top: 36, z: -1200, width: 10, ratio: 0.85, rotY: 10, rotZ: 4 },
  { left: 18, top: 29, z: -350, width: 13, ratio: 1.3, rotY: 7, rotZ: -3 },
  { left: 84, top: 31, z: -900, width: 13, ratio: 1.35, rotY: -8, rotZ: 2 },
  { left: 97, top: 43, z: -450, width: 10, ratio: 0.8, rotY: -11, rotZ: -4 },
  { left: 4, top: 65, z: -700, width: 12, ratio: 1.2, rotY: 11, rotZ: -2 },
  { left: 18, top: 76, z: -1300, width: 11, ratio: 0.9, rotY: 7, rotZ: 4 },
  { left: 84, top: 72, z: -400, width: 12, ratio: 1.3, rotY: -7, rotZ: -3 },
  { left: 97, top: 65, z: -1150, width: 10, ratio: 1, rotY: -11, rotZ: 3 },
  { left: 8, top: 91, z: -1000, width: 11, ratio: 1.35, rotY: 8, rotZ: -4 },
  { left: 24, top: 94, z: -550, width: 12, ratio: 0.8, rotY: 5, rotZ: 2 },
  { left: 42, top: 91, z: -1400, width: 10, ratio: 1.1, rotY: 2, rotZ: -3 },
  { left: 61, top: 94, z: -800, width: 12, ratio: 1.3, rotY: -3, rotZ: 4 },
  { left: 79, top: 91, z: -1050, width: 11, ratio: 0.85, rotY: -7, rotZ: -2 },
  { left: 94, top: 88, z: -650, width: 12, ratio: 1.2, rotY: -10, rotZ: 3 },
  { left: 10, top: 51, z: -1500, width: 9, ratio: 1, rotY: 9, rotZ: 2 },
  { left: 90, top: 54, z: -1350, width: 9, ratio: 1.25, rotY: -9, rotZ: -3 },
  { left: 31, top: 21, z: -1450, width: 9, ratio: 0.85, rotY: 4, rotZ: 3 },
  { left: 70, top: 79, z: -1500, width: 9, ratio: 1.15, rotY: -5, rotZ: -3 },
];

/* ------------------------------------------------------------------ */
/* Manual placement                                                   */
/* Positions are authored in appearance-space, then projected back    */
/* into the 3D scene so depth does not change their visible location.  */
/* ------------------------------------------------------------------ */
function buildCards(
  images: string[],
  placements: HeroPlacement[],
  count: number
): Card[] {
  return placements.slice(0, count).map((placement, id) => {
    const k = (PERSPECTIVE - placement.z) / PERSPECTIVE;
    const depth = gsap.utils.clamp(0, 1, (240 - placement.z) / 1740);

    return {
      id,
      src: images[id % images.length],
      left: 50 + (placement.left - 50) * k,
      top: 50 + (placement.top - 50) * k,
      z: placement.z,
      width: placement.width,
      ratio: placement.ratio,
      rotY: placement.rotY,
      rotZ: placement.rotZ,
      driftX: placement.driftX ?? 10,
      driftY: placement.driftY ?? 16,
      driftRotation: placement.driftRotation ?? 2,
      driftDuration: placement.driftDuration ?? 5,
      driftDelay: placement.driftDelay ?? 0,
      blur: depth > 0.7 ? (depth - 0.7) * 6 : 0,
      opacity: 1 - depth * 0.45,
    };
  });
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Hero({
  images = DEFAULT_IMAGES,
  count = 24,
  placements = DEFAULT_PLACEMENTS,
  lines = ["Build what", "comes next"],
  brand = "Orbit",
  tagline = "Brand & digital design studio",
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const mouseRigRef = useRef<HTMLDivElement>(null);
  const scrollRigRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const cards = useMemo(
    () => buildCards(images, placements, count),
    [images, placements, count]
  );

  const headline = useMemo(
    () =>
      lines.map((line) =>
        line.split(" ").map((word) => ({ word, chars: word.split("") }))
      ),
    [lines]
  );

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const panel = menuRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousRootOverflow = root.style.overflow;
    const previousRootTouchAction = root.style.touchAction;

    if (menuOpen) {
      root.style.overflow = "hidden";
      root.style.touchAction = "none";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    if (reduce) {
      gsap.set(panel, { autoAlpha: menuOpen ? 1 : 0, yPercent: 0 });
      return () => {
        root.style.overflow = previousRootOverflow;
        root.style.touchAction = previousRootTouchAction;
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.touchAction = previousBodyTouchAction;
        window.removeEventListener("keydown", onKeyDown);
      };
    }

    if (menuOpen) {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, yPercent: -100 },
        { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "power4.out" }
      );
    } else {
      gsap.to(panel, {
        autoAlpha: 0,
        yPercent: -100,
        duration: 0.65,
        ease: "power4.inOut",
      });
    }

    return () => {
      root.style.overflow = previousRootOverflow;
      root.style.touchAction = previousRootTouchAction;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  /* ---- Lenis smooth scroll, driven by the GSAP ticker ---- */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ---- Animations ---- */
  useEffect(() => {
    if (!cards.length || !rootRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-card]");
      const inners = gsap.utils.toArray<HTMLElement>("[data-card-inner]");
      const chars = gsap.utils.toArray<HTMLElement>("[data-char]");

      // static depth + tilt for every card
      items.forEach((el, i) => {
        const c = cards[i];
        gsap.set(el, { z: c.z, rotationY: c.rotY, rotationZ: c.rotZ });
      });

      if (reduce) {
        gsap.set(items, { autoAlpha: 1 });
        gsap.set(chars, { yPercent: 0, autoAlpha: 1 });
        gsap.set("[data-fade]", { autoAlpha: 1 });
        return;
      }

      /* One intro: the field flies in from deep space, headline rises. */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        items,
        { z: (i) => cards[i].z - 1800, autoAlpha: 0 },
        {
          z: (i) => cards[i].z,
          autoAlpha: (i) => cards[i].opacity,
          duration: 2.4,
          stagger: { each: 0.05, from: "start" },
        },
        0
      )
        .fromTo(
          chars,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.2, stagger: 0.035, ease: "expo.out" },
          0.5
        )
        .fromTo(
          "[data-fade]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 },
          1.1
        );

      /* Idle drift: each card bobs on its own clock */
      inners.forEach((el, i) => {
        gsap.to(el, {
          y: cards[i].driftY,
          x: cards[i].driftX,
          rotation: cards[i].driftRotation,
          duration: cards[i].driftDuration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: cards[i].driftDelay,
        });
      });

      /* Pointer parallax: the whole field tilts toward the cursor */
      const rotY = gsap.quickTo(mouseRigRef.current, "rotationY", { duration: 1.2, ease: "power3.out" });
      const rotX = gsap.quickTo(mouseRigRef.current, "rotationX", { duration: 1.2, ease: "power3.out" });
      const shiftX = gsap.quickTo(mouseRigRef.current, "x", { duration: 1.4, ease: "power3.out" });
      const shiftY = gsap.quickTo(mouseRigRef.current, "y", { duration: 1.4, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        rotY(nx * 10);
        rotX(-ny * 8);
        shiftX(-nx * 40);
        shiftY(-ny * 28);
      };
      window.addEventListener("pointermove", onMove);

      /* Scroll: camera pushes forward through the field */
      gsap.to(scrollRigRef.current, {
        z: 900,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to("[data-headline]", {
        yPercent: -25,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });

      return () => window.removeEventListener("pointermove", onMove);
    }, rootRef);

    return () => ctx.revert();
  }, [cards]);

  return (
    <section
      ref={rootRef}
      className={`${display.variable} ${body.variable} relative h-screen min-h-[640px] w-full overflow-hidden bg-[#1c1be6] text-white`}
    >
      {/* depth field */}
      <div
        className="absolute inset-0"
        style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: "50% 50%" }}
        aria-hidden="true"
      >
        <div
          ref={mouseRigRef}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={scrollRigRef}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cards.map((c) => (
              <div
                key={c.id}
                data-card
                className="absolute opacity-0 will-change-transform"
                style={{
                  left: `${c.left}%`,
                  top: `${c.top}%`,
                  width: `${c.width}vw`,
                  aspectRatio: `1 / ${c.ratio}`,
                  marginLeft: `-${c.width / 2}vw`,
                  transformStyle: "preserve-3d",
                  filter: c.blur ? `blur(${c.blur}px)` : undefined,
                }}
              >
                <div data-card-inner className="h-full w-full overflow-hidden rounded-[3px] shadow-[0_20px_60px_-20px_rgba(0,0,40,0.7)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.src}
                    alt=""
                    loading="eager"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* edge shading keeps the centre readable */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,27,230,0.55)_0%,rgba(28,27,230,0)_55%)]" />

      {/* top bar */}
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 font-[family-name:var(--font-body)] text-sm md:px-10">
        <a
          href="#"
          data-fade
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight opacity-0"
        >
          {brand}
        </a>
        <button
          type="button"
          data-fade
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="group flex items-center gap-3 opacity-0 cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="relative flex h-4 w-6 flex-col justify-between py-[1px]" aria-hidden="true">
            <span className="h-px w-full bg-current transition-transform duration-300 group-aria-expanded:translate-y-[6px] group-aria-expanded:rotate-45" />
            <span className="h-px w-full bg-current transition-transform duration-300 group-aria-expanded:-translate-y-[6px] group-aria-expanded:-rotate-45" />
          </span>
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        aria-hidden={!menuOpen}
        className={`${menuOpen ? "pointer-events-auto" : "pointer-events-none"} fixed inset-0 z-30 h-[100dvh] overscroll-contain overflow-y-auto md:overflow-y-hidden bg-[#1c1be6] px-6 py-24 text-white opacity-0 md:px-10 md:py-28`}
      >
        <div className="mx-auto flex min-h-full max-w-[1440px] flex-col justify-center gap-10 md:grid md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-24">
          <nav aria-label="Main navigation">
            <p className="mb-4 font-[family-name:var(--font-body)] text-sm uppercase  tracking-[0.18em] text-white/60 md:mb-6">
              Explore
            </p>
            <div className="flex flex-col items-start">
              {[
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Process", href: "/about#process" },
                { label: "FAQs", href: "/contact#faqs" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,5.2vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.06em] transition-opacity hover:opacity-60"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="md:pt-8">
            <p className="mb-5 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] text-white/60">
              Sub services
            </p>
            <nav aria-label="Service navigation" className="flex flex-col items-start gap-5">
              {services.map((service) => (
                <a
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-[family-name:var(--font-body)] text-xl transition-opacity hover:opacity-60 md:text-2xl"
                >
                  {service.title}
                  <span className="ml-3 text-sm">↗</span>
                </a>
              ))}
            </nav>
            <p className="mt-8 max-w-xs font-[family-name:var(--font-body)] text-base leading-[1.35] text-white/60 md:mt-12">
              Strategy, identity, and digital experiences for businesses ready
              to move forward.
            </p>
          </div>
        </div>
      </div>

      {/* headline */}
      <div
        data-headline
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
      >
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              {line.map((w, wi) => (
                <span key={wi} className="inline-block whitespace-pre">
                  {w.chars.map((ch, ci) => (
                    <span
                      key={ci}
                      data-char
                      className="inline-block opacity-0 will-change-transform"
                    >
                      {ch}
                    </span>
                  ))}
                  {wi < line.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      {/* bottom bar */}
      <footer className="absolute inset-x-0 bottom-0 z-20 flex items-center text-center justify-between px-6 py-5 font-[family-name:var(--font-body)] text-sm md:px-10">
        <p data-fade className="opacity-0">
          {tagline}
        </p>
        <p data-fade className="hidden opacity-0 sm:block">
          {cards.length} selected works
        </p>
        {/* <p data-fade className="opacity-0">
          &copy; {currentYear ?? ""}
        </p> */}
      </footer>
    </section>
  );
}