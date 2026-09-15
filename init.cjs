const fs = require('fs');
const path = require('path');

const files = {
  'src/styles.css': `@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
  --font-serif: "Bitter", Georgia, serif;
  --font-sans: "Inter Tight", system-ui, sans-serif;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);
}

:root {
  --radius: 0.75rem;
  --background: oklch(0.99 0.005 120);
  --foreground: oklch(0.22 0.03 160);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.22 0.03 160);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.22 0.03 160);
  --primary: oklch(0.33 0.07 168);
  --primary-foreground: oklch(0.98 0.01 150);
  --secondary: oklch(0.95 0.02 150);
  --secondary-foreground: oklch(0.28 0.05 165);
  --muted: oklch(0.96 0.01 150);
  --muted-foreground: oklch(0.5 0.02 165);
  --accent: oklch(0.79 0.14 82);
  --accent-foreground: oklch(0.28 0.06 80);
  --destructive: oklch(0.55 0.2 27);
  --destructive-foreground: oklch(0.98 0.01 150);
  --border: oklch(0.9 0.015 155);
  --input: oklch(0.9 0.015 155);
  --ring: oklch(0.33 0.07 168);
}

.dark {
  --background: oklch(0.18 0.02 165);
  --foreground: oklch(0.96 0.01 150);
  --card: oklch(0.23 0.03 165);
  --card-foreground: oklch(0.96 0.01 150);
  --popover: oklch(0.23 0.03 165);
  --popover-foreground: oklch(0.96 0.01 150);
  --primary: oklch(0.28 0.06 168);
  --primary-foreground: oklch(0.97 0.01 150);
  --secondary: oklch(0.26 0.03 165);
  --secondary-foreground: oklch(0.96 0.01 150);
  --muted: oklch(0.26 0.03 165);
  --muted-foreground: oklch(0.72 0.02 160);
  --accent: oklch(0.79 0.14 82);
  --accent-foreground: oklch(0.24 0.05 80);
  --destructive: oklch(0.65 0.19 25);
  --destructive-foreground: oklch(0.98 0.01 150);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.6 0.05 165);
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
  }

  h1,
  h2,
  h3 {
    font-family: var(--font-serif);
  }

  html {
    scroll-behavior: smooth;
  }
}
`,
  'src/components/Header.jsx': `import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { nav, college } from "../data/site";

function NavLink({ item, onNavigate }) {
  const cls =
    "rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground";
  if (item.href) {
    return (
      <a className={cls} href={item.href} target="_blank" rel="noreferrer">
        {item.label}
      </a>
    );
  }
  return (
    <Link className={cls} to={item.to} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-secondary text-secondary-foreground md:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <a className="hover:underline" href={college.phoneHref}>
              ☎ {college.phone}
            </a>
            <a className="hover:underline" href={\`mailto:\${college.email}\`}>
              ✉ {college.email}
            </a>
          </div>
          <p className="truncate">Government of Jharkhand · NMC recognised</p>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground">
              PJ
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-base font-semibold sm:text-lg">
                Phulo Jhano Medical College
              </span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-primary-foreground/70">
                &amp; Hospital, Dumka
              </span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-auto rounded-md border border-primary-foreground/30 px-3 py-2 text-sm lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <NavLink item={item} />
                {item.children ? (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 rounded-lg border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="block rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>

        {open ? (
          <nav className="border-t border-primary-foreground/15 px-4 pb-4 lg:hidden">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-primary-foreground/10 py-1">
                <NavLink item={item} onNavigate={() => setOpen(false)} />
                {item.children ? (
                  <div className="ml-4 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-1.5 text-sm text-primary-foreground/70"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        ) : null}
      </div>

      <div className="bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-1.5 text-xs font-medium">
          <p className="truncate">Notice: {college.noticeTicker}</p>
        </div>
      </div>
    </header>
  );
}`,
  'src/components/Footer.jsx': `import { Link } from "@tanstack/react-router";
import { college } from "../data/site";

const quickLinks = [
  { label: "About the College", to: "/about" },
  { label: "Administration", to: "/administration" },
  { label: "Teaching Staff", to: "/faculty" },
  { label: "Academics", to: "/academics" },
];

const serviceLinks = [
  { label: "Student Lists", to: "/students" },
  { label: "Recruitment", to: "/recruitment" },
  { label: "Tenders", to: "/tender" },
  { label: "Stipends", to: "/stipends" },
  { label: "Photo Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-serif text-lg font-semibold">{college.name}</h2>
          <p className="mt-3 text-sm text-primary-foreground/70">
            A Government of Jharkhand medical college and teaching hospital serving
            the Santhal Pargana region with undergraduate medical education and
            tertiary healthcare.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
            Information
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {serviceLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
            Reach Us
          </h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-primary-foreground/75">
            <p>{college.address}</p>
            <p>
              <a className="hover:text-primary-foreground" href={college.phoneHref}>
                {college.phone}
              </a>
            </p>
            <p className="break-words">
              <a
                className="hover:text-primary-foreground"
                href={\`mailto:\${college.email}\`}
              >
                {college.email}
              </a>
            </p>
            <p>{college.officeHours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} {college.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}`,
  'src/components/PageHeader.jsx': `export default function PageHeader({ title, subtitle, eyebrow }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-14">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}`,
  'src/components/DocList.jsx': `export default function DocList({ items }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
          >
            <span className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm">
                📄
              </span>
              <span className="text-sm font-medium text-card-foreground">
                {item.title}
              </span>
            </span>
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-accent-foreground/80 group-hover:text-foreground">
              Download
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}`,
  'src/data/site.js': `export const college = {
  name: "Phulo Jhano Medical College & Hospital, Dumka",
  shortName: "PJMCH Dumka",
  phone: "06434 295024",
  phoneHref: "tel:06434295024",
  email: "principal.medicalcollege.dumka@gmail.com",
  address: "Phulo Jhano Medical College, Dumka, Jharkhand – 814101",
  registrationOffice:
    "Phulo Jhano Medical College, Dumka, Jharkhand – 822101",
  officeHours: "Monday – Saturday, 9:00 AM – 5:00 PM",
  noticeTicker: "Welcome to Phulo Jhano Medical College & Hospital, Dumka.",
};

export const nav = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "About Dumka Medical", to: "/about" },
      { label: "Affiliation", to: "/about#affiliation" },
      { label: "Dean & Principal", to: "/administration#principal" },
      { label: "Superintendent", to: "/administration#superintendent" },
    ],
  },
  {
    label: "Academic",
    to: "/academics",
    children: [
      { label: "Academic Calendar", to: "/academics#calendar" },
      { label: "Syllabus", to: "/academics#syllabus" },
    ],
  },
  {
    label: "Staff Section",
    to: "/faculty",
    children: [
      { label: "Teaching Staff", to: "/faculty" },
      { label: "Non-Teaching Staff", to: "/faculty#non-teaching" },
    ],
  },
  {
    label: "Students",
    to: "/students",
    children: [
      { label: "Student List", to: "/students" },
      { label: "Syllabus", to: "/academics#syllabus" },
      { label: "Result", to: "/students#result" },
      { label: "Hostel Facility", to: "/students#hostel" },
      { label: "Canteen", to: "/students#canteen" },
    ],
  },
  {
    label: "Notices",
    to: "/recruitment",
    children: [
      { label: "Recruitment", to: "/recruitment" },
      { label: "Tender", to: "/tender" },
    ],
  },
  {
    label: "Gallery",
    to: "/gallery",
    children: [
      { label: "Photo Gallery", to: "/gallery" },
      { label: "Video Gallery", to: "/gallery#video" },
    ],
  },
  {
    label: "Biometric",
    href: "https://dumcdd.nmcindia.ac.in/",
  },
  { label: "Stipends", to: "/stipends" },
  { label: "Contact Us", to: "/contact" },
];

export const heroSlides = [
  "https://dumkamedicalcollege.org/wp-content/uploads/2026/08/IMG_3621.JPG.jpeg",
  "https://dumkamedicalcollege.org/wp-content/uploads/2026/07/DJI_0963.JPG-e1785498394599.jpeg",
  "https://dumkamedicalcollege.org/wp-content/uploads/2026/08/IMG_3611.JPG.jpeg",
  "https://dumkamedicalcollege.org/wp-content/uploads/2026/08/IMG_3584.JPG.jpeg",
  "https://dumkamedicalcollege.org/wp-content/uploads/2026/08/IMG_3586-1.JPG.jpeg",
];

const base = "https://dumkamedicalcollege.org";

export const msrDisclosures = [
  {
    id: 1,
    detail:
      "Details of Dean/Principal including name, qualification, contact and e-mail",
    link: "/administration#principal",
  },
  {
    id: 2,
    detail:
      "Details of Superintendent including name, qualification, contact and e-mail",
    link: "/administration#superintendent",
  },
  { id: 3, detail: "Details of Teaching Staff", link: "/faculty" },
  {
    id: 4,
    detail: "Details of sanctioned intake capacity of various UG and PG courses",
    link: "/academics",
  },
  { id: 5, detail: "List of students admitted currently", link: "/students" },
  { id: 6, detail: "Research publications in last one year", link: "/academics" },
  { id: 7, detail: "Details of CME / Conferences", link: "/academics" },
  {
    id: 8,
    detail: "Awards / Achievements by Students & Faculty",
    link: "/academics",
  },
  {
    id: 9,
    detail: "Details of Affiliating University and its VC and Registrar",
    link: "/about#affiliation",
  },
  {
    id: 10,
    detail: "Results of all examinations of last one year",
    link: "/students#result",
  },
  { id: 11, detail: "Status of recognition of all courses", link: "/about#affiliation" },
  { id: 12, detail: "Details of clinical materials in hospital", link: "/about" },
];

export const leadership = [
  {
    id: "principal",
    name: "Dr. Gajendra Kumar Singh",
    role: "Dean & Principal",
    org: "Phulo Jhano Medical College, Dumka",
    address: "Dumka Medical College, Dumka, PIN – 814110, Jharkhand",
    email: "principal.medicalcollege.dumka@gmail.com",
    photo: base + "/wp-content/uploads/2026/03/IMG-20260316-WA0008.jpg",
  },
  {
    id: "superintendent",
    name: "Dr. Ruben Hembrom",
    role: "Superintendent",
    org: "Phulo Jhano Medical College, Dumka",
    address: "Dumka Medical College, Dumka, Jharkhand",
    email: "superintendentdmch@gmail.com",
    photo: base + "/wp-content/uploads/2026/03/SUP_160326.jpeg",
  },
];

export const facultyPdf =
  base + "/wp-content/uploads/2026/03/PJMCH-Faculty-for-Wbsite.pdf";

export const faculty = [
  ["Dr. Gajendra Kumar Singh", "Principal & Professor", "Pharmacology"],
  ["Dr. Anukaran Purty", "Superintendent", "Medicine"],
  ["Dr. Savita Sukla Das", "Professor", "Obs & Gynae"],
  ["Dr. Sairavi Kiran B", "Professor", "Biochemistry"],
  ["Dr. Suchandra Benarjee", "Professor", "Physiology"],
  ["Dr. Anand Choudhary", "Professor", "Dental"],
  ["Dr. Vijay Tara", "Associate Professor", "Pathology"],
  ["Dr. Ruben Hembrom", "Associate Professor", "Surgery"],
  ["Dr. Bipad Bhanjan Mahto", "Associate Professor", "Eye"],
  ["Dr. Alok Kumar", "Associate Professor", "ENT"],
  ["Dr. Subir Kumar", "Associate Professor", "Pharmacology"],
  ["Dr. Vijay Kumar", "Associate Professor", "P.S.M"],
  ["Dr. Rajesh R", "Associate Professor", "Anatomy"],
  ["Dr. Uddipan Kumar", "Associate Professor", "Dental"],
  ["Dr. Pinky Kumari", "Associate Professor", "Microbiology"],
  ["Dr. Nand Kishor Karmali", "Assistant Professor", "Anatomy"],
  ["Dr. Vikas Oraon", "Assistant Professor", "Microbiology"],
  ["Dr. Goutam Kumar", "Assistant Professor", "FMT"],
  ["Dr. Mrinal Ranjan Srivastava", "Assistant Professor", "PSM"],
  ["Dr. Sunil Kumar", "Assistant Professor", "Surgery"],
  ["Dr. Mitali Prasar", "Assistant Professor", "Obs & Gynae"],
  ["Dr. Sarani Sagen Dahanga", "Assistant Professor", "Obs & Gynae"],
  ["Dr. Ruchi Mitra", "Assistant Professor", "Dental"],
  ["Dr. Avijeet Prasad", "Assistant Professor", "Ortho"],
  ["Dr. Jayant Chakrawarty", "Assistant Professor", "ENT"],
  ["Dr. Abhishek Kumar", "Assistant Professor", "Surgery"],
  ["Dr. Keshav Krishan", "Tutor", "Anatomy"],
  ["Dr. Chandrabhushan", "Tutor", "Pathology"],
  ["Dr. Anand Kumar", "Tutor", "FMT"],
  ["Dr. Saiyad Ijaz Hashami", "Tutor", "PSM"],
  ["Dr. Ruth K Tara", "Senior Resident", "Medicine"],
  ["Dr. Mukul Pritam", "Senior Resident", "Medicine"],
  ["Dr. Ankit Kr Bhalotiya", "Senior Resident", "Ortho"],
  ["Dr. Rukshana Yasmin", "Senior Resident", "Obs & Gynae"],
  ["Dr. Ankit Singh", "Senior Resident", "Obs & Gynae"],
  ["Dr. Md Nayeem Uddin", "Senior Resident", "ENT"],
  ["Dr. Muneer TK", "Senior Resident", "Pediatrics"],
  ["Dr. Shamma Ahmad", "Senior Resident", "Pediatrics"],
  ["Dr. Mrinal Singh", "Senior Resident", "Eye"],
  ["Dr. Aravind Kr", "Senior Resident", "Surgery"],
  ["Dr. Kamlesh Kumar", "Senior Resident", "Surgery"],
  ["Dr. Arunmozhi S", "Senior Resident", "Surgery"],
  ["Dr. Ramsakal Hansdah", "Senior Resident", "Psychiatry"],
  ["Dr. Rishav Anand", "Junior Resident", "ENT"],
  ["Dr. Priyank Kunal", "Junior Resident", "Medicine"],
  ["Dr. Srishtee Shree", "Junior Resident", "Medicine"],
  ["Dr. Reema Kujur", "Junior Resident", "Surgery"],
].map(([name, post, department]) => ({ name, post, department }));

export const studentLists = [
  ["Student List Batch 2025", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2025.pdf"],
  ["Student List Batch 2024", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2024.pdf"],
  ["Student List Batch 2023", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2023.pdf"],
  ["Student List Batch 2022", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2022.pdf"],
  ["MBBS Batch 2021-22", base + "/wp-content/uploads/2026/05/MBBS-Batch-2021-22.pdf"],
  ["MBBS Batch 2019-20", base + "/wp-content/uploads/2026/05/MBBS-BATCH-2019-20.pdf"],
].map(([title, href]) => ({ title, href }));

export const stipends = [
  ["June 2026 Stipend Payment", base + "/wp-content/uploads/2026/07/Stipend-10th-July.pdf"],
  ["May 2026 Stipend Payment", base + "/wp-content/uploads/2026/06/Doc-06-11-2026-13-53-18.pdf"],
  ["April 2026 Stipend Payment", base + "/wp-content/uploads/2026/05/April-2026-16-May-2026-18-50-58.pdf"],
  ["March 2026 Stipend Payment", base + "/wp-content/uploads/2026/05/March-2026-16-May-2026-18-52-29.pdf"],
  ["Interns Stipend Payment 2024-25", base + "/wp-content/uploads/2026/03/Interns-Stipend-Payment-2024-25.pdf"],
  ["Interns Stipend Payment 2025-26", base + "/wp-content/uploads/2026/03/Interns-Stipend-Payment-2025-26.pdf"],
].map(([title, href]) => ({ title, href }));

export const recruitments = [
  {
    title: "Recruitment of various posts",
    href: base + "/wp-content/uploads/2025/03/IMG-20250327-WA0000.jpg",
  },
];

export const tenders = [
  ["Tender 02/2026-27", "27-05-2026", "06-06-2026", [base + "/wp-content/uploads/2026/05/tender-02-2026-27.pdf"]],
  ["Tender 01/2026-27", "27-05-2026", "06-06-2026", [base + "/wp-content/uploads/2026/05/Tender-01-2026-27.pdf"]],
  ["Tender no 05/2025-26", "27-09-2025", "13-10-2025", [base + "/wp-content/uploads/2025/09/NIT.pdf"]],
  ["Tender no 04/2025-26", "11-09-2025", "19-09-2025", [base + "/wp-content/uploads/2025/09/Scan_0041.pdf"]],
  ["Tender no 03/2025-26", "18-07-2025", "08-08-2025", [base + "/wp-content/uploads/2025/07/Tender-no-03-2025-26.pdf"]],
  ["Tender No. 01/2025 and 02/2025", "04-07-2025", "14-07-2025", [base + "/wp-content/uploads/2025/06/NIT.pdf", base + "/wp-content/uploads/2025/06/NIT-1.pdf"]],
  ["Tender for Students Goods", "20-03-2025", "24-03-2025", [base + "/wp-content/uploads/2025/03/Doc-03-20-2025-17-09-20.pdf"]],
  ["Tender No. 5/2023-25", "24-01-2025", "06-02-2025", [base + "/wp-content/uploads/2025/01/Doc-01-24-2025-12-25-35.pdf"]],
  ["Quotation for Printing of Examination Sheet", "11-09-2024", "13-09-2024", [base + "/wp-content/uploads/2024/09/Doc-09-11-2024-17-27-15.pdf"]],
  ["Quotation for Camera Canon", "11-09-2024", "13-09-2024", [base + "/wp-content/uploads/2024/09/Doc-09-11-2024-17-30-16.pdf"]],
  ["Tender 03/2024-25 – Stationery and Machinery Items", "31-08-2024", "06-09-2024", [base + "/wp-content/uploads/2024/08/03-2024-25.pdf"]],
  ["Tender 01/2024-25 – Stationery, Chemical, Machines, Museum etc.", "02-07-2024", "23-07-2024", [base + "/wp-content/uploads/2024/07/tender-01-2024-25.pdf"]],
  ["Tender 02/2024-25 – Purchase of Books", "02-07-2024", "23-07-2024", [base + "/wp-content/uploads/2024/07/Tender-no-02-2024-25.pdf"]],
  ["Quotation for networking of Internet", "03-02-2024", "09-02-2024", [base + "/wp-content/uploads/2024/02/153-dt-06-02-2024.pdf"]],
  ["Quotation for 20 Mbps Dedicated Internet Leased Line Connection", "02-02-2024", "06-02-2024", [base + "/wp-content/uploads/2024/02/Tender-122-dt-02-02-2024.pdf"]],
  ["Corrigendum of Internet Tender no. 07/2023-24", "08-01-2024", "27-01-2024", [base + "/wp-content/uploads/2024/01/corrgendum-Internet.pdf"]],
  ["Tender no 07/2023-24 – Internet Leased Line & Wi-Fi Network", "08-01-2024", "19-01-2024", [base + "/wp-content/uploads/2024/01/Tender-07-2023-24.pdf"]],
  ["Tender No 06/2023-24 – Internet Leased Line & Intercom Connectivity", "22-08-2023", "11-09-2023", [base + "/wp-content/uploads/2023/08/intercome-tender-62023-2024-23-Aug-2023-5-31-PM.pdf"]],
  ["Tender No 05/2023-24 – Gym & Sports Material", "12-07-2023", "28-07-2023", [base + "/wp-content/uploads/2023/07/Tender-No.-052023-2024PJMC-Dumka.pdf"]],
  ["Tender No 04/2023-24 – Office Material / Chemical / Equipment", "12-07-2023", "28-07-2023", [base + "/wp-content/uploads/2023/07/TenderNo-042023-2024-PJMC-DUMKA.pdf"]],
  ["Tender No 03/2023-24 – Cafeteria", "12-07-2023", "28-07-2023", [base + "/wp-content/uploads/2023/07/Tender-No-032023-24-Cafeteria-PJMC-Dumka.pdf"]],
  ["Tender No 02/2023-24 – Mess (Boys / Girls)", "03-06-2023", "15-06-2023", [base + "/wp-content/uploads/2023/06/MESS-TENDER-2022-2023-PJMC-DUMKA.pdf"]],
  ["Tender No 01/2023-24 – Stationery & Chemical", "30-05-2023", "14-06-2023", [base + "/wp-content/uploads/2023/05/Tender-no-01.2023-24-PJMC-DUMKA.pdf"]],
  ["Tender No 10/2022-23 – CAL Lab (Computer and Other Materials)", "28-01-2023", "07-02-2023", [base + "/wp-content/uploads/2023/01/Tender-No-102020-23PJMCDumka.pdf"]],
  ["Tender No 09/2022-23 – Common Room (Gym Setup)", "20-01-2023", "28-01-2023", [base + "/wp-content/uploads/2023/01/SHORT-Tender-No-092022-23PJMC-DUMKA.pdf"]],
  ["Tender No 08/2022-23 – Library Books", "18-01-2023", "27-01-2023", [base + "/wp-content/uploads/2023/01/Library-Book-Tender-No-82022-23PJMC-Dumka.pdf"]],
  ["Tender No 07/2022 – Library Book List", "11-11-2022", "29-11-2022", [base + "/wp-content/uploads/2022/11/Library-Books-Tender-072022.pdf"]],
  ["Tender 05/2022-23 – Four Wheeler Hiring", "17-10-2022", "10-11-2022", [base + "/wp-content/uploads/2022/10/tender-05.pdf"]],
  ["Tender 04/2022-23 – Bus Hiring", "17-10-2022", "10-11-2022", [base + "/wp-content/uploads/2022/10/tender-04.pdf"]],
  ["Tender 01/2022-23 – Stationery & Chemical", "21-09-2022", "14-10-2022", [base + "/wp-content/uploads/2022/09/Tender-012022-23-PJMC-DUMKA.pdf"]],
  ["Tender 02/2022 – RT-PCR Lab", "03-05-2022", "09-05-2022", [base + "/wp-content/uploads/2022/05/Tender-22022-PJMC-DUMKA-RT-PCR-Lab.pdf"]],
  ["Tender Notice for Bus Purchase", "18-02-2022", "12-03-2022", [base + "/wp-content/uploads/2022/02/Tender-Document-08-21.pdf"]],
].map(([subject, start, end, files]) => ({ subject, start, end, files }));

const galleryNames = [
  "DSC_2831",
  "DSC_2833",
  "DSC_2836",
  "DSC_2848",
  "DSC_2858",
  "DSC_2881",
  "DSC_2886",
  "DSC_2919",
  "DSC_2926",
  "DSC_2992",
];

export const gallery = galleryNames.map((n) => ({
  title: n.replace("_", " "),
  thumb: \`\${base}/wp-content/uploads/photo-gallery/thumb/\${n}.JPG.jpeg\`,
  full: \`\${base}/wp-content/uploads/photo-gallery/\${n}.JPG.jpeg\`,
}));
`,
  'src/routes/__root.jsx': `import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Phulo Jhano Medical College & Hospital, Dumka" },
      {
        name: "description",
        content:
          "Official website of Phulo Jhano Medical College & Hospital, Dumka, Jharkhand — admissions, faculty, notices, tenders and student information.",
      },
      { name: "author", content: "Phulo Jhano Medical College, Dumka" },
      { property: "og:title", content: "Phulo Jhano Medical College & Hospital, Dumka" },
      {
        property: "og:description",
        content:
          "Government medical college and teaching hospital in Dumka, Jharkhand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bitter:wght@500;600;700&family=Inter+Tight:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
`,
  'src/routes/about.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "About Phulo Jhano Medical College & Hospital, Dumka — the institution, its departments, hospital services and university affiliation.",
      },
      { property: "og:title", content: "About Phulo Jhano Medical College, Dumka" },
      {
        property: "og:description",
        content:
          "The institution, its departments, hospital services and affiliation.",
      },
    ],
  }),
  component: About,
});

