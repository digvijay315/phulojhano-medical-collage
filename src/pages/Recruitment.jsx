import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import { recruitments } from "../data/site";

export default function Recruitment() {
  return (
    <>
      <PageHeader
        eyebrow="Notices"
        title="Recruitment"
        subtitle="Advertisements and notices for vacancies at the college and hospital."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <DocList items={recruitments} />
        <p className="mt-8 text-sm text-muted-foreground">
          Applicants should follow the instructions and deadlines given in each
          advertisement. For clarifications, contact the office of the Principal.
        </p>
      </section>
    </>
  );
}
