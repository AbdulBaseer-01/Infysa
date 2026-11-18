import Link from "next/link";
import { Chakra_Petch, Unbounded } from "next/font/google";
import Footer from "@/components/Footer";
import Introduction from "@/components/Introduction";
import WhyInfysa from "@/components/WhyInfysa";
import Process from "@/components/Process";

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

export default function AboutPage() {
  return (
    <main className={`${display.variable} ${body.variable} bg-[#f2f1eb]`}>
      <header className="flex items-center justify-between px-6 py-8 md:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.06em]"
        >
          Infysa
        </Link>
        <Link
          href="/contact"
          className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em]"
        >
          Start a conversation ↗
        </Link>
      </header>
      <Introduction />
      <Process />
      <WhyInfysa />
      <Footer />
    </main>
  );
}
