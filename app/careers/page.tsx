import type { Metadata } from "next";
import CareersForm from "@/components/CareersForm";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Ina SpaceWorks in Thane: interior designers, 3D artists, project coordinators, site supervisors and quantity surveyors.",
};

export default function Page() {
  return (
    <>
  <section className="pagehead">
    <div className="wrap">
      <div className="head"><p className="eyebrow">Careers</p><h1>Make spaces work, <b>with us.</b></h1><p className="lead">We're putting together the core team of Ina SpaceWorks in Thane: people who like a clear brief, a tidy site and a finished job. Design-led, quick on our feet, with an engineering family behind us.</p></div>
      <div className="roles">
        <div className="role" id="r-interior-designer"><div><h3>Interior Designer</h3><div className="meta"><span>Design</span><span>Thane</span><span>Full time</span></div></div><p>Space plans, concepts, finishes and working drawings for offices and commercial spaces.</p><a className="btn" href="#apply" data-role="interior-designer">Apply</a></div>
        <div className="role" id="r-3d-artist"><div><h3>3D Artist</h3><div className="meta"><span>Design</span><span>Thane</span><span>Full time</span></div></div><p>Photoreal views and walkthroughs that let clients see the space before it's built.</p><a className="btn" href="#apply" data-role="3d-artist">Apply</a></div>
        <div className="role" id="r-project-coordinator"><div><h3>Project Coordinator</h3><div className="meta"><span>Projects</span><span>Thane</span><span>Full time</span></div></div><p>The client's one point of contact, keeping drawings, vendors, site and schedule in step.</p><a className="btn" href="#apply" data-role="project-coordinator">Apply</a></div>
        <div className="role" id="r-site-supervisor"><div><h3>Site Supervisor</h3><div className="meta"><span>Projects</span><span>Thane</span><span>Full time</span></div></div><p>On site every day, running trades, quality and safety, and reporting progress.</p><a className="btn" href="#apply" data-role="site-supervisor">Apply</a></div>
        <div className="role" id="r-quantity-surveyor"><div><h3>Quantity Surveyor</h3><div className="meta"><span>Projects</span><span>Thane</span><span>Full time</span></div></div><p>Quantities, estimates, BOQs and bill certification, measured and honest.</p><a className="btn" href="#apply" data-role="quantity-surveyor">Apply</a></div>
      </div>
    </div>
  </section>
  <section className="paper" id="apply">
    <div className="wrap apply">
      <div>
        <p className="eyebrow">Apply</p>
        <h2 style={{marginTop: "20px"}}>Send us <b>your CV.</b></h2>
        <ol className="steps-mini"><li>Pick a role and attach your CV as a PDF or Word file.</li><li>Every CV is read against the role, and the closest matches reach our team first.</li><li>If it's a fit, we call you. Either way, you hear from us.</li></ol>
        <p style={{margin: "28px 0 0", fontSize: "14px", color: "var(--sub)"}}>Don't see your role? Choose “Other” and tell us what you'd bring.</p>
      </div>
      <CareersForm />
    </div>
  </section>
    </>
  );
}
