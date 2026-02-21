"use client";

import { handleEmailForm } from "@/lib/actions";
import Input from "./Input";
import Button from "./Button";

export default function AllowedEmailForm() {
  return (
    <div>
      <form action={handleEmailForm}>
        <label htmlFor="email">Email:</label>
        <Input type="email" id="email" name="email" required />
        <Button type="submit" label="Přidat" />
      </form>
    </div>
  );
}
