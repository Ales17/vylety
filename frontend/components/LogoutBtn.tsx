"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import Button from "./Button";
export default function LogoutBtn() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={async () => {
          const { error } = await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login");
              },
            },
          });
        }}
        label={"Odhlásit se"}
      />
    </>
  );
}
