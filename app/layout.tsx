import { GeistSans } from "geist/font/sans";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "../theme";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from "@mui/material/styles";
import { useEffect } from "react";
import { Button, Paper } from "@mui/material";
import { ModeSwitcher } from "@/components/ModeSwitcher";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "IREKNIHOVNA",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <AppRouterCacheProvider
            options={{ enableCssLayer: true, key: "css" }}
          >
            <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
          </AppRouterCacheProvider>
        </main>
      </body>
    </html>
  );
}
