import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your space. Call or WhatsApp +91 9156 802 555, or write to evolve@inaspaceworks.com.",
};

export default function Page() {
  return (
    <>
  <section className="pagehead">
    <div className="wrap contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 style={{marginTop: "20px"}}>Tell us about your space. <b>We'll make it work.</b></h1>
        <dl>
          <div><dt>Call or WhatsApp</dt><dd><a href="tel:+919156802555">+91 9156 802 555</a></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:evolve@inaspaceworks.com">evolve@inaspaceworks.com</a></dd></div>
          <div><dt>Studio</dt><dd>1st Floor, C-Wing, MBC Park, G.B. Road,<br />Kasarvadavli, Thane West 400 615</dd></div>
        </dl>
      </div>
      <ContactForm />
    </div>
  </section>
    </>
  );
}
