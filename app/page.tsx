import { Capabilities } from "@/components/sections/Capabilities";
import { Collaborators } from "@/components/sections/Collaborators";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CurrentProduction } from "@/components/sections/CurrentProduction";
import { Hero } from "@/components/sections/Hero";
import { FrameMatrix } from "@/components/sections/FrameMatrix";
import { Philosophy } from "@/components/sections/Philosophy";
import { StudioApparatus } from "@/components/sections/StudioApparatus";
import { TemporalThesis } from "@/components/sections/TemporalThesis";
import { WorkReel } from "@/components/sections/WorkReel";

export default function Home() {
  return (
    <main>
      <Hero />
      <TemporalThesis />
      <StudioApparatus />
      <WorkReel />
      <FrameMatrix />
      <Capabilities />
      <Philosophy />
      <Collaborators />
      <CurrentProduction />
      <ContactCTA />
    </main>
  );
}
