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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await findArticleById(slug);
  return {
    title: `${article?.title || "Příspěvek"} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
  };
}

export default async function Page({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  const { slug } = await params;

  const article = await findArticleById(slug);
  console.log(article);

  if (!article) {
    return <PageWrapper pageName="Chyba">Článek nenalezen.</PageWrapper>;
  }

  return (
    <PageWrapper
      pageName={article.title}
      dateCreated={article.createdAt}
      dateUpdated={article.updatedAt}
    >
      <ArticleSingle article={article} />
    </PageWrapper>
  );
}
