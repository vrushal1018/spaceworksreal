import type { Metadata } from "next";
import Link from "next/link";
import Process from "@/components/Process";

export const metadata: Metadata = {
  title: "How we work",
  description: "Listen, plan, design, build, hand over and care: six measured steps from brief to a finished space.",
};

export default function Page() {
  return (
    <>
  <section className="ink pagehead">
    <div className="wrap">
      <div className="head"><p className="eyebrow">How we work</p><h1>Measured at every step. <b>Finished at the last.</b></h1></div>
      <Process />
    </div>
  </section>
  <section><div className="wrap" style={{display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between"}}><h2 className="closer">Step one is a conversation. <b>Book a site visit.</b></h2><Link className="btn primary" href="/contact">Tell us about your space</Link></div></section>
    </>
  );
}