const departments = [
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Pathology",
  "Microbiology",
  "Pharmacology",
  "Forensic Medicine (FMT)",
  "Community Medicine (PSM)",
  "General Medicine",
  "General Surgery",
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Orthopaedics",
  "Ophthalmology (Eye)",
  "ENT",
  "Psychiatry",
  "Dentistry",
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="About Dumka Medical College"
        subtitle="Phulo Jhano Medical College & Hospital, Dumka is a Government of Jharkhand medical institution providing undergraduate medical education and tertiary hospital care to the Santhal Pargana division."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold">The Institution</h2>
            <p className="mt-4 text-muted-foreground">
              The college was established to expand access to quality medical
              education in Jharkhand and to strengthen healthcare delivery in the
              Dumka region. It runs the MBBS programme with attached teaching
              hospital services, laboratories, a central library and residential
              facilities for students.
            </p>
            <p className="mt-4 text-muted-foreground">
              Teaching is delivered by professors, associate and assistant
              professors, tutors and resident doctors across pre-clinical,
              para-clinical and clinical departments. Students take part in
              supervised clinical postings, community medicine field visits and
              regular internal assessments.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-2xl font-semibold">
              Facilities at a Glance
            </h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Teaching hospital with 24×7 emergency",
                "Central library",
                "Boys' and girls' hostels",
                "Cafeteria / mess",
                "Sports and gymnasium",
                "CAL lab and computer facility",
                "RT-PCR and diagnostic laboratories",
                "Lecture theatres and demonstration rooms",
              ].map((f) => (
                <li key={f} className="rounded-lg bg-secondary px-3 py-2">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-2xl font-semibold">Departments</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {departments.map((d) => (
              <span
                key={d}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="affiliation" className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-serif text-2xl font-semibold">
          Affiliation &amp; Recognition
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          The college is run by the Government of Jharkhand, affiliated to the
          state health university and recognised for the MBBS course as per the
          National Medical Commission (NMC) norms. Faculty attendance is recorded
          through the NMC biometric attendance system.
        </p>
        <a
          href="https://dumcdd.nmcindia.ac.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          NMC Biometric Attendance Portal
        </a>
      </section>
    </>
  );
}
`,
  'src/routes/academics.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Academic information for Phulo Jhano Medical College, Dumka — MBBS course structure, intake capacity, academic calendar and syllabus.",
      },
      { property: "og:title", content: "Academics — PJMCH Dumka" },
      {
        property: "og:description",
        content: "MBBS course, intake capacity, academic calendar and syllabus.",
      },
    ],
  }),
  component: Academics,
});

const phases = [
  {
    title: "Phase I — Pre-clinical",
    body: "Anatomy, Physiology and Biochemistry with early clinical exposure and foundation course.",
  },
  {
    title: "Phase II — Para-clinical",
    body: "Pathology, Pharmacology, Microbiology, Forensic Medicine and clinical postings.",
  },
  {
    title: "Phase III — Clinical",
    body: "Community Medicine, Medicine, Surgery, Obstetrics & Gynaecology, Paediatrics and specialities.",
  },
  {
    title: "Internship",
    body: "Compulsory rotating internship of one year across hospital departments and rural postings.",
  },
];

function Academics() {
  return (
    <>
      <PageHeader
        eyebrow="Academic"
        title="Academics"
        subtitle="Course structure, sanctioned intake, academic calendar and syllabus of the MBBS programme."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {phases.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h2 className="font-serif text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-secondary p-6">
          <h2 className="font-serif text-xl font-semibold">
            Sanctioned Intake Capacity
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-2">Course</th>
                  <th className="py-2">Duration</th>
                  <th className="py-2">Seats</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="py-3 font-medium">MBBS (UG)</td>
                  <td className="py-3 text-muted-foreground">
                    4.5 years + 1 year internship
                  </td>
                  <td className="py-3 text-muted-foreground">100</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3 font-medium">PG courses</td>
                  <td className="py-3 text-muted-foreground">—</td>
                  <td className="py-3 text-muted-foreground">
                    As notified by NMC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="calendar" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Academic Calendar</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            The academic calendar with term dates, internal assessments,
            professional examinations and holidays is issued by the office of the
            Principal each session and published here.
          </p>
        </div>

        <div id="syllabus" className="mt-10 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Syllabus</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            The MBBS syllabus follows the Competency Based Medical Education
            (CBME) curriculum prescribed by the National Medical Commission.
            Subject-wise syllabus documents are published here as released.
          </p>
        </div>

        <div className="mt-10 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">
            Research, CME &amp; Achievements
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Research publications, CME programmes and conferences, and
            awards/achievements of students and faculty are compiled annually and
            published under the mandatory disclosure requirements.
          </p>
        </div>
      </section>
    </>
  );
}
`,
  'src/routes/administration.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import { leadership } from "../data/site";

