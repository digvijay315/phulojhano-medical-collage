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
    <section className="relative isolate overflow-hidden bg-primary">
      {heroSlides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Campus of Phulo Jhano Medical College, Dumka"
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-40" : "opacity-0"
          }`}
        />
      ))}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
        </motion.div>
        <div className="mt-10 flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-3 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [latestNotices, setLatestNotices] = useState([]);
  const { data: photos = [], isLoading: isLoadingPhotos } = useQuery({
    queryKey: ['gallery', 'home'],
    queryFn: async () => {
      const res = await api.get('/gallery?type=photo&limit=8');
      return res.data.items || [];
    }
  });

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notices");
        const data = await response.json();
        if (data.success && data.items) {
          // Sort by date descending and take top 5
          const sorted = data.items.sort((a, b) => new Date(b.date) - new Date(a.date));
          setLatestNotices(sorted.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch notices", err);
      }
    };
    fetchNotices();
  }, []);

  return (
    <>
      <Hero />

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
            <h2 className="font-serif text-xl font-semibold">Latest Notices</h2>
            
            {latestNotices.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {latestNotices.map((notice) => (
                  <li key={notice._id} className="border-b border-border pb-3">
                    <p className="text-sm font-medium">
                      {notice.pdfUrl ? (
                        <a href={notice.pdfUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                          {notice.title}
                        </a>
                      ) : (
                        <span>{notice.title}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground flex justify-between mt-1">
                      <span>{notice.category}</span>
                      <span>{new Date(notice.date).toLocaleDateString()}</span>
                    </p>
                  </li>
                ))}
              </ul>
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
    </>
  );
}
