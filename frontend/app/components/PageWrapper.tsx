interface Props {
  children: React.ReactNode;
  pageName: string;
  date?: string;
}
export default function PageWrapper({ children, pageName, date }: Props) {
  return (
    <div className=" border rounded-3xl bg-white border-slate-200 p-2 md:p-4">
      <h1 className="text-4xl mb-2">{pageName}</h1>
      {date && <p>{date}</p>}
      {children}
    </div>
  );
}
