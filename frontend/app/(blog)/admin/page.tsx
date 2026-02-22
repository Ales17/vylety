"use server";
import PageWrapper from "@/components/PageWrapper";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllowedEmails } from "@/service/authService";
import AllowedEmailsTable from "@/components/AllowedEmailsTable";
import AllowedEmailForm from "@/components/AllowedEmailForm";
import { handleDeleteEmail } from "@/lib/actions";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "admin") {
    redirect("/");
  }

  const emails = await getAllowedEmails();

  return (
    <PageWrapper pageName="Admin panel - správa povolených emailů">
      <AllowedEmailForm />
      <AllowedEmailsTable
        allowedEmailRecords={emails}
        deleteFun={handleDeleteEmail}
      />
    </PageWrapper>
  );
}
