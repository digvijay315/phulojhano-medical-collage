import { useQuery } from "@tanstack/react-query";
import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import api from "../api";

export default function Stipends() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stipends'],
    queryFn: async () => {
      const response = await api.get('/documents?category=stipend');
      return response.data.items.map(item => ({
        id: item._id,
        title: item.title,
        href: item.pdfUrl,
        isNewFlash: item.isNewFlash
      }));
    }
  });

  return (
    <>
      <PageHeader
        eyebrow="Students"
        title="Stipends"
        subtitle="Stipend payment disclosures for interns and resident doctors."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        {isLoading && <p className="text-center text-muted-foreground">Loading stipends...</p>}
        {isError && <p className="text-center text-destructive">Error loading stipends.</p>}
        {data && <DocList items={data} />}
      </section>
    </>
  );
}
