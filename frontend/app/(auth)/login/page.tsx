"use client";
import { SyntheticEvent, useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { authClient } from "@/lib/authClient";
import z from "zod";
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

const Form = z.object({
  email: z.email(),
});

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [msg, setMsg] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const resetMessageBox = () => {
    setMsg("");
    setIsMessageVisible(false);
  };

  const activateMessage = (text: string) => {
    setMsg(text);
    setIsMessageVisible(true);
  };

  const handleLoginBtn = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Don't allow if in cooldown
    if (cooldown > 0) return;

    setIsLoading(true);
    resetMessageBox();

    const result = Form.safeParse({ email: email });
    if (result.success == false) {
      setIsLoading(false);
      activateMessage("Chybný formát e-mailu.");
      return;
    }
    const { error } = await authClient.signIn.magicLink({
      email: email,
    });
    if (error) {
      activateMessage("Nastala chyba.");
      setCooldown(5); // Longer on error
    } else {
      activateMessage("Odeslán přihlašovací email.");
      setCooldown(2); // Shorter on success
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white flex flex-col w-full">
      <h1 className="mb-2 text-center">Přihlášení</h1>
      {isMessageVisible && (
        <MessageBox text={msg} closeFun={() => resetMessageBox()} />
      )}
      <div>
        <label htmlFor="email" className="mb-2">
          E-mail
        </label>
      </div>
      <div>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jan@novak.cz"
          id="email"
          name="email"
        />
      </div>
      <div>
        <Button
          label="Přihlásit se"
          onClick={handleLoginBtn}
          disabled={isLoading || cooldown > 0}
        />
      </div>
    </div>
  );
}
