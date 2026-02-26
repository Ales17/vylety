import { formatDate } from "@/lib/strings";

interface Props {
  children: React.ReactNode;
  pageName: string;
  dateCreated?: string;
  dateUpdated?: string;
}

function DateInfo({ dateCreated, dateUpdated }: { dateCreated: string; dateUpdated: string }) {
    return (
        <p className="mb-2">
            {formatDate(dateCreated)} {(dateUpdated !== dateCreated) && <>(aktualizováno {formatDate(dateUpdated)})</>}
        </p>
    );
}


export default function PageWrapper({ children, pageName, dateCreated, dateUpdated
 }: Props) {
  return (
    <div className=" border rounded-3xl bg-white border-slate-200 p-2 md:p-4">
      <h1 className="text-4xl mb-2">{pageName}</h1>
      {(dateCreated && dateUpdated) && <DateInfo dateCreated={dateCreated} dateUpdated={dateUpdated} />}
      {children}
    </div>
  );
}
