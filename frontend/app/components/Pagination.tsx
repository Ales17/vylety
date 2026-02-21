import Link from "next/link";
interface Props {
  totalPages: number;
  currentPage: number;
  baseUrl?: string;
}
export default function Pagination({
  totalPages,
  currentPage,
  baseUrl = "/",
}: Props) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const className =
    "p-4 border hover:bg-slate-200 border-slate-200 rounded-full inline-flex bg-slate-100";
  return (
    <ul className="flex gap-1">
      {pageNumbers.map((p) => (
        <li key={p}>
          <Link
            className={`${className} ${p == currentPage ? "font-bold" : ""}`}
            href={{ pathname: baseUrl, query: { page: p } }}
          >
            {p}
          </Link>
        </li>
      ))}
    </ul>
  );
}
