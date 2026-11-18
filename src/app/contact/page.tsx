import Link from "next/link";
import { Chakra_Petch, Unbounded } from "next/font/google";
import FAQs from "@/components/FAQs";
// import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

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

export default function ContactPage() {
  return (
    <main className={`${display.variable} ${body.variable} bg-white`}>
      <header className="flex items-center justify-between bg-white px-6 py-8 text-[#171717] md:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.06em]"
        >
          Infysa
        </Link>
        <Link
          href="/services"
          className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em]"
        >
          Explore services ↗
        </Link>
      </header>
      {/* <FinalCTA /> */}
      <ContactForm />
      <FAQs />
      <Footer />
    </main>
  );
}
