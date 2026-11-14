import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What we do",
  description: "design works, build works, manage works and care works: interior design, Design & Build, Project Management Consultancy, and repair and maintenance.",
};

export default function Page() {
  return (
    <>
  <section className="pagehead" style={{paddingBottom: "40px"}}>
    <div className="wrap head" style={{marginBottom: "0"}}><p className="eyebrow">What we do</p><h1>Everything we do <b>ends in works.</b></h1><p className="lead">Four services under one roof. Bring us in for one, or hand us the whole job.</p></div>
  </section>
  <div className="wrap">
    <article className="chapter" id="s-design">
      <div className="stick"><div className="works"><span className="w">design</span><b>works</b></div><span className="full">Interior design and space planning</span><p className="lead">We start with how your people work, then shape the plan, the materials and the light around it.</p><p className="how">Done in-house by our interior designers and 3D artists, with quantities measured by our own surveyor.</p></div>
      <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
        <div className="chapter-media">
          <Image
            src="/email/01.Design%20work.png"
            alt="Design works · Interior design and space planning"
            width={1536}
            height={1024}
            sizes="(min-width: 860px) 50vw, 100vw"
            priority
            className="chapter-img"
          />
        </div>
        <ul><li><span><b>Space planning and test fits</b></span></li><li><span><b>Concept and 3D views</b> <em>· see it before it's built</em></span></li><li><span><b>Materials, finishes and lighting</b></span></li><li><span><b>Working drawings and details</b></span></li><li><span><b>Bill of quantities and estimates</b></span></li></ul>
      </div>
    </article>
    <article className="chapter" id="s-build">
      <div className="stick"><div className="works"><span className="w">build</span><b>works</b></div><span className="full">Design &amp; Build, end to end</span><p className="lead">We build what we design. One team takes the drawings to a finished, furnished space, ready on day one.</p><p className="how">Every site is run by our project coordinator and supervisors. Each trade is carried out by skilled workmen and specialist teams we build with every day, and MEPF is installed by our own engineers.</p></div>
      <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
        <div className="chapter-media">
          <Image
            src="/email/02.Build%20work.png"
            alt="Build works · Design & Build, end to end"
            width={1536}
            height={1024}
            sizes="(min-width: 860px) 50vw, 100vw"
            className="chapter-img"
          />
        </div>
        <ul><li><span><b>Modular furniture</b> <em>· customised, factory-finished and branded</em></span></li><li><span><b>Loose furniture</b> <em>· customised, or from our brand tie-ups</em></span></li><li><span><b>Carpentry and joinery</b></span></li><li><span><b>Gypsum and POP ceilings and partitions</b></span></li><li><span><b>Aluminium extrusions and glass works</b></span></li><li><span><b>Electrical and plumbing works</b></span></li><li><span><b>Soft furnishing and upholstery</b></span></li><li><span><b>MEPF and HVAC installation</b> <em>· by our in-house engineers</em></span></li></ul>
      </div>
    </article>
    <article className="chapter" id="s-manage">
      <div className="stick"><div className="works"><span className="w">manage</span><b>works</b></div><span className="full">Project Management Consultancy</span><p className="lead">We sit on your side of the table, keeping the brief, the budget and the timeline honest, whoever is building.</p><p className="how">A dedicated project coordinator, site supervisors and a quantity surveyor, reporting to you, not to the contractor.</p></div>
      <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
        <div className="chapter-media">
          <Image
            src="/email/03.Manage%20work.png"
            alt="Manage works · Project Management Consultancy"
            width={1536}
            height={1024}
            sizes="(min-width: 860px) 50vw, 100vw"
            className="chapter-img"
          />
        </div>
        <ul><li><span><b>Brief, feasibility and budget</b></span></li><li><span><b>Design review and value engineering</b></span></li><li><span><b>Tendering, vendor selection and contracts</b></span></li><li><span><b>Quantity surveying and bill certification</b></span></li><li><span><b>Schedules and weekly progress reports</b></span></li><li><span><b>Quality, safety and site supervision</b></span></li><li><span><b>Snags, handover and close-out</b></span></li></ul>
      </div>
    </article>
    <article className="chapter care" id="s-care">
      <div className="stick"><div className="works"><span className="w">care</span><b>works</b></div><span className="full">Repair, maintenance and retrofits</span><p className="lead">After handover we stay, with teams already looking after buildings like yours.</p><p className="how">MEPF maintenance by our in-house engineers; interior repairs and refits by the same team that built it.</p></div>
      <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
        <div className="chapter-media">
          <Image
            src="/email/04.Care%20work.png"
            alt="Care works · Repair, maintenance and retrofits"
            width={1536}
            height={1024}
            sizes="(min-width: 860px) 50vw, 100vw"
            className="chapter-img"
          />
        </div>
        <ul><li><span><b>MEPF and HVAC maintenance</b> <em>· by our in-house engineers</em></span></li><li><span><b>Interior repairs and touch-ups</b></span></li><li><span><b>Refurbishments and retrofits</b></span></li><li><span><b>Quick-response visits</b></span></li></ul>
      </div>
    </article>
  </div>
  <section><div className="wrap" style={{display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between"}}><h2 className="closer">Not sure which one you need? <b>Start with a call.</b></h2><Link className="btn primary" href="/contact">Tell us about your space</Link></div></section>
    </>
  );
}
