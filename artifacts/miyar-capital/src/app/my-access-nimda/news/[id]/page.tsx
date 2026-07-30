import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { AdminBar } from "../../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { NewsEditForm } from "./NewsEditForm";

export const dynamic = "force-dynamic";

type NewsRow = {
  id: string;
  slug: string;
  title: string;
  titleAr: string | null;
  date: string;
  dateAr: string | null;
  blurb: string;
  blurbAr: string | null;
  body: string;
  bodyAr: string | null;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
};

export default async function AdminNewsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");
  const { id } = await params;

  const res = await apiServerFetch("/api/admin/news");
  const json = (await res.json()) as {
    articles?: NewsRow[];
    error?: string;
  };
  if (!res.ok) {
    return (
      <>
        <AdminBar />
        <div className="admin-wrap">
          <p className="form-error">{json.error || "Failed to load article"}</p>
        </div>
      </>
    );
  }

  const article = (json.articles ?? []).find((d) => d.id === id);
  if (!article) notFound();

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <p className="admin-meta">
          <Link href="/my-access-nimda/news">← Back to news</Link>
        </p>
        <h1>Edit article</h1>
        <div className="admin-card" style={{ marginTop: 20 }}>
          <NewsEditForm
            id={article.id}
            initial={{
              slug: article.slug,
              title: article.title,
              titleAr: article.titleAr ?? "",
              date: article.date,
              dateAr: article.dateAr ?? "",
              blurb: article.blurb,
              blurbAr: article.blurbAr ?? "",
              body: article.body,
              bodyAr: article.bodyAr ?? "",
              imageUrl: article.imageUrl || "",
              isPublished: Boolean(article.isPublished),
              sortOrder: article.sortOrder ?? 0,
            }}
          />
        </div>
      </div>
    </>
  );
}
