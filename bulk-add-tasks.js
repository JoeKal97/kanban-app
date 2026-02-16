// Paste this into browser console (F12) on the Kanban board page to add all tasks

const tasks = [
  // DONE
  { title: "Zamurai Keyword Bootcamp", description: "Learned 7 keyword types + monetization framework", priority: "High", tags: "learning,keywords", column: "Done" },
  { title: "DFY Suite Research", description: "Research complete, SKILL.md created (18KB)", priority: "High", tags: "integration,skill", column: "Done" },
  { title: "On-Page SEO Blueprint", description: "Transcribed video (17K chars), absorbed teaching (10 steps + 4 profit techniques)", priority: "High", tags: "learning,seo", column: "Done" },
  { title: "Global Control Center Research", description: "Research complete, SKILL.md created (47KB)", priority: "High", tags: "integration,skill", column: "Done" },
  { title: "GitHub kanban-app Repo", description: "Created & pushed code to GitHub", priority: "High", tags: "infrastructure", column: "Done" },
  { title: "Vercel Deployment", description: "Kanban app deployed and live", priority: "High", tags: "infrastructure", column: "Done" },

  // IN PROGRESS
  { title: "PopLinks + Affiliate Hybrid Strategy", description: "Multi-page intent-based funnel (review, decision, bonus, how-to)", priority: "High", tags: "poplinks,strategy", column: "In Progress" },
  { title: "Claude API Cost Optimization", description: "Reduce spending from $95 baseline. Implement: no sub-agents, lean context, batch work, Haiku default", priority: "Med", tags: "ops,cost", column: "In Progress" },

  // REVIEW (waiting on Joe)
  { title: "Find VideoChief & MyVideoSpy Affiliate Links", description: "Get tracking URLs for both products. Not found in DFY materials yet.", priority: "High", tags: "affiliate,poplinks", column: "Review" },
  { title: "Decide: Email Platform (GCC vs ConvertKit vs ActiveCampaign)", description: "Choose email provider for PopLinks nurture sequences", priority: "High", tags: "poplinks,infrastructure", column: "Review" },
  { title: "Choose Social Agency 360 Bump Offer", description: "Select or create bump offer for JVZoo funnel", priority: "High", tags: "poplinks,affiliate", column: "Review" },

  // PLANNED
  { title: "Build PopLinks Sales Pages (4 Intent Angles)", description: "Review, Decision, Bonus, How-To pages using Zamurai framework", priority: "High", tags: "poplinks,content", column: "Planned" },
  { title: "GCC + PopLinks Integration", description: "Map how Global Control Center connects to PopLinks email automation", priority: "High", tags: "integration,poplinks", column: "Planned" },
  { title: "Email Nurture Sequences", description: "Build 5-email sequences for bump offer + main product", priority: "High", tags: "email,poplinks", column: "Planned" },
  { title: "Missoula Eats & Treats Keywords", description: "Research keywords + pillars for restaurant/food newsletter", priority: "Med", tags: "content,newsletter", column: "Planned" },
  { title: "Save Our Doggy Keywords", description: "Research keywords + pillars for pet adoption newsletter", priority: "Med", tags: "content,newsletter", column: "Planned" },
  { title: "DFY Suite Campaign Automation", description: "Build Letterman → DFY pipeline (100 links, 21-day drip, indexer)", priority: "Med", tags: "dfy,automation", column: "Planned" },

  // BACKLOG
  { title: "Newsletter Content Pipeline Launch", description: "Full launch: Zootown + Eats & Treats + Save Our Doggy", priority: "Med", tags: "newsletter,launch", column: "Backlog" },
  { title: "Sponsor Opportunity Detection", description: "5-step scoring for every newsletter topic", priority: "Med", tags: "newsletter,monetization", column: "Backlog" },
  { title: "Article Creation Workflow", description: "400-word everyday + 800-word hubs using on-page SEO blueprint", priority: "Med", tags: "content,seo", column: "Backlog" },
];

// Get existing tasks
const existing = JSON.parse(localStorage.getItem('kanban-tasks') || '[]');

// Add new tasks with unique IDs
const newTasks = tasks.map(t => ({
  id: Date.now().toString() + Math.random(),
  ...t,
  createdDate: new Date().toISOString().split('T')[0],
  updatedDate: new Date().toISOString().split('T')[0],
}));

// Combine and save
const allTasks = [...existing, ...newTasks];
localStorage.setItem('kanban-tasks', JSON.stringify(allTasks));

console.log(`✓ Added ${newTasks.length} tasks. Refresh page to see them.`);
location.reload();
