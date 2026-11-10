"use client";
// Top bar and full-screen menu. The bar turns solid once the page scrolls.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, CONTACT } from "@/lib/content";
import { IMark, LogoLine, Works } from "./Brand";

export default function Chrome() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null), closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (open) closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); menuBtn.current?.focus(); } };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);

  return (
    <>
      <header className={"bar" + (solid ? " solid" : "")}>
        <div className="wrap">
          <Link href="/" aria-label="Ina SpaceWorks, home"><LogoLine /></Link>
          <button ref={menuBtn} className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>Menu <i aria-hidden="true"></i></button>
        </div>
      </header>
      <div className={"menu" + (open ? " open" : "")} id="menu" aria-hidden={!open} inert={!open}>
        <IMark />
        <div className="wrap top">
          <Link href="/" aria-label="Ina SpaceWorks, home" onClick={() => setOpen(false)}><LogoLine /></Link>
          <button ref={closeBtn} className="menu-btn" onClick={() => setOpen(false)}>Close</button>
        </div>
        <nav className="wrap" aria-label="Main">
          <ul>
            {NAV.map(n => (
              <li key={n.href}>
                <Link href={n.href} aria-current={path === n.href ? "page" : undefined} onClick={() => setOpen(false)}>
                  {n.label}{"count" in n && n.count ? <small>{n.count}</small> : null}
                </Link>
              </li>
            ))}
          </ul>
          <aside>
            <div className="works">{["design", "build", "manage", "care"].map(w => <div key={w}><span className="w">{w}</span><b>works</b></div>)}</div>
            <div>{CONTACT.phone}<br />{CONTACT.email}</div>
          </aside>
        </nav>
      </div>
    </>
  );
}
export { Works };
