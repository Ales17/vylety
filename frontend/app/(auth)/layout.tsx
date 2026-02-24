import React from "react";
import "../globals.css";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: `Přihlášení | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;




  return (
    <html lang="cs">
      <body>
        <main className="bg-white m-2 lg:mx-auto lg:max-w-xl border rounded-3xl border-slate-200 p-2 md:p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
