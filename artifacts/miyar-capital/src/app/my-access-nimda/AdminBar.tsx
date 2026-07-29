import Link from "next/link";
import { AdminLogoutButton } from "./AdminLogoutButton";

export function AdminBar() {
  return (
    <div className="admin-bar">
      <strong>Miyar Admin</strong>
      <div>
        <Link href="/my-access-nimda/submissions">Submissions</Link>
        <Link href="/my-access-nimda/reports">Reports</Link>
        <Link href="/my-access-nimda/disclosures">Disclosures</Link>
        <AdminLogoutButton />
      </div>
    </div>
  );
}
