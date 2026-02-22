import Image from "next/image";
import { GalleryItem } from "@/types/GalleryItem";
interface GalleryProps {
  images: GalleryItem[];
}

export default function PhotoGallery({ images }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((item) => {
        const img = item;

        return (
          <div
            key={item.id}
            className="relative aspect-video overflow-hidden rounded-lg"
          >
            <img
              src={process.env.STRAPI_API_URL + img.url!}
              width={img.width!}
              height={img.height!}
              alt={img.alt || ""}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
