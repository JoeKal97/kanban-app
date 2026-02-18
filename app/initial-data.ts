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
    details: "PIVOTED from VideoChief to Synthesia (approved 2/17/26)\n\nALREADY COMPLETED (Feb 16):\n- Synthesia research & commission structure (25% recurring, $267/customer)\n- Competitor analysis (Synthesia > HeyGen, Opus Clip, Descript, Runway)\n- Lead magnet strategy: 'AI Video Playbook' - 5 video series + PDF\n- All 5 video scripts WRITTEN and approved by Joe\n- Avatar strategy for Jessie Eagen real estate partnership\n- Synthesia account setup plan ($264/year Starter plan)\n\nPENDING:\n- Film 5 playbook videos (scripts ready)\n- Get Synthesia tracking URL (affiliate dashboard)\n- Build PopLinks pages (4 intent angles)\n- Set up Course Sprout for lead magnet delivery\n- Create email nurture sequence\n\nBLOCKERS:\n- Email platform decision (ConvertKit vs Mailchimp)\n\nReference: VIDEOCHIEFMYVIDESPY-COPY-SEQUENCES.md (adapt this copy)",
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
  
  // DONE
  {
    id: "9",
    title: "Get Synthesia Tracking URL & Commission Details",
    description: "Obtain affiliate link and commission structure from Synthesia",
    details: "✅ COMPLETED 2/17/26 at 11:41 PM\n\n**Synthesia Affiliate Link:**\nhttps://www.synthesia.io/?via=balboa\n\n**Commission Structure:**\n- 25% recurring commission\n- ~$267 per customer LTV\n- 60-day cookie\n\n**Action:** Use this link in all marketing materials\n\n**Status:** Ready to deploy in PopLinks pages and email sequences",
    category: "Revenue",
    status: "Done",
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
  // REVIEW
  {
    id: "29",
    title: "OPUS CLIP Affiliate Approval & Strategy",
    description: "Get approved for Opus Clip and build secondary email sequence",
    details: "✅ AFFILIATE LINK ACQUIRED 2/17/26 at 11:41 PM\n\n**Opus Clip Affiliate Link:**\nhttps://www.opus.pro/?via=balboa\n\n**Why Opus Clip:**\n- 25% commission (~$25/customer)\n- Different use case: Repurposes long videos into shorts\n- Complements Synthesia (create → repurpose)\n- Organic traffic only (NO paid ads allowed)\n\n**Positioning:**\n'Synthesia creates your videos. Opus Clip turns one video into 10+ shorts for TikTok/Instagram/YouTube Shorts.'\n\n**Sequence Strategy:**\n- Phase 1: 5-email Synthesia sequence (immediate upon signup)\n- Phase 2: 3-email Opus Clip sequence (after Synthesia sequence completes)\n\n**Email 1 (Day 1 after Synthesia seq):** 'The Multi-Platform Video Strategy'\n- Why you need short-form content too\n- The 1-to-10 content multiplier concept\n\n**Email 2 (Day 3):** 'How I Turn One Video Into 10+ Pieces of Content'\n- Show the workflow\n- Introduce Opus Clip as the tool\n\n**Email 3 (Day 5):** 'Complete Video Workflow: Synthesia + Opus Clip'\n- Full system overview\n- CTA for Opus Clip\n\n**Status:** Ready to build 3-email sequence\n**Next Action:** Write 3 Opus Clip emails",
    category: "Revenue",
    status: "Review",
    priority: "Med",
    tags: ["affiliate", "opus-clip", "sequence"],
    createdDate: "2026-02-17",
    updatedDate: "2026-02-17"
  },
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
