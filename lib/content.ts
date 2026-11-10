// Copy that more than one component uses. Page copy lives in each page file.
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "What we do", count: "04" },
  { href: "/process", label: "How we work", count: "06" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const CONTACT = {
  phone: "+91 9156 802 555", tel: "+919156802555", whatsapp: "https://wa.me/919156802555",
  email: "evolve@inaspaceworks.com",
  address: ["1st Floor, C-Wing, MBC Park, G.B. Road,", "Kasarvadavli, Thane West 400 615"],
};

export const STEPS = [
  { t: "Listen", h: "A site visit and a proper brief.", p: "Who uses the space, what isn't working, and what it has to cost. Nothing is drawn until we understand all three." },
  { t: "Plan", h: "A concept and an honest budget.", p: "A layout, a direction and a realistic cost, agreed before anything is built." },
  { t: "Design", h: "Drawings you can build from.", p: "Materials, finishes and details resolved on paper, so site work runs without guesswork." },
  { t: "Build", h: "Our supervisors, on site daily.", p: "Our project coordinator and supervisors run every trade on site, with MEPF installed by our own engineers. You get a progress report every week." },
  { t: "Hand over", h: "A space that's finished.", p: "A walkthrough, a closed snag list, and drawings of what was actually built." },
  { t: "Care", h: "We stay.", p: "Repairs, upkeep and changes as your team grows, from people already looking after your building." },
];

export const ROLES = [
  { id: "interior-designer", title: "Interior Designer", team: "Design", line: "Space plans, concepts, finishes and working drawings for offices and commercial spaces." },
  { id: "3d-artist", title: "3D Artist", team: "Design", line: "Photoreal views and walkthroughs that let clients see the space before it's built." },
  { id: "project-coordinator", title: "Project Coordinator", team: "Projects", line: "The client's one point of contact, keeping drawings, vendors, site and schedule in step." },
  { id: "site-supervisor", title: "Site Supervisor", team: "Projects", line: "On site every day, running trades, quality and safety, and reporting progress." },
  { id: "quantity-surveyor", title: "Quantity Surveyor", team: "Projects", line: "Quantities, estimates, BOQs and bill certification, measured and honest." },
];
