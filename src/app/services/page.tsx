import Link from "next/link";
import { Chakra_Petch, Unbounded } from "next/font/google";
import { services } from "@/data/services";

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

export default function ServicesPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen bg-[#f2f1eb] px-6 py-10 text-[#171717] md:px-10 md:py-14`}
    >
      <div className="mx-auto max-w-[1440px]">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.06em]"
        >
          Infysa
        </Link>

        <header className="mt-28 max-w-5xl md:mt-40">
          <p className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-60">
            Services
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,9rem)] font-medium leading-[0.92] tracking-[-0.06em]">
            Everything your brand needs to move forward.
          </h1>
          <p className="mt-10 max-w-xl font-[family-name:var(--font-body)] text-xl leading-[1.2] md:text-2xl">
            Strategy, creative, and digital execution for businesses ready to
            make their next move count.
          </p>
        </header>

        <div className="mt-24 grid gap-5 md:grid-cols-3 md:mt-32">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex min-h-[390px] flex-col border border-[#171717]/30 p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-[#1c1be6] hover:text-white md:p-9"
            >
              <span className="font-[family-name:var(--font-body)] text-sm opacity-50">
                {service.number}
              </span>
              <h2 className="mt-20 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                {service.title}
              </h2>
              <p className="mt-5 font-[family-name:var(--font-body)] text-base leading-[1.35] opacity-70">
                {service.shortDescription}
              </p>
              <span className="mt-auto pt-10 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em]">
                Explore service <span className="ml-2">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
