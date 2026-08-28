import Link from "next/link";
import { AdminLogoutButton } from "./AdminLogoutButton";

export function AdminBar() {
  return (
    <div className="admin-bar">
      <strong>Miyar Admin</strong>
      <div>
        <Link href="/my-access-nimda/submissions">Inbox</Link>
        <Link href="/my-access-nimda/reports">Reports</Link>
        <Link href="/my-access-nimda/disclosures">Disclosures</Link>
        <Link href="/my-access-nimda/jobs">Jobs</Link>
        <Link href="/my-access-nimda/news">News</Link>
        <Link href="/my-access-nimda/funds-reports">Funds Reports</Link>
        <Link href="/my-access-nimda/factsheets">Fact sheets</Link>
        <Link href="/my-access-nimda/homepage">Homepage</Link>
        <Link href="/my-access-nimda/pages">Pages</Link>
        <Link href="/my-access-nimda/change-password">Change password</Link>
        <AdminLogoutButton />
      </div>
    </div>
  );
}
