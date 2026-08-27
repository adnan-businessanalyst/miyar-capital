import Link from "next/link";
import { AdminForgotPasswordForm } from "../AdminForgotPasswordForm";

export const metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <div className="admin-wrap">
      <div className="admin-card admin-login" style={{ maxWidth: 420, margin: "80px auto" }}>
        <h1 style={{ marginTop: 0 }}>Forgot password</h1>
        <p className="admin-meta">
          Enter the admin email. If it matches, we will send a one-hour reset link.
        </p>
        <AdminForgotPasswordForm />
        <p className="admin-login-forgot">
          <Link href="/my-access-nimda">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
