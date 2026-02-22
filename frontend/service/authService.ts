"use server";
import { db } from "../lib/db";
import { AllowedEmailsRecord } from "@/types/AllowedEmailsRecord";
export const getAllowedEmails = async (): Promise<AllowedEmailsRecord[]> => {
  const emails = db
    .prepare("SELECT * FROM allowed_emails")
    .all() as AllowedEmailsRecord[];
  return emails;
};

export const deleteAllowedEmail = async (id: number) => {
  db.prepare("DELETE FROM allowed_emails WHERE id = ?").run(id);
};

export const addAllowedEmail = async (email: string) => {
  db.prepare("INSERT INTO allowed_emails (email) VALUES (?)").run(email);
};

export const getAllowedEmail = async (
  email: string,
): Promise<AllowedEmailsRecord | undefined> => {
  const record = db
    .prepare("SELECT * FROM allowed_emails WHERE email = ?")
    .get(email) as AllowedEmailsRecord | undefined;
  return record;
};

export const isEmailAllowed = async (email: string): Promise<boolean> => {
  if (!email) {
    return false;
  }
  const normalized = email.toLowerCase();
  const record = await getAllowedEmail(normalized);
  if (!record) {
    return false;
  }
  return true;
};
