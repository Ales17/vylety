import { formatDate } from "@/lib/strings";
import { ClockIcon } from "lucide-react";
interface Props {
  children: React.ReactNode;
  pageName: string;
  dateCreated?: string;
  dateUpdated?: string;
}

function DateInfo({
  dateCreated,
  dateUpdated,
}: {
  dateCreated: string;
  dateUpdated: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
      <ClockIcon size={16} />
      <p>
        {formatDate(dateCreated)}
        {dateUpdated !== dateCreated && (
          <> (aktualizováno {formatDate(dateUpdated)})</>
        )}
      </p>
    </div>
  );
}

export default function PageWrapper({
  children,
  pageName,
  dateCreated,
  dateUpdated,
}: Props) {
  return (
    <div className=" border rounded-3xl bg-white border-slate-200 p-2 md:p-4">
      <h1 className="text-4xl mb-2">{pageName}</h1>
      {dateCreated && dateUpdated && (
        <DateInfo dateCreated={dateCreated} dateUpdated={dateUpdated} />
      )}
      {children}
    </div>
  );
}
