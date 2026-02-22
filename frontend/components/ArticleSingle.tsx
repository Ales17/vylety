import { SingleArticleResponse } from "@/service/strapiService";
import { MapIcon, Calendar1Icon, FootprintsIcon } from "lucide-react";

import TripInfoItem from "./TripInfoItem";
import { formatDate } from "@/lib/strings";
import PhotoGallery from "./PhotoGallery";
interface Props {
  article: SingleArticleResponse;
}
export default function ArticleSingle({ article }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      {(article.tripLength || article.mapsLink || article.tripDate) && (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {article.tripDate && (
            <TripInfoItem
              title="Datum akce"
              icon={<Calendar1Icon />}
              label={formatDate(article.tripDate)}
            />
          )}
        </ul>
      )}
      <div>{article.text}</div>
      {article.photoGallery && <PhotoGallery images={article.photoGallery} />}
    </div>
  );
}
