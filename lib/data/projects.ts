export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  runtime: string;
  ratio: string;
  collaborator: string;
  description: string;
  plate: string;
  video?: {
    webm?: string;
    mp4?: string;
    poster?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "battle-of-badr",
    title: "The Battle of Badr",
    category: "Feature / Historical",
    year: "2026",
    runtime: "In Production",
    ratio: "2.39:1",
    collaborator: "ECHO Original",
    description:
      "A major historical cinematic production developed through sacred realism, temporal compression, and AI-native worldbuilding.",
    plate:
      "linear-gradient(135deg, rgba(18,22,32,0.92), rgba(0,0,0,0.98) 46%, rgba(201,169,97,0.18))",
    video: {
      webm: "/assets/work/echo-cold-open.webm",
      mp4: "/assets/work/echo-cold-open.mp4",
      poster: "/assets/work/echo-cold-open.webp"
    }
  },
  {
    slug: "ramadan-signal",
    title: "Ramadan Signal",
    category: "Music Video / VFX",
    year: "2025",
    runtime: "03:42",
    ratio: "16:9",
    collaborator: "Mohamed Ramadan",
    description:
      "A performance-driven visual system built around compression, heat, and controlled spectacle.",
    plate:
      "linear-gradient(135deg, rgba(23,16,20,0.94), rgba(0,0,0,0.96) 52%, rgba(201,169,97,0.14))",
    video: {
      webm: "/assets/work/echo-street-spectacle.webm",
      mp4: "/assets/work/echo-street-spectacle.mp4",
      poster: "/assets/work/echo-street-spectacle.webp"
    }
  },
  {
    slug: "fishawy-afterimage",
    title: "Afterimage Study",
    category: "Short Film",
    year: "2025",
    runtime: "11:08",
    ratio: "1.66:1",
    collaborator: "Ahmed El Fishawy",
    description:
      "A short-form cinematic study in memory, performance, and non-linear architectural space.",
    plate:
      "linear-gradient(135deg, rgba(9,16,25,0.96), rgba(0,0,0,1) 58%, rgba(86,94,105,0.28))",
    video: {
      webm: "/assets/work/echo-dark-fantasy.webm",
      mp4: "/assets/work/echo-dark-fantasy.mp4",
      poster: "/assets/work/echo-dark-fantasy.webp"
    }
  },
  {
    slug: "diab-archive",
    title: "Archive Engine",
    category: "Feature Development",
    year: "2025",
    runtime: "Proof Sequence",
    ratio: "2.00:1",
    collaborator: "Khaled Diab",
    description:
      "A development reel for period texture, procedural crowds, and editorial reconstruction.",
    plate:
      "linear-gradient(135deg, rgba(12,14,13,0.95), rgba(0,0,0,0.98) 50%, rgba(98,87,65,0.22))",
    video: {
      webm: "/assets/work/echo-ground-crack.webm",
      mp4: "/assets/work/echo-ground-crack.mp4",
      poster: "/assets/work/echo-ground-crack.webp"
    }
  },
  {
    slug: "dessouky-commercial",
    title: "Silent Product",
    category: "Commercial",
    year: "2024",
    runtime: "00:45",
    ratio: "9:16 / 16:9",
    collaborator: "Ahmed Dessouky",
    description:
      "A commercial language test using negative space, restraint, and product-scale cinematic lighting.",
    plate:
      "linear-gradient(135deg, rgba(4,8,14,0.98), rgba(0,0,0,0.96) 54%, rgba(201,169,97,0.1))",
    video: {
      webm: "/assets/work/echo-interrogation.webm",
      mp4: "/assets/work/echo-interrogation.mp4",
      poster: "/assets/work/echo-interrogation.webp"
    }
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
