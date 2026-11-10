# Ina SpaceWorks website (Next.js)

The production version of the approved website prototype, for the in-house developer. It uses:
- Next.js 15 (App Router) and TypeScript
- Poppins, self-hosted
- no CSS framework (one stylesheet, `app/globals.css`, holding the brand tokens)

## Run it

```bash
npm install
cp .env.example .env.local     # optional for local work
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

Needs Node 20 or newer. Deploys to any Node host:
- Vercel
- a VPS with `npm start` behind nginx
- Docker, using `node:20` and `npm run build`

**Hosting note:** the Careers form writes files, so on Vercel or another serverless host point `lib/ats/store.ts` at a database and S3-style storage. On a normal server it works out of the box.

## Pages

| Route | What it is |
|---|---|
| `/` | Intro: the Ina i flashes, travels and opens onto a 3D office walkthrough. Then the four services and the Ina TechFM band. |
| `/services` | design works, build works, manage works, care works. Each has its scope list and a photo placeholder. |
| `/process` | The measure line: six steps as tabs |
| `/work` | Selected work, credited to Jaisalil with previous organisations. These are placeholders until client approvals come in. |
| `/about` | The vertical, our people, who leads |
| `/careers` | Open roles plus the apply form with CV upload |
| `/contact` | Enquiry form and contact details |
| `/admin/careers` | Applications ranked by fit (password protected) |

The intro plays once per visit and can be replayed from the footer. Anyone with "reduce motion" switched on sees it settled.

## Forms and email

- **`/api/contact`** emails the enquiry to `MAIL_TO`, with reply-to set to the sender.
- **`/api/careers`** handles an application in four steps:
  1. Stores the CV privately in `DATA_DIR/cvs`.
  2. Reads it (PDF or .docx).
  3. Scores it against the role, using `lib/ats/rubrics.mjs`.
  4. Emails the applicant a receipt. A Shortlist score also alerts the team.
- **No automatic rejections.** The score only orders the list.
- **Without `SMTP_HOST`,** emails are printed to the server log instead of being sent.
- **Both forms carry a hidden honeypot field** to catch bots.

## Careers admin

- **Turning it on:** set `ADMIN_USER` and `ADMIN_PASS`. Then `/admin/careers` asks for that login and lists applications by score, with the matched skills, the missing must-haves, any flags, and a link to open each CV.
- **If those are empty,** the admin stays closed.
- **Retention:** applications older than 12 months are dropped automatically, as the form promises applicants.

## Tuning the CV screening

Edit `lib/ats/rubrics.mjs`. It holds:
- the skills for each role, with the patterns that count as evidence;
- the weights;
- the experience ranges. These are starting defaults to confirm, and they aren't shown on the site.

To test changes on real CVs:

```bash
npm run screen-cv -- interior-designer path/to/cvs/*.pdf
```

## Brand rules in the code

- **Logo and colours are locked.** The logo paths sit in `lib/brand.ts`; don't redraw or recolour them.
- **Poppins only,** everywhere, including canvas text.
- **Vastu rule:** no line, shape or element may overlap or cap the logo. The faint i on the menu, blue band and footer sits away from the logo on purpose.
- **Photo placeholders** (`.ph`) mark where real photos go. Swap each for `next/image` once photos and client approvals are in.
- **Write "Project Management Consultancy" in full.**

## Where things live

```
app/                 routes, layout, globals.css, fonts, API routes, sitemap, robots
components/          Chrome (bar + menu), Footer, Hero (intro), IThumb, Process, ContactForm, CareersForm, Brand
lib/content.ts       shared copy: navigation, contact details, process steps, open roles
lib/brand.ts         logo and i-mark geometry (generated from the locked logo files)
lib/canvas/          room.js (3D office walkthrough), office.js (small i windows)
lib/ats/             CV screening: screen.mjs, rubrics.mjs, store.ts, cli.mjs, samples/
lib/mail.ts          SMTP sending (nodemailer)
middleware.ts        basic auth for /admin and /api/admin
```

## Before launch

- [ ] Replace photo placeholders, and the Work captions in `[brackets]`, once approvals are in.
- [ ] Confirm the figures in the blue band on the home page (12 cities, 46+ locations).
- [ ] Set the SMTP details and the admin login in the host's environment.
- [ ] Point `inaspaceworks.com` at the host, and set `NEXT_PUBLIC_SITE_URL`.
- [ ] Host the email-signature logo at `/email/isw-email-logo.png`. Put it in `public/email/` and it will be served at that path.
