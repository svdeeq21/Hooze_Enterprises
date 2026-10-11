// Content for programmatic landing pages (industries + locations).
// RULES: only state what is true. A city page is indexed and listed in the sitemap
// ONLY when its `localContext` is non-empty; add one only when you have something
// genuinely specific to say about serving that place.

export const UPDATED = "2026-10-11";

/** CONFIRM this is accurate before publishing. Used on every location page. */
export const deliveryModel =
  "Hooze works with businesses across Nigeria. Discovery happens over WhatsApp, calls and shared documents, and systems are delivered remotely, so being outside a major city does not limit what we can build.";

export type Faq = { q: string; a: string };

export type Industry = {
  slug: string;
  name: string;
  h1: string;
  answer: string;
  problems: string[];
  flow: string[];
  limits: string[];
  faqs: Faq[];
  caseSlug?: string; // only where a real deployment exists
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate",
    h1: "WhatsApp sales automation for real estate companies in Nigeria",
    answer:
      "Hooze builds WhatsApp-based sales systems for property companies: they answer enquiries from approved property information, qualify buyers, follow up, escalate to a human when needed and keep every conversation in one record.",
    problems: [
      "Enquiries arrive faster than agents can reply, so buyers go to the next listing.",
      "Follow-ups depend on someone remembering them.",
      "Nobody can see which leads are serious, stalled or never answered.",
      "Property details are repeated manually in every conversation.",
    ],
    flow: [
      "A buyer messages on WhatsApp.",
      "The system answers from approved property and business information.",
      "It collects budget, location and intent in the conversation.",
      "Follow-up runs on rules your team sets; hard cases go to a person.",
      "Your team reviews qualified leads and books inspections.",
    ],
    limits: [
      "Human agents still handle negotiation, pricing decisions and closing.",
      "The system can only answer from information you approve.",
    ],
    faqs: [
      {
        q: "Has Hooze built this for a real estate company?",
        a: "Yes. Hooze deployed a WhatsApp sales system for Praise Dynasty Realty in Abuja. The case study explains what was built and where it stands.",
      },
      {
        q: "Does it replace our sales agents?",
        a: "No. It handles first response, qualification and follow-up so agents spend time on serious buyers.",
      },
    ],
    caseSlug: "praise-dynasty-whatsapp-sales-system",
  },
  {
    slug: "caterers",
    name: "Caterers",
    h1: "Order and enquiry automation for caterers in Nigeria",
    answer:
      "Caterers get enquiries on WhatsApp at all hours. Hooze can set up a system that collects the event date, guest count, venue and budget, gives consistent information for quotes, and reminds you to follow up before the lead goes cold.",
    problems: [
      "Event details arrive piecemeal across voice notes and messages.",
      "Quote follow-ups are forgotten during busy event weeks.",
      "Deposits, dates and menu choices live in chat history instead of one place.",
    ],
    flow: [
      "A customer enquires on WhatsApp.",
      "The system asks for date, guests, venue and budget.",
      "Details are saved to a sheet or dashboard you control.",
      "You approve the quote; reminders run until the customer decides.",
    ],
    limits: [
      "Final quotes, tastings and menu changes stay with you.",
      "Hooze has not published a caterer deployment; this is the same conversational foundation configured for your workflow.",
    ],
    faqs: [
      {
        q: "Can it take orders and track payments?",
        a: "It can record order details and flag payment status. Payment processing is scoped separately.",
      },
    ],
  },
  {
    slug: "event-planners",
    name: "Event planners",
    h1: "Client enquiry and booking automation for event planners in Nigeria",
    answer:
      "Event planners juggle many clients at once. Hooze can automate first response, requirement gathering, follow-up reminders and booking confirmations, so no enquiry or deadline slips.",
    problems: [
      "Every client gives different details in a different order.",
      "Vendor and client follow-ups get lost across chats.",
      "There is no single view of each event's status.",
    ],
    flow: [
      "A client enquires and answers a short brief in chat.",
      "The brief becomes a structured record.",
      "Reminders go out for deposits, vendor confirmations and deadlines.",
      "You see every event's status in one dashboard.",
    ],
    limits: [
      "Creative planning and vendor negotiation stay human.",
      "No published event-planner deployment yet.",
    ],
    faqs: [],
  },
  {
    slug: "schools",
    name: "Schools",
    h1: "Admissions and parent communication automation for schools in Nigeria",
    answer:
      "Schools answer the same admissions and fee questions repeatedly. Hooze can automate common enquiries, collect applicant details, route cases to the right office and keep parents informed through WhatsApp.",
    problems: [
      "Admissions staff repeat the same answers all day.",
      "Applicant details are collected inconsistently.",
      "Parents struggle to get timely updates.",
    ],
    flow: [
      "A parent asks about admission on WhatsApp.",
      "The system answers from approved school information.",
      "It collects applicant details and routes them to admissions.",
      "Staff handle exceptions and decisions.",
    ],
    limits: [
      "Admission decisions and sensitive student matters stay with staff.",
      "No published school deployment yet.",
    ],
    faqs: [],
  },
  {
    slug: "clinics",
    name: "Clinics",
    h1: "Appointment and enquiry automation for clinics in Nigeria",
    answer:
      "Clinics can automate appointment requests, reminders, opening-hours and service enquiries, and route patients to the right department, without putting medical decisions in software.",
    problems: [
      "Reception is overloaded with repeat questions.",
      "Appointments are missed without reminders.",
      "Enquiries sit unanswered outside working hours.",
    ],
    flow: [
      "A patient asks to book on WhatsApp.",
      "The system offers available slots and records the request.",
      "Reminders go out before the appointment.",
      "Reception confirms and handles anything clinical.",
    ],
    limits: [
      "Not for diagnosis or clinical advice.",
      "Patient health data needs careful scoping and consent before any build.",
    ],
    faqs: [],
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    h1: "Operations and enquiry automation for hospitals in Nigeria",
    answer:
      "Hospitals can automate non-clinical work: general enquiries, appointment routing, internal notifications and reporting, with strict limits on handling patient data.",
    problems: [
      "High enquiry volume across many departments.",
      "Manual reporting and internal handoffs.",
      "Information scattered across tools.",
    ],
    flow: [
      "Enquiries are answered from approved information.",
      "Requests are routed to the correct department.",
      "Internal alerts and reports run automatically.",
    ],
    limits: [
      "Clinical decisions are out of scope.",
      "Any work touching patient records needs a separate security and compliance review.",
    ],
    faqs: [],
  },
  {
    slug: "online-sellers",
    name: "Online sellers and retailers",
    h1: "WhatsApp order and follow-up automation for online sellers in Nigeria",
    answer:
      "Sellers who take orders on WhatsApp can automate product questions, order capture, delivery updates and follow-up with customers who went quiet.",
    problems: [
      "Repeated product and price questions.",
      "Orders captured inconsistently.",
      "No follow-up with customers who stopped replying.",
    ],
    flow: [
      "A customer asks about a product.",
      "The system answers from your catalogue and captures the order.",
      "Order details land in a sheet or dashboard.",
      "Follow-up and delivery updates run automatically.",
    ],
    limits: ["Payment handling is scoped separately.", "No published retail deployment yet."],
    faqs: [],
  },
];

