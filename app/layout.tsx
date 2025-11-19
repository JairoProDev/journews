import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JourNews - La Infraestructura de la Confianza",
  description: "Noticias verificadas en formato vertical. La plataforma que combina la experiencia de TikTok con la confianza del mejor periodismo.",
  keywords: ["noticias", "periodismo", "verificación", "confianza", "JourNews", "información verificada"],
  authors: [{ name: "JourNews Team" }],
  openGraph: {
    title: "JourNews - La Infraestructura de la Confianza",
    description: "Noticias verificadas en formato vertical.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
