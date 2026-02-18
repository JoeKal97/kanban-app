// BALBOA MEDIA OS KANBAN - INITIAL TASKS
// Taxonomy v2.0 - 5 Categories, 6 Statuses

export const INITIAL_TASKS = [
  // DONE - Content
  {
    id: "1",
    title: "Zamurai Keyword Bootcamp",
    description: "Learned 7 keyword types + monetization framework",
    category: "Strategy",
    status: "Done",
    priority: "High",
    tags: ["keywords", "framework"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "2",
    title: "DFY Suite Research",
    description: "Research complete, SKILL.md created (18KB)",
    category: "Strategy",
    status: "Done",
    priority: "High",
    tags: ["skill", "integration"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "3",
    title: "On-Page SEO Blueprint",
    description: "Transcribed video (17K chars), absorbed teaching",
    category: "Strategy",
    status: "Done",
    priority: "High",
    tags: ["seo", "learning"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "4",
    title: "Global Control Center Research",
    description: "Research complete, SKILL.md created (47KB)",
    category: "Strategy",
    status: "Done",
    priority: "High",
    tags: ["skill", "integration"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "5",
    title: "GitHub kanban-app Repo",
    description: "Created & pushed code to GitHub",
    category: "Platform",
    status: "Done",
    priority: "High",
    tags: ["deploy", "github"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "6",
    title: "Vercel Deployment",
    description: "Kanban app deployed and live",
    category: "Platform",
    status: "Done",
    priority: "High",
    tags: ["deploy", "vercel"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "21",
    title: "Best Date Night Restaurants Article",
    description: "Published to Zootown Lowdown - reviews + sponsor features",
    category: "Content",
    status: "Done",
    priority: "High",
    tags: ["article", "zootown"],
    createdDate: "2026-02-16",
    updatedDate: "2026-02-16"
  },
  {
    id: "22",
    title: "Balboa Media OS - Timezone Handling Fix",
    description: "Fixed send schedule countdown - UTC storage + Denver conversion",
    category: "Platform",
    status: "Done",
    priority: "High",
    tags: ["timezone", "fix"],
    createdDate: "2026-02-16",
    updatedDate: "2026-02-16"
  },
  {
    id: "23",
    title: "Balboa Media OS - Schema Adapter",
    description: "Auto-detect column names (send_datetime_local vs send_datetime_utc)",
    category: "Platform",
    status: "Done",
    priority: "High",
    tags: ["database", "refactor"],
    createdDate: "2026-02-16",
    updatedDate: "2026-02-16"
  },
  {
    id: "25",
    title: "Best Hotels in Missoula Article",
    description: "Published to Zootown Lowdown - The Wren Hotel sponsorship",
    category: "Content",
    status: "Done",
    priority: "High",
    tags: ["article", "zootown", "sponsor"],
    createdDate: "2026-02-16",
    updatedDate: "2026-02-16"
  },
  
  // IN PROGRESS
  {
    id: "7",
    title: "PopLinks + Affiliate Hybrid Strategy",
    description: "Multi-page intent-based funnel",
    category: "Revenue",
    status: "In Progress",
    priority: "High",
    tags: ["funnel", "strategy"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "8",
    title: "Claude API Cost Optimization",
    description: "Reduce spending from $95 baseline",
    category: "Platform",
    status: "In Progress",
    priority: "Med",
    tags: ["cost", "audit"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "24",
    title: "Balboa Media OS - Zootown Schedule Config",
    description: "Fixed send_day_of_week to Friday (5), corrected send time to 11:00 AM",
    category: "Platform",
    status: "In Progress",
    priority: "High",
    tags: ["config", "fix"],
    createdDate: "2026-02-16",
    updatedDate: "2026-02-16"
  },
  
  // REVIEW
  {
    id: "9",
    title: "Find VideoChief & MyVideoSpy Affiliate Links",
    description: "Get tracking URLs for both products",
    category: "Revenue",
    status: "Review",
    priority: "High",
    tags: ["affiliate", "blocked"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "10",
    title: "Decide: Email Platform",
    description: "Choose email provider for PopLinks nurture",
    category: "Platform",
    status: "Review",
    priority: "High",
    tags: ["decision", "blocked"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "11",
    title: "Choose Social Agency 360 Bump Offer",
    description: "Select or create bump offer for JVZoo",
    category: "Revenue",
    status: "Review",
    priority: "High",
    tags: ["offer", "blocked"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  
  // READY (was Planned)
  {
    id: "12",
    title: "Build PopLinks Sales Pages (4 Intent Angles)",
    description: "Review, Decision, Bonus, How-To pages",
    category: "Revenue",
    status: "Ready",
    priority: "High",
    tags: ["funnel", "pages"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "13",
    title: "GCC + PopLinks Integration",
    description: "Map how Global Control Center connects",
    category: "Platform",
    status: "Ready",
    priority: "High",
    tags: ["api", "mapping"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "14",
    title: "Email Nurture Sequences",
    description: "Build 5-email sequences for bump offer",
    category: "Revenue",
    status: "Ready",
    priority: "High",
    tags: ["email", "sequence"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "15",
    title: "Missoula Eats & Treats Keywords",
    description: "Research keywords + pillars for newsletter",
    category: "Content",
    status: "Ready",
    priority: "Med",
    tags: ["seo", "keywords"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "16",
    title: "Save Our Doggy Keywords",
    description: "Research keywords + pillars for newsletter",
    category: "Content",
    status: "Ready",
    priority: "Med",
    tags: ["seo", "keywords"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "17",
    title: "DFY Suite Campaign Automation",
    description: "Build Letterman → DFY pipeline",
    category: "Platform",
    status: "Ready",
    priority: "Med",
    tags: ["automation", "api"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "26",
    title: "SerpSling Rank Tracking Campaign",
    description: "Set up tracking for 'best restaurants missoula' & 'best hotels missoula'",
    category: "Growth",
    status: "Ready",
    priority: "High",
    tags: ["seo", "tracking"],
    createdDate: "2026-02-16",
    updatedDate: "2026-02-16"
  },
  {
    id: "27",
    title: "Nextdoor App Distribution Strategy",
    description: "Explore how to publish/push Save Our Doggy articles to Nextdoor - local community reach",
    category: "Growth",
    status: "Ready",
    priority: "Med",
    tags: ["distribution", "nextdoor"],
    createdDate: "2026-02-17",
    updatedDate: "2026-02-17"
  },
  
  // BACKLOG
  {
    id: "18",
    title: "Newsletter Content Pipeline Launch",
    description: "Full launch: Zootown + Eats & Treats + Doggy",
    category: "Content",
    status: "Backlog",
    priority: "Med",
    tags: ["launch", "pipeline"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "19",
    title: "Sponsor Opportunity Detection",
    description: "5-step scoring for every newsletter topic",
    category: "Revenue",
    status: "Backlog",
    priority: "Med",
    tags: ["sponsor", "scoring"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "20",
    title: "Article Creation Workflow",
    description: "400-word everyday + 800-word hubs using SEO blueprint",
    category: "Content",
    status: "Backlog",
    priority: "Med",
    tags: ["workflow", "seo"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  }
];
