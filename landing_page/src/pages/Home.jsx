import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import {
  heroSlides,
  msrDisclosures,
  college,
  gallery,
  tenders,
  stipends,
  leadership,
} from "../data/site";

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
    <div className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden bg-black">
      {heroSlides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Campus of Phulo Jhano Medical College, Dumka"
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {heroSlides.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [latestNotices, setLatestNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const { data: photos = [], isLoading: isLoadingPhotos } = useQuery({
    queryKey: ['gallery', 'home'],
    queryFn: async () => {
      const res = await api.get('/gallery?type=photo&limit=8');
      return res.data.items || [];
    }
  });

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const [noticesRes, tendersRes, docsRes] = await Promise.all([
          api.get('/notices').catch(() => ({ data: { success: false } })),
          api.get('/tenders?limit=10').catch(() => ({ data: { success: false } })),
          api.get('/documents?limit=10').catch(() => ({ data: { success: false } }))
        ]);
        
        let allItems = [];
        
        if (noticesRes.data.success && noticesRes.data.items) {
          allItems = [...allItems, ...noticesRes.data.items];
        }
        
        if (tendersRes.data.success && tendersRes.data.items) {
          const tenders = tendersRes.data.items
            .filter(item => item.isNewFlash)
            .map(item => ({
              ...item, 
              title: item.name, 
              description: item.subject, 
              date: item.createdAt, 
              category: 'Tender'
            }));
          allItems = [...allItems, ...tenders];
        }

        if (docsRes.data.success && docsRes.data.items) {
          const docs = docsRes.data.items
            .filter(item => item.isNewFlash)
            .map(item => ({
              ...item, 
              date: item.createdAt,
              // category is already there like 'stipend', 'syllabus', etc. Let's uppercase the first letter
              category: item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('_', ' ')
            }));
          allItems = [...allItems, ...docs];
        }

        // Sort by isNewFlash first, then by date
        const sorted = allItems.sort((a, b) => {
          if (a.isNewFlash && !b.isNewFlash) return -1;
          if (!a.isNewFlash && b.isNewFlash) return 1;
          return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
        });

        // Take top 15 items now that we have a scrollbar
        setLatestNotices(sorted.slice(0, 15));
      } catch (err) {
        console.error("Failed to fetch latest items", err);
      }
    };
    fetchLatest();
  }, []);

  return (
    <>
      <Hero />

      <section className="bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Government of Jharkhand
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Phulo Jhano Medical College &amp; Hospital, Dumka
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
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
                className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Student Information
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <motion.dl 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <dt className="font-serif text-3xl font-semibold text-foreground">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
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
                  to={`/administration#${p.id}`}
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
          </motion.div>

          <motion.aside 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-secondary p-6"
          >
            <h2 className="font-serif text-xl font-semibold">Latest Announcements</h2>
            
            {latestNotices.length > 0 ? (
              <div className="mt-4 max-h-[300px] overflow-y-auto pr-2">
                <ul className="space-y-3">
                  {latestNotices.map((notice) => (
                    <li key={notice._id} className="border-b border-border pb-3">
                      <p className="text-sm font-medium flex items-start gap-2">
                        {notice.pdfUrl ? (
                          <a href={notice.pdfUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors line-clamp-2 flex-1">
                            {notice.title}
                          </a>
                        ) : notice.description ? (
                          <button onClick={() => setSelectedNotice(notice)} className="text-left hover:text-accent transition-colors line-clamp-2 flex-1">
                            {notice.title}
                          </button>
                        ) : (
                          <span className="line-clamp-2 flex-1">{notice.title}</span>
                        )}
                        {notice.isNewFlash && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse shrink-0">NEW</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground flex justify-between mt-1">
                        <span>{notice.category}</span>
                        <span>{new Date(notice.date).toLocaleDateString()}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">No recent notices.</p>
            )}
            
            <div className="mt-5 flex gap-3 text-sm font-semibold">
              <Link to="/tender" className="text-accent-foreground underline">
                Tenders
              </Link>
              <Link to="/stipends" className="text-accent-foreground underline">
                Stipends
              </Link>
            </div>
          </motion.aside>
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
                        to={`${row.link.split("#")[0]}#${row.link.split("#")[1]}`}
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
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {isLoadingPhotos && <p className="text-muted-foreground col-span-full">Loading gallery...</p>}
          {!isLoadingPhotos && photos.length === 0 && <p className="text-muted-foreground col-span-full">No photos available.</p>}
          {photos.map((img) => (
            <motion.a
              key={img._id}
              href={img.url}
              target="_blank"
              rel="noreferrer"
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="group overflow-hidden rounded-xl border border-border bg-card flex flex-col"
            >
              <div className="overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="px-3 py-2 text-xs text-muted-foreground truncate">{img.title}</p>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Modal for Notice Description */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <h3 className="text-xl font-bold font-serif mb-2">{selectedNotice.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {new Date(selectedNotice.date).toLocaleDateString()} | {selectedNotice.category}
            </p>
            <div className="text-gray-700 whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
              {selectedNotice.description}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
