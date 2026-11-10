import { SYMBOLS, LOGO_LINE_VB, LOGO_STACK_VB } from "@/lib/brand";

/** The logo and i-mark as SVG symbols, defined once per page. Logo geometry and colours are locked. */
export function BrandSymbols() {
  return <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true"><defs dangerouslySetInnerHTML={{ __html: SYMBOLS }} /></svg>;
}
export function LogoLine({ className = "logo" }: { className?: string }) {
  return <svg className={className} viewBox={LOGO_LINE_VB} role="img" aria-label="Ina SpaceWorks"><use href="#logo-line" /></svg>;
}
export function LogoStack({ className = "logo" }: { className?: string }) {
  return <svg className={className} viewBox={LOGO_STACK_VB} role="img" aria-label="Ina SpaceWorks"><use href="#logo-stack" /></svg>;
}
/** The faint i used on blue bands, the menu and the footer. Never placed over or touching the logo. */
export function IMark({ className = "mark" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 44.41 69.37" aria-hidden="true"><use href="#i-mark" /></svg>;
}
export function Works({ w, as: Tag = "span" }: { w: string; as?: "span" | "div" }) {
  return <Tag className="works"><span className="w">{w}</span><b>works</b></Tag>;
}
