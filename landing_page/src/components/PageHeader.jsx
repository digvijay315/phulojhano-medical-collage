import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, eyebrow }) {
  return (
    <section className="border-b border-border bg-secondary">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-4 py-14"
      >
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
      </motion.div>
    </section>
  );
}