import { notFound } from "next/navigation";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { getProject } from "@/lib/data/projects";

export default function InterceptedWorkPage({
  params
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyModal project={project} />;
}
