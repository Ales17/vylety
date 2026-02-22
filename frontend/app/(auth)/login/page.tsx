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
}

function MessageBox({ text, closeFun }: MessageBoxProps) {
  return (
    <div className="flex justify-between border rounded bg-red-300 my-2">
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

  return (
    <div className="border-gray-400 rounded w-screen md:w-1/3 bg-white p-2.5">
      <h1>LOGIN</h1>
      <div>
        <input
          className="border border-2 border-slate-300"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={async () => {
            const { error, data } = await authClient.signIn.magicLink({
              email: email,
            });
          }}
        >
          Přihlásit se
        </button>
      </div>
    </div>
  );
}
