import { XIcon } from "lucide-react";

interface MessageBoxProps {
  text: string;
  closeFun: any;
  type?: "success" | "error";
}
export default function MessageBox({ text, closeFun, type }: MessageBoxProps) {
  const variants: Record<string, string> = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
  };
  const activeVariantClass = variants[type ? type : "success"];

  return (
    <div
      className={`flex justify-between border rounded-2xl mb-2 ${activeVariantClass}`}
    >
      <div className="p-2">{text}</div>

      <button
        className="text-3xl select-none cursor-default flex justify-self-end-safe px-2 items-center"
        onClick={closeFun}
      >
        <XIcon />
      </button>
    </div>
  );
}
