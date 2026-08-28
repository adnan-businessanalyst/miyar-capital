import Link from "next/link";
import { AdminForgotPasswordForm } from "../AdminForgotPasswordForm";

export const metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <div className="admin-wrap">
      <div className="admin-card admin-login" style={{ maxWidth: 420, margin: "80px auto" }}>
        <h1 style={{ marginTop: 0 }}>Reset password</h1>
        <p className="admin-meta">
          Enter the admin email. If an account exists for that email, we will send a
          one-time link to set a new password. We never send or reveal the current password.
        </p>
        <AdminForgotPasswordForm />
        <p className="admin-login-forgot">
          <Link href="/my-access-nimda">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
