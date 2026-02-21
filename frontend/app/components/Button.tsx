interface Props extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  label: string;
  variant?: "primary" | "secondary" | "danger";
}

const colors: Record<string, string> = {
  primary: "bg-slate-900 text-white  hover:bg-slate-800 active:scale-95",
  secondary: "text-white bg-amber-400",
};
export default function Button({
  onClick,
  onMouseOver,
  type,
  label,
  variant = "primary",
}: Props) {
  const activeVariantClass = colors[variant];
  const baseDesignClasses =
    "p-2 rounded-2xl font-medium transition-all shadow-sm";

  return (
    <>
      <button
        className={`${activeVariantClass} ${baseDesignClasses}`}
        onClick={onClick ? onClick : undefined}
        onMouseOver={onMouseOver}
        type={type ? type : undefined}
      >
        {label}
      </button>
    </>
  );
}
