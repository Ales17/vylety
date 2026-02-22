"use client";
import { useState } from "react";
import { FormLoginState } from "@/types/FormLoginState";
import { XIcon } from "lucide-react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { authClient } from "@/lib/authClient";

interface MessageBoxProps {
  text: string;
  closeFun: any;
  type?: "success" | "error";
}

function MessageBox({ text, closeFun, type }: MessageBoxProps) {
  const variants: Record<string, string> = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
  };
  const activeVariantClass = variants[type ? type : "success"];

  return (
    <div
      className={`flex justify-between border rounded mb-2 ${activeVariantClass}`}
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isMesssageVisible, setIsMessageVisible] = useState(false);

  const resetMessageBox = () => {
    setMsg("");
    setIsMessageVisible(false);
  };

  return (
    <div className="bg-white flex flex-col w-full">
      <h1 className="mb-2">LOGIN</h1>
      {isMesssageVisible && (
        <MessageBox text={msg} closeFun={() => resetMessageBox()} />
      )}
      <div>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Button
          label="Přihlásit se"
          onClick={async () => {
            resetMessageBox();
            const { error, data } = await authClient.signIn.magicLink({
              email: email,
            });
            if (error) {
              setMsg(error.message ? error.message : "Chyba");
              setIsMessageVisible(true);
            } else {
              setMsg("Odeslán přihlašovací email.");
              setIsMessageVisible(true);
            }
          }}
        />
      </div>
    </div>
  );
}
