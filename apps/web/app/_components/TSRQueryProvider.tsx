"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import initTsr from "@/utils/tsr-query/init";

export default function TSRQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <initTsr.ReactQueryProvider>{children}</initTsr.ReactQueryProvider>
    </QueryClientProvider>
  );
}
