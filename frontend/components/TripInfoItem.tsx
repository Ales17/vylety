import { ExternalLinkIcon } from "lucide-react";
interface Props {
  icon: React.ReactNode;
  label: React.ReactNode;
  href?: string;
  title?: string;
}

interface ConditionalWrapperProps {
  children: React.ReactNode;
  href?: string;
}

const ConditionalWrapper = ({ children, href }: ConditionalWrapperProps) => {
  if (href) {
    return (
      <a target="_blank" rel="noopener nofollow noreferrer" href={href}>
        {children}
      </a>
    );
  } else {
    return children;
  }
};

export default function TripInfoItem({ icon, label, title = "", href }: Props) {
  const className = `${href ? "hover:bg-slate-200" : ""} flex 
  bg-slate-100 px-3 py-1.5 rounded-md gap-x-2 
  items-center transition-colors border border-slate-200`;
  return (
    <li title={title}>
      <ConditionalWrapper href={href}>
        <div className={className}>
          <span className="text-slate-500">{icon}</span>
          <span>{label}</span> {href && <ExternalLinkIcon size={16} />}
        </div>
      </ConditionalWrapper>
    </li>
  );
}
