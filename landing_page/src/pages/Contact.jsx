import PageHeader from "../components/PageHeader";
import { college } from "../data/site";

export default function Contact() {
  const cards = [
    { icon: "📞", title: "Call Us", body: college.phone, href: college.phoneHref },
    { icon: "📍", title: "Address", body: college.address },
    { icon: "📝", title: "Registration Office", body: college.registrationOffice },
    {
      icon: "✉️",
      title: "Email",
      body: college.email,
      href: `mailto:${college.email}`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle={`Office Hours: ${college.officeHours}`}
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="text-2xl">{c.icon}</span>
              <h2 className="mt-3 font-serif text-lg font-semibold">{c.title}</h2>
              {c.href ? (
                <a
                  href={c.href}
                  className="mt-2 block break-words text-sm text-muted-foreground underline"
                >
                  {c.body}
                </a>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Location of Phulo Jhano Medical College, Dumka"
            src="https://www.google.com/maps?q=Phulo%20Jhano%20Medical%20College%20Dumka&output=embed"
            loading="lazy"
            className="h-80 w-full border-0"
          />
        </div>
      </section>
    </>
  );
}
