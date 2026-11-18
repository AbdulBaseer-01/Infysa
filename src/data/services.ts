export type Service = {
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  deliverables: string[];
  fit: string;
};

export const services: Service[] = [
  {
    number: "01",
    slug: "digital-marketing",
    title: "Digital marketing",
    shortDescription:
      "Turn attention into momentum with focused strategy, content, and campaigns built around your next stage of growth.",
    description:
      "Digital marketing should do more than fill a content calendar. We build focused marketing systems around your audience, offer, and goals so every channel has a clear job.",
    deliverables: [
      "Marketing strategy and channel planning",
      "Campaign concepts and creative direction",
      "Content planning and production guidance",
      "Performance measurement and iteration",
    ],
    fit: "For teams that want more focus, consistency, and useful signals from their marketing.",
  },
  {
    number: "02",
    slug: "websites",
    title: "Websites & landing pages",
    shortDescription:
      "Make every click count with fast, clear digital experiences that explain your value and move people to act.",
    description:
      "Your website is where interest becomes action. We shape the story, structure, and experience around what your audience needs to understand and do next.",
    deliverables: [
      "Website and landing page strategy",
      "Information architecture and user journeys",
      "Responsive interface design and development",
      "Conversion-focused content structure",
    ],
    fit: "For businesses launching, repositioning, or ready for a digital experience that works harder.",
  },
  {
    number: "03",
    slug: "creative-branding",
    title: "Creative & branding",
    shortDescription:
      "Build a brand people remember with a distinct identity and creative direction that feels unmistakably yours.",
    description:
      "A strong brand makes good businesses easier to recognise and choose. We turn your difference into a clear, flexible identity that can grow across every touchpoint.",
    deliverables: [
      "Brand positioning and messaging direction",
      "Visual identity systems",
      "Creative direction and campaign concepts",
      "Brand guidelines and rollout support",
    ],
    fit: "For businesses creating a new identity or making an existing one clearer, sharper, and more useful.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
