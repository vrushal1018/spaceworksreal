"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CONTACT } from "@/lib/content";
import { IMark, LogoStack } from "./Brand";

export default function Footer() {
  const path = usePathname(), router = useRouter();
  const replay = () => {
    window.scrollTo(0, 0);
    if (path === "/") window.dispatchEvent(new Event("isw:replay"));
    else { sessionStorage.removeItem("isw-intro-seen"); router.push("/"); }
  };
  return (
    <footer>
      <IMark />
      <div className="wrap">
        <div className="cols">
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}><LogoStack /><span>An interior vertical of Ina TechFM</span></div>
          <div className="works">{["design", "build", "manage", "care"].map(w => <Link key={w} href={`/services#s-${w}`}><span className="w">{w}</span><b>works</b></Link>)}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px" }}>
            <a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><span>{CONTACT.address.join(" ")}</span>
          </div>
        </div>
        <div className="end"><span>© {new Date().getFullYear()} Ina SpaceWorks · Design • Build • Evolve · <Link href="/careers">Careers</Link></span><button onClick={replay}>Replay the intro</button></div>
      </div>
    </footer>
  );
}
