import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import { facultyPdf } from "../data/site";

export default function Faculty() {
  const [query, setQuery] = useState("");
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/staff?type=teaching&limit=200");
        if (res.data && res.data.success) {
          setFaculty(res.data.items);
        }
      } catch (err) {
        console.error("Failed to fetch faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faculty;
    return faculty.filter((f) =>
      `${f.name} ${f.post} ${f.department}`.toLowerCase().includes(q),
    );
  }, [query, faculty]);

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
                <th className="px-5 py-3 w-16">Photo</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Post</th>
                <th className="px-5 py-3">Department</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-5 py-6 text-center text-muted-foreground" colSpan={4}>
                    Loading faculty...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-center text-muted-foreground" colSpan={4}>
                    No matching faculty found.
                  </td>
                </tr>
              ) : (
                rows.map((f) => (
                  <tr key={f._id || f.name + f.department} className="border-t border-border">
                    <td className="px-5 py-3">
                      {f.imageUrl ? (
                        <img src={f.imageUrl} alt={f.name} className="w-10 h-10 rounded-full object-cover border border-border" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-sm">
                          {f.name ? f.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium">{f.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{f.post}</td>
                    <td className="px-5 py-3 text-muted-foreground">{f.department}</td>
                  </tr>
                ))
              )}
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
