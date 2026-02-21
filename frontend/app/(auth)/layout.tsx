import React from "react";
import "../globals.css";
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
