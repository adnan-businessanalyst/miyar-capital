import { redirect } from "next/navigation";

export const metadata = { title: "Job applications · Admin" };

export default function ApplicationsPage() {
  redirect("/my-access-nimda/submissions?type=job");
}
