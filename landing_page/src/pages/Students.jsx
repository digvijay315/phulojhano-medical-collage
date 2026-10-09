import { useQuery } from "@tanstack/react-query";
import PageHeader from "../components/PageHeader";
import DocList from "../components/DocList";
import api from "../api";

export default function Students() {
  const { data: studentLists, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['documents', 'student_list'],
    queryFn: async () => {
      const res = await api.get('/documents?category=student_list&limit=100');
      return res.data.items.map(i => ({ id: i._id, title: i.title, href: i.pdfUrl, isNewFlash: i.isNewFlash }));
    }
  });

  const { data: syllabus, isLoading: isLoadingSyllabus } = useQuery({
    queryKey: ['documents', 'syllabus'],
    queryFn: async () => {
      const res = await api.get('/documents?category=syllabus&limit=100');
      return res.data.items.map(i => ({ id: i._id, title: i.title, href: i.pdfUrl, isNewFlash: i.isNewFlash }));
    }
  });

  const { data: results, isLoading: isLoadingResults } = useQuery({
    queryKey: ['documents', 'result'],
    queryFn: async () => {
      const res = await api.get('/documents?category=result&limit=100');
      return res.data.items.map(i => ({ id: i._id, title: i.title, href: i.pdfUrl, isNewFlash: i.isNewFlash }));
    }
  });

  const { data: hostels, isLoading: isLoadingHostels } = useQuery({
    queryKey: ['facilities', 'hostel'],
    queryFn: async () => {
      const res = await api.get('/facilities?category=hostel&limit=10');
      return res.data.items;
    }
  });

  const { data: canteens, isLoading: isLoadingCanteens } = useQuery({
    queryKey: ['facilities', 'canteen'],
    queryFn: async () => {
      const res = await api.get('/facilities?category=canteen&limit=10');
      return res.data.items;
    }
  });

  return (
    <>
      <PageHeader
        eyebrow="Students"
        title="Student Information"
        subtitle="Batch-wise admitted student lists, syllabi, examination results, hostel and canteen facilities."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        {/* Student Lists Section */}
        <div id="student-lists" className="scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Student Lists</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Lists of students admitted, published batch-wise as PDF documents.
          </p>
          <div className="mt-6">
            {isLoadingStudents && <p className="text-sm text-muted-foreground">Loading student lists...</p>}
            {!isLoadingStudents && studentLists && studentLists.length === 0 && (
              <p className="text-sm text-muted-foreground">No student lists published yet.</p>
            )}
            {studentLists && studentLists.length > 0 && <DocList items={studentLists} />}
          </div>
        </div>

        {/* Syllabus Section */}
        <div id="syllabus" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Syllabus</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Course curriculum and syllabi for various academic years.
          </p>
          <div className="mt-6">
            {isLoadingSyllabus && <p className="text-sm text-muted-foreground">Loading syllabus...</p>}
            {!isLoadingSyllabus && syllabus && syllabus.length === 0 && (
              <p className="text-sm text-muted-foreground">No syllabi published yet.</p>
            )}
            {syllabus && syllabus.length > 0 && <DocList items={syllabus} />}
          </div>
        </div>

        {/* Results Section */}
        <div id="result" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Results</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Results of professional examinations conducted during the last academic
            year are notified by the affiliating university and published here by
            the examination section.
          </p>
          <div className="mt-6">
            {isLoadingResults && <p className="text-sm text-muted-foreground">Loading results...</p>}
            {!isLoadingResults && results && results.length === 0 && (
              <p className="text-sm text-muted-foreground">No examination results published yet.</p>
            )}
            {results && results.length > 0 && <DocList items={results} />}
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Hostel */}
          <div id="hostel" className="scroll-mt-32 rounded-2xl border border-border bg-card p-6 flex flex-col">
            <h2 className="font-serif text-xl font-semibold">Hostel Facility</h2>
            <p className="mt-3 text-sm text-muted-foreground mb-4">
              Separate residential hostels for boys and girls are available on
              campus with mess facilities, common rooms, study areas and round-the-
              clock security. Hostel allotment is handled by the office of the
              Principal after admission.
            </p>
            {isLoadingHostels && <p className="text-sm text-muted-foreground mt-auto">Loading updates...</p>}
            {hostels && hostels.length > 0 && (
              <div className="mt-auto pt-4 border-t border-border flex flex-col gap-4">
                {hostels.map(h => (
                  <div key={h._id}>
                    <h3 className="font-semibold text-sm text-foreground">{h.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{h.description}</p>
                    {h.imageUrl && <img src={h.imageUrl} alt={h.title} className="mt-3 rounded-xl w-full h-48 object-cover border border-border" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Canteen */}
          <div id="canteen" className="scroll-mt-32 rounded-2xl border border-border bg-card p-6 flex flex-col">
            <h2 className="font-serif text-xl font-semibold">Canteen</h2>
            <p className="mt-3 text-sm text-muted-foreground mb-4">
              The campus cafeteria and mess serve students, staff and hospital
              visitors. Catering contracts are awarded through the tender process
              published on this website.
            </p>
            {isLoadingCanteens && <p className="text-sm text-muted-foreground mt-auto">Loading updates...</p>}
            {canteens && canteens.length > 0 && (
              <div className="mt-auto pt-4 border-t border-border flex flex-col gap-4">
                {canteens.map(c => (
                  <div key={c._id}>
                    <h3 className="font-semibold text-sm text-foreground">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.description}</p>
                    {c.imageUrl && <img src={c.imageUrl} alt={c.title} className="mt-3 rounded-xl w-full h-48 object-cover border border-border" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