export const Route = createFileRoute("/administration")({
  head: () => ({
    meta: [
      { title: "Administration | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Details of the Dean & Principal and the Superintendent of Phulo Jhano Medical College & Hospital, Dumka, including contact and e-mail.",
      },
      { property: "og:title", content: "Administration — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Dean & Principal and Superintendent details.",
      },
    ],
  }),
  component: Administration,
});

function Administration() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Administration"
        subtitle="Office bearers of Phulo Jhano Medical College & Hospital, Dumka."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {leadership.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="scroll-mt-32 overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex flex-col gap-6 p-6 sm:flex-row">
                <img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  className="h-48 w-full rounded-xl object-cover sm:h-44 sm:w-40"
                />
                <div>
                  <h2 className="font-serif text-xl font-semibold uppercase">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-accent-foreground">
                    {p.role}
                  </p>
                  <p className="text-sm text-muted-foreground">{p.org}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div>
                      <dt className="font-semibold">Address</dt>
                      <dd className="text-muted-foreground">{p.address}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Email</dt>
                      <dd className="break-words text-muted-foreground">
                        <a className="underline" href={\`mailto:\${p.email}\`}>
                          {p.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
`,
  'src/routes/contact.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import { college } from "../data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Contact Phulo Jhano Medical College & Hospital, Dumka — phone, e-mail, address, registration office and office hours.",
      },
      { property: "og:title", content: "Contact — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Phone, e-mail, address and office hours.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const cards = [
    { icon: "📞", title: "Call Us", body: college.phone, href: college.phoneHref },
    { icon: "📍", title: "Address", body: college.address },
    { icon: "📝", title: "Registration Office", body: college.registrationOffice },
    {
      icon: "✉️",
      title: "Email",
      body: college.email,
      href: \`mailto:\${college.email}\`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle={\`Office Hours: \${college.officeHours}\`}
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="text-2xl">{c.icon}</span>
              <h2 className="mt-3 font-serif text-lg font-semibold">{c.title}</h2>
              {c.href ? (
                <a
                  href={c.href}
                  className="mt-2 block break-words text-sm text-muted-foreground underline"
                >
                  {c.body}
                </a>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Location of Phulo Jhano Medical College, Dumka"
            src="https://www.google.com/maps?q=Phulo%20Jhano%20Medical%20College%20Dumka&output=embed"
            loading="lazy"
            className="h-80 w-full border-0"
          />
        </div>
      </section>
    </>
  );
}
`,
  'src/routes/faculty.jsx': `import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import { faculty, facultyPdf } from "../data/site";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Teaching Staff | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "List of teaching faculty at Phulo Jhano Medical College & Hospital, Dumka with post and department, plus the downloadable faculty list.",
      },
      { property: "og:title", content: "Teaching Staff — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Faculty names, posts and departments.",
      },
    ],
  }),
  component: Faculty,
});

function Faculty() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faculty;
    return faculty.filter((f) =>
      \`\${f.name} \${f.post} \${f.department}\`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Staff Section"
        title="Teaching Staff"
        subtitle="Professors, associate and assistant professors, tutors and resident doctors of the college."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, post or department"
            className="w-full max-w-sm rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <a
            href={facultyPdf}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Download faculty list (PDF)
          </a>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Post</th>
                <th className="px-5 py-3">Department</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.name + f.department} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{f.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{f.post}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {f.department}
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-muted-foreground" colSpan={3}>
                    No matching faculty found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div id="non-teaching" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Non-Teaching Staff</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Administrative, laboratory, nursing and support staff assist the
            academic and hospital functions of the college. The detailed
            non-teaching staff list will be published here on release by the
            office of the Principal.
          </p>
        </div>
      </section>
    </>
  );
}
`,
  'src/routes/gallery.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import { gallery } from "../data/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Photo and video gallery of campus life, events and facilities at Phulo Jhano Medical College & Hospital, Dumka.",
      },
      { property: "og:title", content: "Gallery — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Photographs of campus life, events and facilities.",
      },
      { property: "og:image", content: gallery[0].full },
      { name: "twitter:image", content: gallery[0].full },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photo Gallery"
        subtitle="Moments from the campus, hospital and college events."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((img) => (
            <a
              key={img.full}
              href={img.full}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-card"
            >
              <img
                src={img.thumb}
                alt={img.title}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <p className="px-3 py-2 text-xs text-muted-foreground">{img.title}</p>
            </a>
          ))}
        </div>

        <div id="video" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Video Gallery</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Videos of college functions, awareness campaigns and campus tours will
            be published in this section.
          </p>
        </div>
      </section>
    </>
  );
}
`,
  'src/routes/index.jsx': `import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  heroSlides,
  msrDisclosures,
  college,
  gallery,
  tenders,
  stipends,
  leadership,
} from "../data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Phulo Jhano Medical College & Hospital, Dumka | Official Site" },
      {
        name: "description",
        content:
          "Phulo Jhano Medical College & Hospital, Dumka — MBBS education, hospital services, faculty, notices, tenders, stipends and student information.",
      },
      {
        property: "og:title",
        content: "Phulo Jhano Medical College & Hospital, Dumka",
      },
      {
        property: "og:description",
        content:
          "MBBS education and tertiary healthcare in the Santhal Pargana region of Jharkhand.",
      },
      { property: "og:image", content: heroSlides[0] },
      { name: "twitter:image", content: heroSlides[0] },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "100", label: "MBBS seats per batch" },
  { value: "47+", label: "Teaching faculty" },
  { value: "2019", label: "Established" },
  { value: "24×7", label: "Hospital services" },
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-primary">
      {heroSlides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Campus of Phulo Jhano Medical College, Dumka"
          loading={i === 0 ? "eager" : "lazy"}
          className={\`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 \${
            i === index ? "opacity-40" : "opacity-0"
          }\`}
        />
      ))}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Government of Jharkhand
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
          Phulo Jhano Medical College &amp; Hospital, Dumka
        </h1>
        <p className="mt-5 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
          Educating the next generation of doctors for the Santhal Pargana region,
          while providing compassionate tertiary care to the communities we serve.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/about"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            About the College
          </Link>
          <Link
            to="/students"
            className="rounded-lg border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Student Information
          </Link>
        </div>
        <div className="mt-10 flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s}
              type="button"
              aria-label={\`Show slide \${i + 1}\`}
              onClick={() => setIndex(i)}
              className={\`h-1.5 rounded-full transition-all \${
                i === index ? "w-8 bg-accent" : "w-3 bg-primary-foreground/40"
              }\`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const latestTenders = tenders.slice(0, 4);
  const latestStipends = stipends.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="border-b border-border bg-card">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-serif text-3xl font-semibold text-foreground">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl font-semibold">
              Welcome to Phulo Jhano Medical College, Dumka
            </h2>
            <p className="mt-4 text-muted-foreground">
              Phulo Jhano Medical College &amp; Hospital is a government medical
              college in Dumka, Jharkhand, offering the MBBS programme along with a
              full-service teaching hospital. The institution combines classroom
              teaching, laboratory work and supervised clinical practice so that
              students graduate ready to serve rural and urban communities alike.
            </p>
            <p className="mt-4 text-muted-foreground">
              The campus houses pre-clinical, para-clinical and clinical
              departments, a central library, hostels for boys and girls, a
              cafeteria and sports facilities, supported by a dedicated teaching
              and non-teaching staff.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {leadership.map((p) => (
                <Link
                  key={p.id}
                  to="/administration"
                  hash={p.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 pr-5 transition-colors hover:border-accent"
                >
                  <img
                    src={p.photo}
                    alt={p.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <span className="text-sm">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {p.role}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-secondary p-6">
            <h2 className="font-serif text-xl font-semibold">Latest Notices</h2>
            <ul className="mt-4 space-y-3">
              {latestTenders.map((t) => (
                <li key={t.subject} className="border-b border-border pb-3">
                  <p className="text-sm font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.start} – {t.end}
                  </p>
                </li>
              ))}
              {latestStipends.map((s) => (
                <li key={s.href} className="border-b border-border pb-3">
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">Stipend notice</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-3 text-sm font-semibold">
              <Link to="/tender" className="text-accent-foreground underline">
                All tenders
              </Link>
              <Link to="/stipends" className="text-accent-foreground underline">
                All stipends
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl font-semibold">
            Mandatory Disclosure — MSR Clause B.1.11
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Information published as required by the Minimum Standard Requirements.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Sl. No.</th>
                  <th className="px-5 py-3">Detail of information</th>
                  <th className="px-5 py-3">Web link</th>
                </tr>
              </thead>
              <tbody>
                {msrDisclosures.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="px-5 py-3 text-muted-foreground">{row.id}</td>
                    <td className="px-5 py-3">{row.detail}</td>
                    <td className="px-5 py-3">
                      <Link
                        to={row.link.split("#")[0]}
                        hash={row.link.split("#")[1]}
                        className="font-semibold text-accent-foreground underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold">Campus Gallery</h2>
          <Link to="/gallery" className="text-sm font-semibold underline">
            View full gallery
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.slice(0, 8).map((img) => (
            <a
              key={img.full}
              href={img.full}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-xl border border-border"
            >
              <img
                src={img.thumb}
                alt={\`\${college.shortName} campus photo\`}
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
`,
  'src/routes/recruitment.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import { recruitments } from "../data/site";

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Recruitment | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Recruitment notices and vacancy advertisements published by Phulo Jhano Medical College & Hospital, Dumka.",
      },
      { property: "og:title", content: "Recruitment — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Vacancy advertisements and recruitment notices.",
      },
    ],
  }),
  component: Recruitment,
});

