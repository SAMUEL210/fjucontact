import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"

const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "BDD FJU Lyon",
  description: "Base de donnée de contact des Jeunes FJU Lyon",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${robotoCondensed.className}`}>
        {children}
        <Toaster richColors expand={false} />
      </body>
    </html>
  );
}
