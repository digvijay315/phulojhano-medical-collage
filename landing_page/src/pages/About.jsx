import PageHeader from "../components/PageHeader";

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

export default function About() {
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
