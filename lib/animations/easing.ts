export const easings = {
  // Expo-out entrance: chosen for title cards and section reveals because it arrives decisively without feeling springy.
  enter: [0.16, 1, 0.3, 1] as const,
  // Committed exit: chosen for preloader/modal departures so the scene cuts away with editorial intent.
  exit: [0.7, 0, 0.84, 0] as const,
  // Weighted dolly: chosen for horizontal/scroll-adjacent movement that should feel like camera mass.
  dolly: [0.22, 1, 0.36, 1] as const,
  // Quiet hover: chosen for interactive micro-moments that should be felt, not announced.
  hover: [0.25, 1, 0.5, 1] as const
};

export const durations = {
  hover: 0.32,
  reveal: 0.78,
  section: 0.92,
  page: 1.2
};
