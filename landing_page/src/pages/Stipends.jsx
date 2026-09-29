import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import { stipends } from "../data/site";

export default function Stipends() {
  return (
    <>
      <PageHeader
        eyebrow="Students"
        title="Stipends"
        subtitle="Stipend payment disclosures for interns and resident doctors."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <DocList items={stipends} />
      </section>
    </>
  );
}
