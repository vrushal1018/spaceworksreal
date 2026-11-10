import Link from "next/link";
export default function NotFound() {
  return (
    <section className="pagehead"><div className="wrap head">
      <p className="eyebrow">404</p><h1>This space <b>isn&apos;t built yet.</b></h1>
      <p className="lead">The page you were looking for has moved or never existed.</p>
      <div><Link className="btn primary" href="/">Back to home</Link></div>
    </div></section>
  );
}
