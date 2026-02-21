import Link from "next/link";
import type { Url } from "next/dist/shared/lib/router/router";
interface Props {
  href: Url;
  label: string;
  icon?: React.ReactNode;
}

export default function LinkButton({ href, label, icon }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex gap-x-1.5 hover:gap-x-3 py-2 px-2 bg-slate-900 text-white rounded-2xl font-medium transition-all hover:bg-slate-800 active:scale-95 shadow-sm"
    >
      <span>{label}</span> {icon && <span>{icon}</span>}
    </Link>
  );
}
