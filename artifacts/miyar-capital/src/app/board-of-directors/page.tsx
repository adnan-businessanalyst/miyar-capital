import type { Metadata } from "next";
import { BoardOfDirectors } from "@/views/BoardOfDirectors";

export const metadata: Metadata = {
  title: "Board of Directors",
};

export default function Page() {
  return <BoardOfDirectors />;
}