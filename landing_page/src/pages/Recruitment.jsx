import { useQuery } from "@tanstack/react-query";
import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import api from "../api";

export default function Recruitment() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['recruitments'],
    queryFn: async () => {
      const response = await api.get('/notices?category=Recruitment');
      return response.data.items.map(item => ({
        id: item._id,
        title: item.title,
        href: item.pdfUrl
      }));
    }
  });

  return (
    <>
      <PageHeader
        eyebrow="Notices"
        title="Recruitment"
        subtitle="Advertisements and notices for vacancies at the college and hospital."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        {isLoading && <p className="text-center text-muted-foreground">Loading recruitment notices...</p>}
        {isError && <p className="text-center text-destructive">Error loading recruitment notices.</p>}
        {!isLoading && data && data.length === 0 && (
          <p className="text-center text-muted-foreground pb-8">No active recruitment notices found.</p>
        )}
        {!isLoading && data && data.length > 0 && <DocList items={data} />}
        
        <p className="mt-8 text-sm text-muted-foreground">
          Applicants should follow the instructions and deadlines given in each
          advertisement. For clarifications, contact the office of the Principal.
        </p>
      </section>
    </>
  );
}
