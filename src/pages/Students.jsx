import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import { studentLists } from "../data/site";

export default function Students() {
  return (
    <>
      <PageHeader
        eyebrow="Students"
        title="Student Information"
        subtitle="Batch-wise admitted student lists, examination results, hostel and canteen facilities."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-serif text-2xl font-semibold">Student Lists</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Lists of students admitted, published batch-wise as PDF documents.
        </p>
        <div className="mt-6">
          <DocList items={studentLists} />
        </div>

        <div id="result" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Results</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Results of professional examinations conducted during the last academic
            year are notified by the affiliating university and published here by
            the examination section.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div id="hostel" className="scroll-mt-32 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Hostel Facility</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Separate residential hostels for boys and girls are available on
              campus with mess facilities, common rooms, study areas and round-the-
              clock security. Hostel allotment is handled by the office of the
              Principal after admission.
            </p>
          </div>
          <div id="canteen" className="scroll-mt-32 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Canteen</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              The campus cafeteria and mess serve students, staff and hospital
              visitors. Catering contracts are awarded through the tender process
              published on this website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
