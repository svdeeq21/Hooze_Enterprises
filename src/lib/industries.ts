import realEstateImage from "@/assets/hooze-industry-real-estate.webp";
import hospitalityImage from "@/assets/hooze-industry-hospitality.webp";
import educationImage from "@/assets/hooze-industry-education.webp";

/**
 * Primary markets: where the WhatsApp-first sales approach fits best.
 * Real estate is the only sector with a live deployment today. `image: null` renders a
 * typographic panel instead of a photo (there is no retail photograph in the asset set).
 */
export type Industry = {
  title: string;
  category: string;
  challenge: string;
  solution: string;
  image: string | null;
  alt: string;
  deployed?: boolean;
};

export const industries: Industry[] = [
  {
    title: "Real estate",
    category: "PROPERTY & DEVELOPMENT",
    challenge:
      "Property enquiries arrive throughout the day. Agents need to identify serious buyers, share relevant properties and keep follow-ups from going cold.",
    solution: "Give each conversation a clear path from first question to inspection.",
    image: realEstateImage,
    alt: "A sunlit modern apartment overlooking a city skyline",
    deployed: true,
  },
  {
    title: "Schools & education",
    category: "SCHOOLS & EDUCATION",
    challenge:
      "Admissions teams repeatedly answer questions about fees, programmes, requirements and application processes.",
    solution: "Handle the common questions consistently and pass the rest to the right person.",
    image: educationImage,
    alt: "A bright, modern school library and learning space",
  },
  {
    title: "Hospitality & restaurants",
    category: "HOSPITALITY & RESTAURANTS",
    challenge:
      "Staff need to manage booking enquiries, availability questions and customer requests without losing track of conversations.",
    solution: "Keep every request visible, with a clear next step for each guest.",
    image: hospitalityImage,
    alt: "A contemporary restaurant with warm lighting and greenery",
  },
  {
    title: "Retail & commerce",
    category: "RETAIL & COMMERCE",
    challenge:
      "Customers ask about products, prices and availability in chat. Orders and follow-ups slip when messages pile up.",
    solution: "Keep customer context and sales conversations moving together.",
    image: null,
    alt: "",
  },
];

export const additionalSectors = "Professional services and other operations-heavy businesses";
