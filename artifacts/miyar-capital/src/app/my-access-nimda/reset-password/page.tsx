import { Suspense } from "react";
import Link from "next/link";
import { AdminResetPasswordForm } from "../AdminResetPasswordForm";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <div className="admin-wrap">
      <div className="admin-card admin-login" style={{ maxWidth: 420, margin: "80px auto" }}>
        <h1 style={{ marginTop: 0 }}>Set a new password</h1>
        <p className="admin-meta">Choose a password of at least 10 characters.</p>
        <Suspense fallback={<p>Loading…</p>}>
          <AdminResetPasswordForm />
        </Suspense>
        <p className="admin-login-forgot">
          <Link href="/my-access-nimda">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
