export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export const getIdFromSlug = (slug: string): string | null => {
  return slug.match(/^\d+/)?.[0] ?? null;
};

export const formatDate = (date: string) => {
  const dateParsed = Date.parse(date);
  const formatter = new Intl.DateTimeFormat("cs-CZ", { dateStyle: "long" });
  return formatter.format(dateParsed);
};

export const formatUrl = (url: string) => {
  const urlParsed = URL.parse(url);
  return urlParsed?.host;
};
