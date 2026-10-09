import { motion } from "framer-motion";

export default function DocList({ items }) {
  return (
    <motion.ul 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.05 }
        }
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {items.map((item) => (
        <motion.li 
          key={item.href}
          variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
        >
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
              <span className="text-sm font-medium text-card-foreground flex items-center gap-2 flex-wrap">
                {item.title}
                {item.isNewFlash && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse">NEW</span>
                )}
              </span>
            </span>
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-accent-foreground/80 group-hover:text-foreground">
              Download
            </span>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}