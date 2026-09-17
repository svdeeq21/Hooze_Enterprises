export const site = {
  name: "Hooze",
  fullName: "Hooze Enterprises",
  email: "hoozeenterprises@gmail.com",
  whatsapp: "+2349150754870",
  whatsappHref: "https://wa.me/2349150754870",
  tagline: "Builders of the 1%",
  location: "Nigeria",
};

export const nav = [
  { label: "Solutions", to: "/solutions" as const },
  { label: "Work", to: "/work" as const },
  { label: "About", to: "/about" as const },
  { label: "Free Guide", to: "/get-the-guide" as const },
];

export const solutions = [
  {
    id: "01",
    title: "Custom software",
    slug: "custom-software",
    summary:
      "Applications, internal tools, dashboards and platforms shaped around the way your business actually works.",
    items: ["Internal systems", "Customer portals", "Dashboards", "APIs"],
  },
  {
    id: "02",
    title: "Business automation",
    slug: "business-automation",
    summary:
      "Connected workflows that remove repetitive work, prevent missed handoffs and keep information moving.",
    items: ["Workflow automation", "Integrations", "Notifications", "Data movement"],
  },
  {
    id: "03",
    title: "Intelligent systems",
    slug: "intelligent-systems",
    summary:
      "AI, retrieval and decision-support systems used only where they make the operation meaningfully better.",
    items: ["AI agents", "Document intelligence", "Retrieval systems", "Decision support"],
  },
  {
    id: "04",
    title: "Digital products",
    slug: "digital-products",
    summary:
      "Focused websites, web applications and product interfaces built to become reliable business assets.",
    items: ["Web applications", "SaaS products", "Interfaces", "Product builds"],
  },
];

export type Project = {
  slug: string;
  name: string;
  label: string;
  status: string;
  year: string;
  headline: string;
  problem: string;
  approach: string;
  built: string;
  outcome: string;
  image: "crm" | "ai" | "rag";
};

export const projects: Project[] = [
  {
    slug: "praise-dynasty-whatsapp-sales-system",
    name: "Praise Dynasty Realty",
    label: "Client deployment",
    status: "Production",
    year: "2025",
    headline: "Turning WhatsApp enquiries into an organised, visible sales process.",
    problem:
      "Property enquiries arrived through WhatsApp, but follow-up, qualification and pipeline visibility depended on manual effort.",
    approach:
      "Hooze treated WhatsApp as the sales environment—not an add-on—and designed the workflow around how the team already sold.",
    built:
      "A conversational sales system with lead qualification, conversation memory, property retrieval, follow-up, escalation and human handoff.",
    outcome:
      "Deployed in Abuja with a working dataset of roughly 220 leads and 7,293 messages. The system has been tested through real production use and debugging.",
    image: "crm",
  },
  {
    slug: "hooze-ai",
    name: "Hooze AI",
    label: "Hooze product",
    status: "Active development",
    year: "2025",
    headline: "A reusable operating layer for WhatsApp-based property sales.",
    problem:
      "Sales conversations hold valuable intent and context, yet conventional systems often leave them trapped in an inbox.",
    approach:
      "Generalise the lessons from a live client deployment into a repeatable system without pretending every business has the same workflow.",
    built:
      "Conversational intake, property retrieval, qualification logic, booking and structured state that progresses with each conversation.",
    outcome:
      "The working CRM concept became a product direction Hooze owns and continues to develop.",
    image: "ai",
  },
  {
    slug: "studyapp",
    name: "StudyApp",
    label: "Applied AI",
    status: "Prototype",
    year: "2025",
    headline: "Making dense study material retrievable at the moment it is needed.",
    problem:
      "Learning material is usually stored, but not structured for useful retrieval and explanation.",
    approach: "Use semantic retrieval to surface relevant context before generating an answer.",
    built:
      "A full-stack adaptive study application using vector search, embeddings and retrieval-grounded responses.",
    outcome:
      "A working demonstration of Hooze’s retrieval and semantic-search capability across another domain.",
    image: "rag",
  },
];

export const process = [
  ["01", "Understand", "Study the workflow, tools, bottlenecks and desired outcome."],
  ["02", "Decide", "Choose automation, software, intelligence—or a simpler answer."],
  ["03", "Design", "Define the system, integrations, risks and scope before building."],
  ["04", "Build", "Develop and test against agreed requirements, not assumptions."],
  ["05", "Launch", "Ship the system, transfer ownership and improve from real use."],
];
