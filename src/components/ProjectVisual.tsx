import crm from "@/assets/crm.jpg";
import ai from "@/assets/hooze-ai.jpg";
import rag from "@/assets/rag.jpg";
const images = { crm, ai, rag };
export function ProjectVisual({
  image,
  alt,
  className = "",
}: {
  image: keyof typeof images;
  alt: string;
  className?: string;
}) {
  return (
    <figure className="relative overflow-hidden bg-secondary">
      <img
        src={images[image]}
        alt={alt}
        width={1600}
        height={1104}
        loading="lazy"
        className={`w-full object-cover ${className}`}
      />
      <figcaption className="absolute bottom-0 left-0 bg-background/90 px-3 py-2 font-mono text-[0.62rem] uppercase text-muted-foreground">
        Illustrative system view
      </figcaption>
    </figure>
  );
}
