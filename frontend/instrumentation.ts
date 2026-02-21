import { auth } from "./lib/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "./lib/db";
export const initAdmin = async () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS allowed_emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE
    )
  `);

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!adminEmail) {
    console.log(
      "ADMIN_EMAIL does not exist in ENV. There will be no admin account",
    );
    return;
  }

  db.prepare("INSERT OR IGNORE INTO allowed_emails (email) VALUES (?)").run(
    adminEmail,
  );

  try {
    await auth.api.createUser({
      body: {
        email: adminEmail,
        password: uuidv4(),
        name: "Admin",
        role: "admin",
      },
    });
    console.log("ADMIN USER created. Email: " + adminEmail);
  } catch {
    console.log("Admin user already exists, skipping.");
  }
};

export async function register() {
  await initAdmin();
}