function Recruitment() {
  return (
    <>
      <PageHeader
        eyebrow="Notices"
        title="Recruitment"
        subtitle="Advertisements and notices for vacancies at the college and hospital."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <DocList items={recruitments} />
        <p className="mt-8 text-sm text-muted-foreground">
          Applicants should follow the instructions and deadlines given in each
          advertisement. For clarifications, contact the office of the Principal.
        </p>
      </section>
    </>
  );
}
`,
  'src/routes/stipends.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import { stipends } from "../data/site";

export const Route = createFileRoute("/stipends")({
  head: () => ({
    meta: [
      { title: "Stipends | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Monthly stipend payment notices for interns and residents of Phulo Jhano Medical College & Hospital, Dumka.",
      },
      { property: "og:title", content: "Stipends — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Stipend payment notices for interns and residents.",
      },
    ],
  }),
  component: Stipends,
});

function Stipends() {
  return (
    <>
      <PageHeader
        eyebrow="Students"
        title="Stipends"
        subtitle="Stipend payment disclosures for interns and resident doctors."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <DocList items={stipends} />
      </section>
    </>
  );
}
`,
  'src/routes/students.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import { studentLists } from "../data/site";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "Students | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Student lists by MBBS batch, results, hostel and canteen information for Phulo Jhano Medical College & Hospital, Dumka.",
      },
      { property: "og:title", content: "Students — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Batch-wise student lists, results, hostel and canteen details.",
      },
    ],
  }),
  component: Students,
});

