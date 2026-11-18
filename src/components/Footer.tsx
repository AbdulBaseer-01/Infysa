"use client";

import { useEffect, useState } from "react";
import { Chakra_Petch, Unbounded } from "next/font/google";

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

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Digital marketing", href: "/services/digital-marketing" },
  { label: "Websites & landing pages", href: "/services/websites" },
  { label: "Creative & branding", href: "/services/creative-branding" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className={`${display.variable} ${body.variable} bg-[#171717] px-6 py-16 text-white md:px-10 md:py-20`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 border-b border-white/25 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <a
              href="#"
              className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.06em]"
            >
              Infysa
            </a>
            <p className="mt-6 max-w-xs font-[family-name:var(--font-body)] text-base leading-[1.35] text-white/60">
              Better digital experiences for businesses ready to move forward.
            </p>
          </div>

          <FooterLinks title="Navigation" links={navigation} />
          <FooterLinks title="Services" links={services} />

          <div>
            <p className="mb-5 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] text-white/50">
              Connect
            </p>
            <a
              href="mailto:hello@infysa.com"
              className="font-[family-name:var(--font-body)] text-base transition-opacity hover:opacity-60"
            >
              hello@infysa.com
            </a>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-[family-name:var(--font-body)] text-sm">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-opacity hover:opacity-60"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 font-[family-name:var(--font-body)] text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear ?? ""} Infysa. All rights reserved.</p>
          <p>Strategy, identity, digital.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-5 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] text-white/50">
        {title}
      </p>
      <nav className="flex flex-col items-start gap-3 font-[family-name:var(--font-body)] text-base">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
