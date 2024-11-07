import { Suspense } from "react";
import TodoPage from "./_components/TodoPage";
import initTsr from "@/utils/tsr-query/init";

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoPage />
    </Suspense>
  );
}
