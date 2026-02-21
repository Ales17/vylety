import { z } from "zod";
import { findArticles } from "@/service/strapiService";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ArticleGrid from "../components/ArticleGrid";
interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const PageParamSchema = z.coerce
    .number()
    .int()
    .positive()
    .default(1)
    .catch(1);

  const pageParam = (await searchParams).page;
  const currentPage = PageParamSchema.parse(pageParam);

  const posts = await findArticles({ page: currentPage, pageSize: 2 });
  let totalPosts;
  if (posts.meta.pagination) {
    totalPosts = posts.meta.pagination?.total;
  }
  console.log(posts);
  return (
    <div>
      {totalPosts && totalPosts > 0 ? (
        <div>
          <ArticleGrid articlesResponse={posts} />
        </div>
      ) : (
        <div>Příspěvky nenalezeny</div>
      )}
    </div>
  );
}
