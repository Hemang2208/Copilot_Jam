export type Skill = {
  name: string
  description: string
  duration: string
  license: string
  cost: string
}

export const MOCK_SKILLS: Skill[] = [
  {
    name: "Quantum Navigation",
    description: "Plot FTL jumps safely near gravity wells.",
    duration: "3 weeks",
    license: "QN-L2",
    cost: "120 StarCredits",
  },
  {
    name: "Exo-Biology Basics",
    description: "Interact with non-terrestrial life respectfully.",
    duration: "2 weeks",
    license: "XB-L1",
    cost: "90 StarCredits",
  },
  {
    name: "Astro-Mining Ops",
    description: "Run autonomous rigs on low-g planetoids.",
    duration: "4 weeks",
    license: "AM-L3",
    cost: "160 StarCredits",
  },
  {
    name: "Vac-Suit Mastery",
    description: "Advanced EVA procedures and diagnostics.",
    duration: "1 week",
    license: "VS-L1",
    cost: "60 StarCredits",
  },
  {
    name: "Terraforming Control",
    description: "Calibrate atmosphere processors.",
    duration: "6 weeks",
    license: "TF-L4",
    cost: "240 StarCredits",
  },
  {
    name: "Cosmic Trading",
    description: "Barter across federations and stations.",
    duration: "2 weeks",
    license: "CT-L2",
    cost: "85 StarCredits",
  },
]

export type Planet = {
  name: string
  icon?: "globe" | "moon" | "rocket"
  options: {
    rooms: string[]
    oxygen: string[]
    transportClass: string[]
    departureWindows: string[]
    supplies?: string[]
  }
}

export const MOCK_PLANETS: Planet[] = [
  {
    name: "Mars",
    icon: "globe",
    options: {
      rooms: ["Capsule", "Hab Suite", "Dome View"],
      oxygen: ["Standard", "Premium", "Lab-grade"],
      transportClass: ["Economy", "Explorer", "First"],
      departureWindows: ["2025-09-10", "2025-10-02", "2025-11-15"],
      supplies: ["Food Pack", "Water Pack", "Med Kit", "Tool Kit"],
    },
  },
  {
    name: "Europa",
    icon: "moon",
    options: {
      rooms: ["Subsurface Pod", "Ice Ridge Suite"],
      oxygen: ["Standard", "Premium"],
      transportClass: ["Explorer", "First"],
      departureWindows: ["2025-09-21", "2025-10-18", "2025-12-01"],
      supplies: ["Thermal Gear", "Rover Access", "Lab Access"],
    },
  },
  {
    name: "Titan",
    icon: "rocket",
    options: {
      rooms: ["Stormproof Pod", "Methane Bay Suite"],
      oxygen: ["Standard", "Premium", "Research"],
      transportClass: ["Economy", "Explorer"],
      departureWindows: ["2025-09-05", "2025-10-28", "2025-12-22"],
      supplies: ["Heated Suit", "Drone Access", "Nav Beacons"],
    },
  },
  {
    name: "Moon Base",
    icon: "moon",
    options: {
      rooms: ["Crater Capsule", "Lunar View Suite"],
      oxygen: ["Standard", "Premium"],
      transportClass: ["Economy", "Explorer", "First"],
      departureWindows: ["2025-09-02", "2025-09-29", "2025-11-07"],
      supplies: ["EVA Pass", "Golf Cart", "Museum Access"],
    },
  },
]

export function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-")
}