export type City = { slug: string; name: string; state: string; localContext: string };

export const cities: City[] = [
  {
    slug: "abuja",
    name: "Abuja",
    state: "Federal Capital Territory",
    localContext:
      "Abuja is where Hooze's live WhatsApp sales deployment for Praise Dynasty Realty runs, so this is the market we know first-hand.",
  },
  { slug: "lagos", name: "Lagos", state: "Lagos State", localContext: "" },
  { slug: "kaduna", name: "Kaduna", state: "Kaduna State", localContext: "" },
  { slug: "lokoja", name: "Lokoja", state: "Kogi State", localContext: "" },
  { slug: "kano", name: "Kano", state: "Kano State", localContext: "" },
  { slug: "port-harcourt", name: "Port Harcourt", state: "Rivers State", localContext: "" },
  { slug: "ibadan", name: "Ibadan", state: "Oyo State", localContext: "" },
  { slug: "enugu", name: "Enugu", state: "Enugu State", localContext: "" },
];

export const cityPublished = (c: City) => c.localContext.trim().length > 0;

/** Questions every page answers, aimed at visitors who don't know where to start. */
export function commonFaqs(scope: string): Faq[] {
  return [
    {
      q: "I'm not sure what in my business can be automated. Where do I start?",
      a: "Start with repetitive work: messages you answer again and again, follow-ups people forget, and information you copy between tools. Our free Business Automation Starter Kit shows how to spot these, or you can describe the problem and we'll tell you honestly whether automation is the right answer.",
    },
    {
      q: `How much does automation for ${scope} cost?`,
      a: "It depends on conversation volume, the tools to connect, workflow complexity and ongoing support. We don't publish a flat price because it would mislead; we scope it after understanding your process.",
    },
    {
      q: "Do I need technical knowledge?",
      a: "No. We design the system around how you already work, test it with you, and hand it over with guidance.",
    },
  ];
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({ "@context": "https://schema.org", ...data }),
  };
}

export function faqLd(faqs: Faq[]) {
  return jsonLd({
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

export function serviceLd(name: string, description: string, url: string) {
  return jsonLd({
    "@type": "Service",
    name,
    description,
    url,
    areaServed: { "@type": "Country", name: "Nigeria" },
    provider: { "@type": "Organization", name: "Hooze Enterprises" },
  });
}