function Students() {
  return (
    <>
      <PageHeader
        eyebrow="Students"
        title="Student Information"
        subtitle="Batch-wise admitted student lists, examination results, hostel and canteen facilities."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-serif text-2xl font-semibold">Student Lists</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Lists of students admitted, published batch-wise as PDF documents.
        </p>
        <div className="mt-6">
          <DocList items={studentLists} />
        </div>

        <div id="result" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Results</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Results of professional examinations conducted during the last academic
            year are notified by the affiliating university and published here by
            the examination section.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div id="hostel" className="scroll-mt-32 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Hostel Facility</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Separate residential hostels for boys and girls are available on
              campus with mess facilities, common rooms, study areas and round-the-
              clock security. Hostel allotment is handled by the office of the
              Principal after admission.
            </p>
          </div>
          <div id="canteen" className="scroll-mt-32 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Canteen</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              The campus cafeteria and mess serve students, staff and hospital
              visitors. Catering contracts are awarded through the tender process
              published on this website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
`,
  'src/routes/tender.jsx': `import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../components/PageHeader";
import { tenders } from "../data/site";

export const Route = createFileRoute("/tender")({
  head: () => ({
    meta: [
      { title: "Tenders | Phulo Jhano Medical College, Dumka" },
      {
        name: "description",
        content:
          "Tender notices, quotations and corrigenda published by Phulo Jhano Medical College & Hospital, Dumka with start dates, end dates and PDF downloads.",
      },
      { property: "og:title", content: "Tenders — PJMCH Dumka" },
      {
        property: "og:description",
        content: "Tender notices and quotations with downloadable documents.",
      },
    ],
  }),
  component: Tenders,
});

function Tenders() {
  return (
    <>
      <PageHeader
        eyebrow="Notices"
        title="Tenders &amp; Quotations"
        subtitle="Current and archived tender notices with their submission windows and documents."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Subject / Tender</th>
                <th className="px-5 py-3">Start date</th>
                <th className="px-5 py-3">End date</th>
                <th className="px-5 py-3">Download</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((t) => (
                <tr key={t.subject + t.start} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{t.subject}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.start}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.end}</td>
                  <td className="px-5 py-3">
                    <span className="flex flex-wrap gap-2">
                      {t.files.map((f, i) => (
                        <a
                          key={f}
                          href={f}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold hover:bg-accent hover:text-accent-foreground"
                        >
                          PDF {t.files.length > 1 ? i + 1 : ""}
                        </a>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="grid gap-4 md:hidden">
          {tenders.map((t) => (
            <li
              key={t.subject + t.start}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-sm font-semibold">{t.subject}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.start} – {t.end}
              </p>
              <span className="mt-3 flex flex-wrap gap-2">
                {t.files.map((f, i) => (
                  <a
                    key={f}
                    href={f}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold"
                  >
                    Download PDF {t.files.length > 1 ? i + 1 : ""}
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Files written');
