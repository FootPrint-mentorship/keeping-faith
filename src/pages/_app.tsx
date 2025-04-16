import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 180_000, //number in milliseconds equals to 5 minutes,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
