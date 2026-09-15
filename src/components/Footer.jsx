import { Link } from "react-router-dom";
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
                href={`mailto:${college.email}`}
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
}