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
    title: "Synthesia Affiliate Funnel Build",
    description: "Multi-page intent-based funnel for AI video creation",
    details: "PIVOTED from VideoChief to Synthesia (approved 2/17/26)\n\nFunnel Architecture:\n- Page 1: Synthesia Review ($22-30/mo) - AI video creation tool\n- Page 2: Bonus Offer - Templates/scripts bundle\n- Page 3: Email Nurture - AI video tips sequence\n\nCopy Status: Need to adapt from VideoChief scripts\n\nBLOCKERS:\n- Email platform decision (ConvertKit vs Mailchimp)\n- Bonus offer creation (templates bundle)\n- Need tracking URL from Synthesia",
    category: "Revenue",
    status: "In Progress",
    priority: "High",
    tags: ["funnel", "synthesia"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-17"
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
    title: "Get Synthesia Tracking URL & Commission Details",
    description: "Obtain affiliate link and commission structure from Synthesia",
    details: "Synthesia approved 2/17/26!\n\nNeed:\n1. Unique affiliate tracking URL\n2. Commission structure (likely 20-30% recurring)\n3. Cookie duration\n4. Any promotional assets (banners, logos)\n5. Terms & restrictions\n\nACTION: Check Synthesia affiliate dashboard or contact affiliate manager\n\nBLOCKING: Cannot build PopLinks pages without tracking URL",
    category: "Revenue",
    status: "Review",
    priority: "High",
    tags: ["affiliate", "synthesia"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-17"
  },
  {
    id: "10",
    title: "Decide: Email Platform",
    description: "Choose email provider for PopLinks nurture",
    details: "Options:\n1. ConvertKit - Creator-friendly, automation features\n2. Mailchimp - Established, good integrations\n3. ActiveCampaign - Advanced automation\n\nNEED: Platform that supports:\n- Tag-based automation\n- Bump offer sequences\n- Affiliate link tracking\n\nBLOCKING: Email nurture sequence setup - cannot write emails without platform decision",
    category: "Platform",
    status: "Review",
    priority: "High",
    tags: ["decision", "blocked"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-14"
  },
  {
    id: "11",
    title: "Create Synthesia Bonus Offer (Templates Bundle)",
    description: "Build valuable bonus for Synthesia funnel bump",
    details: "Bonus Package Ideas:\n1. 'Local Business Video Scripts' - 20 pre-written scripts\n2. 'AI Video Templates' - Canva-style templates for Synthesia\n3. 'Video Ad Swipe File' - High-converting video ad examples\n4. 'Synthesia Quick Start Guide' - PDF guide\n\nDelivery: Digital download via Gumroad or direct email\nValue Anchor: $97-197 (sold for $27-47 as bump)\n\nBLOCKING: Need to create digital products",
    category: "Revenue",
    status: "Review",
    priority: "High",
    tags: ["offer", "synthesia"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-17"
  },
  
  // READY (was Planned)
  {
    id: "12",
    title: "Build Synthesia PopLinks Pages (4 Intent Angles)",
    description: "Review, Decision, Bonus, How-To pages for AI video tool",
    details: "Page Strategy (adapt from VideoChief scripts):\n\n1. REVIEW Page: 'Synthesia Review 2026'\n   - Honest review with pros/cons\n   - Demo video/screenshots\n   - Affiliate CTA\n\n2. DECISION Page: 'Best AI Video Tool?'\n   - Compare Synthesia vs alternatives\n   - Position as #1 choice\n   - Scarcity/urgency\n\n3. BONUS Page: 'Synthesia + Templates Bundle'\n   - Main offer + bonus package\n   - Value stacking\n\n4. HOW-TO Page: 'How to Create Videos with AI'\n   - Tutorial angle\n   - Soft pitch at end\n\nStatus: Scripts need adaptation from VideoChief copy",
    category: "Revenue",
    status: "Ready",
    priority: "High",
    tags: ["funnel", "synthesia"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-17"
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
    title: "Synthesia Email Nurture Sequence",
    description: "Build 5-email sequence for AI video tips + soft pitch",
    details: "Email Sequence Flow:\n\nEmail 1: 'Your AI Video Quick Start Guide'\n- Deliver bonus (if they got it)\n- Welcome + set expectations\n\nEmail 2: '3 Local Businesses Killing It with Video'\n- Case studies/examples\n- Soft mention of Synthesia\n\nEmail 3: 'The $5 Video Ad Framework'\n- Valuable tactic\n- Synthesia makes this easy\n\nEmail 4: 'Behind the Scenes: My Video Setup'\n- Show your workflow\n- Direct Synthesia pitch\n\nEmail 5: 'Last Chance: Synthesia Bonus Expires'\n- Urgency/scarcity\n- Final CTA\n\nStatus: Need email platform first (ConvertKit/Mailchimp)",
    category: "Revenue",
    status: "Ready",
    priority: "High",
    tags: ["email", "synthesia"],
    createdDate: "2026-02-14",
    updatedDate: "2026-02-17"
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
    id: "28",
    title: "Synthesia Content Ecosystem Build",
    description: "Create supporting content for Synthesia affiliate funnel",
    details: "Content Pillars for Synthesia SEO + Traffic:\n\n1. REVIEW Article: 'Synthesia Review 2026: Best AI Video Tool?'\n   - Target: 'synthesia review', 'ai video generator review'\n   - 800-word pillar with screenshots\n   - Strong affiliate CTA\n\n2. COMPARISON: 'Synthesia vs [Competitors]'\n   - Target: 'synthesia vs heygen', 'best ai video tool'\n   - Position Synthesia as winner\n\n3. TUTORIAL: 'How to Create Professional Videos with AI'\n   - Target: 'how to make ai videos', 'ai video tutorial'\n   - Step-by-step with Synthesia\n\n4. LISTICLE: '10 Ways Local Businesses Use AI Video'\n   - Target: 'ai video marketing', 'video marketing ideas'\n   - Missoula business examples\n\n5. YOUTUBE: Screen recording tutorials\n   - Synthesia walkthrough\n   - Tips & tricks\n\nPurpose: Drive organic traffic to PopLinks pages",
    category: "Content",
    status: "Backlog",
    priority: "Med",
    tags: ["content", "synthesia", "seo"],
    createdDate: "2026-02-17",
    updatedDate: "2026-02-17"
  },
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
