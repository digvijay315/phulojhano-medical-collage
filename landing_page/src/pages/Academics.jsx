import PageHeader from "../components/PageHeader";

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

export default function Academics() {
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
