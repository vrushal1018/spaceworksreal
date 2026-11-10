import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import IThumb from "@/components/IThumb";
import { IMark } from "@/components/Brand";

export const metadata: Metadata = {
  title: { absolute: "Ina SpaceWorks · Interiors for workplaces" },
  description: "Interior design, Design & Build, Project Management Consultancy and repair & maintenance for offices and commercial spaces. An interior vertical of Ina TechFM.",
};

export default function Page() {
  return (
    <>
  <Hero />

  <section className="paper">
    <div className="wrap">
      <div className="head"><p className="eyebrow">The whole life of a space</p><h2>One team, from the first sketch <b>to the years after.</b></h2></div>
      <div className="life">
        <Link href="/services#s-design"><div><span className="tag"><i>01</i>Interior design</span><div className="works"><span className="w">design</span><b>works</b></div></div><p>Space planning and design by our own designers and 3D artists, shaped around how your people work.</p><IThumb mode="design" offset={0} /></Link>
        <Link href="/services#s-build"><div><span className="tag"><i>02</i>Design &amp; Build</span><div className="works"><span className="w">build</span><b>works</b></div></div><p>We build what we design, from modular furniture to the last fitting, run by our own supervisors.</p><IThumb mode="build" offset={4000} /></Link>
        <Link href="/services#s-manage"><div><span className="tag"><i>03</i>Project Management Consultancy</span><div className="works"><span className="w">manage</span><b>works</b></div></div><p>On your side of the table: brief, budget, vendors, quality and timeline, kept honest.</p><IThumb mode="manage" offset={8000} /></Link>
        <Link href="/services#s-care"><div><span className="tag"><i>04</i>Repair &amp; maintenance</span><div className="works"><span className="w">care</span><b>works</b></div></div><p>Repairs, upkeep and retrofits by teams already on site.</p><IThumb mode="care" offset={12000} /></Link>
      </div>
    </div>
  </section>

  <section className="blue">
    <IMark />
    <div className="wrap">
      <div className="head"><p className="eyebrow">Already in your building</p><h2>Our engineers already keep it running. <b>Now we can make it better.</b></h2></div>
      <div className="nums">
        <div><b>12</b><span>cities</span></div>
        <div><b>46+</b><span>locations on site</span></div>
        <div><span>Design-led interiors, backed by the engineering family of Ina TechFM.</span></div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <p className="promise">We pick <b>up.</b><br />We show <b>up.</b><br /><span className="last">We finish <b>up.</b></span></p>
      <div style={{marginTop: "48px", display: "flex", flexWrap: "wrap", gap: "12px"}}><Link className="btn primary" href="/contact">Start a project</Link><Link className="btn" href="/process">See how we work</Link></div>
    </div>
  </section>
    </>
  );
}
