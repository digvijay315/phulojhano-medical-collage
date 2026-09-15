import PageHeader from "../components/PageHeader";
import { tenders } from "../data/site";

export default function Tenders() {
  return (
    <>
      <PageHeader
        eyebrow="Notices"
        title="Tenders &amp; Quotations"
        subtitle="Current and archived tender notices with their submission windows and documents."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Subject / Tender</th>
                <th className="px-5 py-3">Start date</th>
                <th className="px-5 py-3">End date</th>
                <th className="px-5 py-3">Download</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((t) => (
                <tr key={t.subject + t.start} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{t.subject}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.start}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.end}</td>
                  <td className="px-5 py-3">
                    <span className="flex flex-wrap gap-2">
                      {t.files.map((f, i) => (
                        <a
                          key={f}
                          href={f}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold hover:bg-accent hover:text-accent-foreground"
                        >
                          PDF {t.files.length > 1 ? i + 1 : ""}
                        </a>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="grid gap-4 md:hidden">
          {tenders.map((t) => (
            <li
              key={t.subject + t.start}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-sm font-semibold">{t.subject}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.start} – {t.end}
              </p>
              <span className="mt-3 flex flex-wrap gap-2">
                {t.files.map((f, i) => (
                  <a
                    key={f}
                    href={f}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold"
                  >
                    Download PDF {t.files.length > 1 ? i + 1 : ""}
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
