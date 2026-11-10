import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Ina SpaceWorks is the interiors vertical of Ina TechFM: designers, 3D artists, project coordinators, site supervisors and a quantity surveyor, with MEPF engineers in the family.",
};

export default function Page() {
  return (
    <>
  <section className="pagehead paper">
    <div className="wrap">
      <div className="head"><p className="eyebrow">About</p><h1>Interiors, with <b>engineers in the family.</b></h1>
      <p className="lead">Ina SpaceWorks is the interiors vertical of Ina TechFM. We design and build workplaces and commercial spaces, then look after them. Behind every design is our own engineering family, already running buildings across India, so MEPF, technical services and upkeep never leave the house.</p></div>
      <div className="three"><div><b>Design-led</b><span>Every space is drawn before it's built, led by 22+ years in interiors.</span></div><div><b>Engineered in-house</b><span>MEPF installation and maintenance by our own engineers.</span></div><div><b>Cared for, after</b><span>We don't leave at handover. Repairs and upkeep come from teams already on site.</span></div></div>
    </div>
  </section>
  <section>
    <div className="wrap">
      <div className="head"><p className="eyebrow">Our people</p><h2>The team that <b>draws it, runs it and checks it.</b></h2></div>
      <div className="people">
        <div><b>Interior designers</b><span>Plans, finishes and the details that make a space work.</span></div>
        <div><b>3D artists</b><span>You walk through the space before a wall goes up.</span></div>
        <div><b>Project coordinator</b><span>One point of contact, from brief to handover.</span></div>
        <div><b>Site supervisors</b><span>On site every day, holding quality and pace.</span></div>
        <div><b>Quantity surveyor</b><span>Measured quantities and honest bills.</span></div>
        <div className="itf"><b>MEPF engineers</b><span>Installation and upkeep, from the Ina TechFM family.</span></div>
      </div>
      <div className="around"><p>Around them, the factories, brands and skilled workmen we have built with for years.</p><Link className="btn" href="/careers">Join the team</Link></div>
    </div>
  </section>
  <section className="paper">
    <div className="wrap lead-person">
      <div className="ph">Photo · Jaisalil Shilewant</div>
      <div style={{display: "flex", flexDirection: "column", gap: "18px"}}><p className="eyebrow">Who leads</p><h3>Jaisalil Shilewant</h3><p style={{margin: "0", color: "var(--sub)"}}>Vice President, Design &amp; Projects</p><p className="lead">Two decades of designing and delivering interiors, from corporate offices to hospitality projects such as JW Marriott Kolkata, now starting fresh with an engineering family behind it.</p></div>
    </div>
  </section>
    </>
  );
}
