import type { Metadata } from "next";
import { ProductTemplate } from "@/views/ProductTemplate";

export const metadata: Metadata = {
  title: "Product",
};

export default function Page() {
  return <ProductTemplate />;
}