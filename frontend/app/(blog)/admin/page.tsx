"use server";
import PageWrapper from "@/app/components/PageWrapper";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllowedEmails } from "@/service/authService";
import AllowedEmailsTable from "@/app/components/AllowedEmailsTable";
import { deleteAllowedEmail } from "@/service/authService";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const emails = await getAllowedEmails();
  console.log(emails);
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <PageWrapper pageName="Admin panel - správa povolených emailů">
      
      <AllowedEmailsTable
        allowedEmailRecords={emails}
        deleteFun={deleteAllowedEmail}
      />
    </PageWrapper>
  );
}
