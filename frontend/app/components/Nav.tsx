"use client";
import { LogOutIcon, HouseIcon } from "lucide-react";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Nav() {
  const router = useRouter();
  const navItemClass =
    "h-full w-full flex py-4 px-2 gap-x-2  hover:bg-slate-200 transition-colors justify-center rounded-4xl";
  return (
    <div className=" m-2 lg:mx-auto lg:max-w-4xl rounded-4xl bg-slate-100/60  border border-slate-200 backdrop-blur-lg">
      <div className="flex flex-col text-center">
        <header className="text-2xl p-2">Výlety</header>
        <nav>
          <ul className="flex md:justify-center w-full">
            <li className="flex grow md:grow-0 ">
              <Link className={navItemClass} href={"/"}>
                <span className="text-slate-500">
                  <HouseIcon />
                </span>
                <span>Domů</span>
              </Link>
            </li>
            <li className="flex grow md:grow-0">
              <button
                className={navItemClass.concat(" ", "cursor-pointer")}
                onClick={async () => {
                  const { error } = await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/login");
                      },
                    },
                  });
                }}
              >
                <span className="text-slate-500">
                  <LogOutIcon />
                </span>
                <span>Odhlásit se</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
