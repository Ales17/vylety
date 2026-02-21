"use server";
import {
  addAllowedEmail,
  deleteAllowedEmail,
  getAllowedEmail,
} from "@/service/authService";
import { revalidatePath } from "next/cache";
export async function handleEmailForm(formData: FormData) {
  const email = formData.get("email") as string;
  const emailLower = email.toLowerCase().trim();

  const existingRecord = await getAllowedEmail(emailLower);
  if (existingRecord) {
    return;
  }
  await addAllowedEmail(emailLower);
  revalidatePath("/admin");
}
export async function handleDeleteEmail(id: number) {
  await deleteAllowedEmail(id);
  revalidatePath("/admin");
}
