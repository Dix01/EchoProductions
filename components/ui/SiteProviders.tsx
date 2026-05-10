"use client";

import { ReactNode } from "react";
import { CustomCursor } from "./CustomCursor";
import { GrainOverlay } from "./GrainOverlay";
import { Preloader } from "./Preloader";
import { SceneRail } from "./SceneRail";
import { useLenis } from "@/lib/hooks/useLenis";

export function SiteProviders({ children }: { children: ReactNode }) {
  useLenis();

  return (
    <>
      <Preloader />
      {children}
      <SceneRail />
      <GrainOverlay />
      <CustomCursor />
    </>
  );
}
