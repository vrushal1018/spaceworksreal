import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected interiors delivered by our lead, Jaisalil Shilewant, shown with each client's approval.",
};

export default function Page() {
  return (
    <>
  <section className="pagehead">
    <div className="wrap">
      <div className="head"><p className="eyebrow">Work</p><h1>Selected work <b>by our lead.</b></h1><p className="lead">Ina SpaceWorks is new; the experience behind it isn't. These projects were delivered by Jaisalil Shilewant with earlier organisations, shown with each client's approval. Our own work joins them as it's handed over.</p></div>
      <div className="grid-work">
        <figure className="g1"><div className="ph">Photo · JW Marriott Kolkata</div><figcaption><b>JW Marriott, Kolkata</b><span>[Scope] · [Year]</span></figcaption></figure>
        <figure className="g2"><div className="ph">Photo · [Project 2]</div><figcaption><b>[Project 2]</b><span>[City]</span></figcaption></figure>
        <figure className="g3"><div className="ph">Photo · [Project 3]</div><figcaption><b>[Project 3]</b><span>[City]</span></figcaption></figure>
        <figure className="g4"><div className="ph">Photo · [Project 4]</div><figcaption><b>[Project 4]</b><span>[City]</span></figcaption></figure>
      </div>
      <p className="credit">Delivered by Jaisalil Shilewant, Vice President, Design &amp; Projects, with [previous organisation].</p>
    </div>
  </section>
    </>
  );
}
