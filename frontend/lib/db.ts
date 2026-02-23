import Database from "better-sqlite3";
import path from "path";

const dbPath =
  process.env.DATABASE_PATH || path.join(process.cwd(), "data/sqlite.db");

export const db = new Database(dbPath);
// export const db = new Database("./data/sqlite.db");
