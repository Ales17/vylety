import ArticleSingle from "@/components/ArticleSingle";
import PageWrapper from "@/components/PageWrapper";
import { getIdFromSlug } from "@/lib/strings";
import { findArticleById } from "@/service/strapiService";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  const { slug } = await params;

  //   const entityId = getIdFromSlug(slug);

  //   if (entityId == null) {
  //     return <>Neplatný odkaz</>;
  //   }

  const article = await findArticleById(slug);
  console.log(article);
  return (
    <PageWrapper pageName={article.title} date={article.createdAt}>
      <ArticleSingle article={article} />
    </PageWrapper>
  );
}
