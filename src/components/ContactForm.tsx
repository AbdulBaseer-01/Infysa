"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          mobile: data.get("mobile"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send message.");

      form.reset();
      setState("success");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send message."
      );
      setState("error");
    }
  }

  return (
    <section className="bg-[#f2f1eb] px-6 py-24 text-[#171717] md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
        <div>
          <p className="font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] opacity-60">
            Tell us more
          </p>
          <h2 className="mt-8 max-w-md font-[family-name:var(--font-display)] text-4xl font-medium leading-[0.98] tracking-[-0.05em] md:text-6xl">
            Let&apos;s make your next move clear.
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-[#171717]/30">
          <label className="block border-b border-[#171717]/30 py-5">
            <span className="sr-only">Name</span>
            <input
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder="Name"
              autoComplete="name"
              className="w-full bg-transparent font-[family-name:var(--font-body)] text-xl outline-none placeholder:text-[#171717]/45 md:text-2xl"
            />
          </label>
          <label className="block border-b border-[#171717]/30 py-5">
            <span className="sr-only">Mobile</span>
            <input
              name="mobile"
              type="tel"
              required
              maxLength={30}
              placeholder="Mobile"
              autoComplete="tel"
              className="w-full bg-transparent font-[family-name:var(--font-body)] text-xl outline-none placeholder:text-[#171717]/45 md:text-2xl"
            />
          </label>
          <label className="block border-b border-[#171717]/30 py-5">
            <span className="sr-only">Email</span>
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              placeholder="Email"
              autoComplete="email"
              className="w-full bg-transparent font-[family-name:var(--font-body)] text-xl outline-none placeholder:text-[#171717]/45 md:text-2xl"
            />
          </label>
          <label className="block border-b border-[#171717]/30 py-5">
            <span className="sr-only">Message</span>
            <textarea
              name="message"
              required
              maxLength={3000}
              placeholder="Tell us what you’re building"
              rows={4}
              className="w-full resize-y bg-transparent font-[family-name:var(--font-body)] text-xl outline-none placeholder:text-[#171717]/45 md:text-2xl"
            />
          </label>

          <div className="flex flex-col items-start gap-5 pt-8">
            <button
              type="submit"
              disabled={state === "sending"}
              className="group inline-flex items-center gap-4 border-b border-[#171717] pb-3 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] transition-opacity hover:opacity-60 disabled:cursor-wait disabled:opacity-50"
            >
              {state === "sending" ? "Sending" : "Send message"}
              <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </button>
            {state === "success" && (
              <p role="status" className="font-[family-name:var(--font-body)] text-sm">
                Thanks — your message has been sent.
              </p>
            )}
            {state === "error" && (
              <p role="alert" className="font-[family-name:var(--font-body)] text-sm text-red-700">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
