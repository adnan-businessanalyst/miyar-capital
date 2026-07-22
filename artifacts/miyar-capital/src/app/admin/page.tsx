import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/server/admin/auth";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata = { title: "Admin" };

export default async function AdminHomePage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/submissions");
  }
  return (
    <div className="admin-wrap">
      <div className="admin-card admin-login" style={{ maxWidth: 420, margin: "80px auto" }}>
        <h1 style={{ marginTop: 0 }}>Miyar Admin</h1>
        <p className="admin-meta">Staff sign-in to review contact form submissions.</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
