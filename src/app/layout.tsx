import Providers from "@/components/Providers";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <div className="flex-grow flex-1">{children}</div>
          </Providers>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
