"use client";
import { AllowedEmailsRecord } from "@/types/AllowedEmailsRecord";
import Button from "./Button";

interface Props {
  allowedEmailRecords: AllowedEmailsRecord[];
  deleteFun?: (id: number) => void;
}
export default function AllowedEmailsTable({
  allowedEmailRecords,
  deleteFun,
}: Props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {allowedEmailRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.email}</td>
              <td>
                {deleteFun && (
                  <Button
                    label="Smazat"
                    onClick={() => {
                      if (confirm("Opravdu chcete smazat tento email?")) {
                        deleteFun(record.id);
                      }
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
