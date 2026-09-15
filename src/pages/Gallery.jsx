import PageHeader from "../components/PageHeader";
import { gallery } from "../data/site";

export default function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photo Gallery"
        subtitle="Moments from the campus, hospital and college events."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((img) => (
            <a
              key={img.full}
              href={img.full}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-card"
            >
              <img
                src={img.thumb}
                alt={img.title}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <p className="px-3 py-2 text-xs text-muted-foreground">{img.title}</p>
            </a>
          ))}
        </div>

        <div id="video" className="mt-14 scroll-mt-32">
          <h2 className="font-serif text-2xl font-semibold">Video Gallery</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Videos of college functions, awareness campaigns and campus tours will
            be published in this section.
          </p>
        </div>
      </section>
    </>
  );
}
