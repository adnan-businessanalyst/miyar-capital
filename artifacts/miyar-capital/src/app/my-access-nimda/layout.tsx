import { AdminDocumentDir } from "./AdminDocumentDir";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell" dir="ltr" lang="en">
      <AdminDocumentDir />
      {children}
    </div>
  );
}
