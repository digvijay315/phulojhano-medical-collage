import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { faculty, facultyPdf } from "../data/site";

export default function Faculty() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faculty;
    return faculty.filter((f) =>
      `${f.name} ${f.post} ${f.department}`.toLowerCase().includes(q),
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
