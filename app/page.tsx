import { Capabilities } from "@/components/sections/Capabilities";
import { Collaborators } from "@/components/sections/Collaborators";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CurrentProduction } from "@/components/sections/CurrentProduction";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { WorkReel } from "@/components/sections/WorkReel";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkReel />
      <Capabilities />
      <Philosophy />
      <Collaborators />
      <CurrentProduction />
      <ContactCTA />
    </main>
  );
}
