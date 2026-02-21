import { strapi } from "@strapi/client";

const client = strapi({
  baseURL: "http://localhost:1337/api",
  auth: process.env.STRAPI_API_TOKEN,
});

export const findArticles = async ({
  limit = 10,
  page,
  isDraft = false,
  pageSize = 10,
}: {
  limit?: number;
  page: number;
  isDraft?: boolean;
  pageSize?: number;
}) => {
  const articles = client.collection("articles");
  const allArticles = await articles.find({
    sort: "title",
    pagination: { page: page, pageSize: pageSize },
  });

  return allArticles;
};

export const findArticleById = async (slug: string) => {
  const articles = client.collection("articles");
  const result = await articles.find({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "*",
  });
  return result.data[0] ?? null;
};

export type ArticlesResponse = Awaited<ReturnType<typeof findArticles>>;
export type SingleArticleResponse = Awaited<ReturnType<typeof findArticleById>>;
