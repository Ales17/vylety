import { ArticlesResponse } from "@/service/strapiService";
import { formatDate } from "@/lib/strings";
import LinkButton from "./LinkButton";
import { ArrowRightIcon } from "lucide-react";
import Pagination from "./Pagination";

interface Props {
  articlesResponse: ArticlesResponse;
}

export default function ArticleGrid({ articlesResponse }: Props) {
  const articles = articlesResponse.data;
  const pagination = articlesResponse.meta.pagination;
  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-2 md:grid-cols-2">
        {articles.map((doc) => {
          return (
            <div
              key={doc.id}
              className="border rounded-3xl bg-white border-slate-200 p-2 md:p-4 flex flex-col gap-2"
            >
              <h2 className="text-2xl">{doc.title}</h2>
              <p title="Datum vytvoření příspěvku">
                {formatDate(doc.createdAt)}
              </p>
              <div className="line-clamp-2 flex-1">{doc.description} </div>
              <div>
                <LinkButton
                  href={`/posts/${doc.slug}`}
                  label={"Přečíst"}
                  icon={<ArrowRightIcon />}
                />
              </div>
            </div>
          );
        })}
      </div>
      {pagination && (
        <Pagination
          baseUrl={"/"}
          totalPages={pagination.pageCount}
          currentPage={pagination.page}
        />
      )}
    </div>
  );
}
