import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MarqueeComponent from "react-fast-marquee";
const Marquee = MarqueeComponent.default || MarqueeComponent;
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
    <Link className={cls} to={item.to || "#"} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

function MobileNavItem({ item, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-primary-foreground/10 py-1">
      <div className="flex items-center justify-between">
        <NavLink item={item} onNavigate={onNavigate} />
        {item.children ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 px-3 text-lg text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            aria-label="Toggle submenu"
          >
            {isOpen ? "−" : "+"}
          </button>
        ) : null}
      </div>
      {item.children && isOpen ? (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="ml-4 flex flex-col pb-1 overflow-hidden"
        >
          {item.children.map((child) => (
            <Link
              key={child.label}
              to={child.to}
              onClick={onNavigate}
              className="rounded-md px-3 py-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </motion.div>
      ) : null}
    </div>
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
            <a className="hover:underline" href={`mailto:${college.email}`}>
              ✉ {college.email}
            </a>
          </div>
          <p className="truncate">Government of Jharkhand · NMC recognised</p>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white overflow-hidden">
              <img src="/logo.webp" alt="PJMC Logo" className="w-full h-full object-cover" />
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

        <AnimatePresence>
          {open ? (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-primary-foreground/15 px-4 pb-4 lg:hidden overflow-hidden"
            >
              {nav.map((item) => (
                <MobileNavItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl overflow-hidden py-1.5 text-xs font-medium">
          <Marquee speed={40} gradient={false}>
            <span className="mx-4">Notice: {college.noticeTicker}</span>
            <span className="mx-4">Notice: {college.noticeTicker}</span>
          </Marquee>
        </div>
      </div>
    </header>
  );
}