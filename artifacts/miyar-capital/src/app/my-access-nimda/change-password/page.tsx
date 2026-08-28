import { redirect } from "next/navigation";
import { isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { AdminBar } from "../AdminBar";
import { AdminChangePasswordForm } from "../AdminChangePasswordForm";

export const metadata = { title: "Change password · Admin" };
export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  if (!(await isAdminAuthenticatedViaApi())) {
    redirect("/my-access-nimda");
  }
  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <div className="admin-card admin-login" style={{ maxWidth: 420 }}>
          <h1 style={{ marginTop: 0 }}>Change password</h1>
          <p className="admin-meta">
            Enter your current password, then choose a new one (at least 10 characters).
            We never display or email the current password. You will need to sign in again.
          </p>
          <AdminChangePasswordForm />
        </div>
      </div>
    </>
  );
}
