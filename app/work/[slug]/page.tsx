import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/data/projects";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-page px-gutter py-16 md:py-20">
      <a href="/" className="mono-meta text-gold" data-cursor="back">
        ECHO / BACK
      </a>
      <article className="mt-16">
        <div className="mb-12 flex items-start justify-between gap-8">
          <div className="mono-meta text-gold">CASE STUDY</div>
          <div className="mono-meta text-muted">{project.year} / {project.ratio}</div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="display-section max-w-[9ch] text-ink">{project.title}</h1>
          <div className="space-y-8">
            <p className="max-w-xl text-base leading-7 text-ink/80">{project.description}</p>
            <dl className="grid grid-cols-2 gap-5 mono-meta text-muted">
              <div>
                <dt className="text-gold">Category</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt className="text-gold">Runtime</dt>
                <dd>{project.runtime}</dd>
              </div>
              <div>
                <dt className="text-gold">Collaborator</dt>
                <dd>{project.collaborator}</dd>
              </div>
              <div>
                <dt className="text-gold">Frame</dt>
                <dd>{project.ratio}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="asset-plate mt-16 aspect-[16/9] w-full border border-line/10"
          style={{ background: project.plate }}
        >
          <LazyVideo
            webm={project.video?.webm}
            mp4={project.video?.mp4}
            poster={project.video?.poster}
            label={`${project.title} case study loop`}
            className="h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(var(--color-page)/0.38))]" />
        </div>
      </article>
    </main>
  );
}
