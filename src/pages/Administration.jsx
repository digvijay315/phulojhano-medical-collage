import PageHeader from "../components/PageHeader";
import { leadership } from "../data/site";

export default function Administration() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Administration"
        subtitle="Office bearers of Phulo Jhano Medical College & Hospital, Dumka."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {leadership.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="scroll-mt-32 overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex flex-col gap-6 p-6 sm:flex-row">
                <img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  className="h-48 w-full rounded-xl object-cover sm:h-44 sm:w-40"
                />
                <div>
                  <h2 className="font-serif text-xl font-semibold uppercase">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-accent-foreground">
                    {p.role}
                  </p>
                  <p className="text-sm text-muted-foreground">{p.org}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div>
                      <dt className="font-semibold">Address</dt>
                      <dd className="text-muted-foreground">{p.address}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Email</dt>
                      <dd className="break-words text-muted-foreground">
                        <a className="underline" href={`mailto:${p.email}`}>
                          {p.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
