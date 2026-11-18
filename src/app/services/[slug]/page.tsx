import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chakra_Petch, Unbounded } from "next/font/google";
import { getService, services } from "@/data/services";

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

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  return {
    title: service ? `${service.title} | Infysa` : "Service | Infysa",
    description: service?.shortDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen bg-[#1c1be6] px-6 py-10 text-white md:px-10 md:py-14`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.06em]"
          >
            Infysa
          </Link>
          <Link
            href="/services"
            className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
          >
            All services
          </Link>
        </div>

        <header className="mt-28 max-w-6xl md:mt-40">
          <p className="mb-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-60">
            {service.number} / Service
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,9rem)] font-medium leading-[0.92] tracking-[-0.06em]">
            {service.title}
          </h1>
          <p className="mt-12 max-w-2xl font-[family-name:var(--font-body)] text-2xl leading-[1.15] md:text-4xl">
            {service.description}
          </p>
        </header>

        <div className="mt-24 grid border-t border-white/35 md:mt-36 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="py-8 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-60">
            What&apos;s included
          </p>
          <ul className="border-white/35 md:border-l md:pl-10">
            {service.deliverables.map((deliverable) => (
              <li
                key={deliverable}
                className="border-b border-white/35 py-7 font-[family-name:var(--font-display)] text-xl tracking-[-0.03em] md:text-3xl"
              >
                {deliverable}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 grid gap-8 border-t border-white/35 pt-8 md:mt-36 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-60">
            Is this for you?
          </p>
          <p className="max-w-2xl font-[family-name:var(--font-body)] text-xl leading-[1.2] md:text-3xl">
            {service.fit}
          </p>
        </div>

        <div className="mt-24 border-t border-white/35 pt-8 md:mt-36">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 border-b border-white pb-3 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
          >
            Start a conversation
            <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
