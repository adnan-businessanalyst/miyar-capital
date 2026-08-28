import { redirect } from "next/navigation";
import { isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata = { title: "Admin" };

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string }>;
}) {
  const { updated } = await searchParams;
  if (updated !== "1" && (await isAdminAuthenticatedViaApi())) {
    redirect("/my-access-nimda/submissions");
  }
  return (
    <div className="admin-wrap">
      <div className="admin-card admin-login" style={{ maxWidth: 420, margin: "80px auto" }}>
        <h1 style={{ marginTop: 0 }}>Miyar Admin</h1>
        <AdminLoginForm
          notice={updated === "1" ? "Password updated. Please sign in again." : ""}
        />
      </div>
    </div>
  );
}
