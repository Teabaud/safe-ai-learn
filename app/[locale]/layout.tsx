import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    metadataBase: new URL(defaultUrl),
    title: t("title"),
    description: t("description"),
  };
}

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages(); // Providing all messages to the client side is the easiest way to get started

  return (
    <html
      lang={locale}
      className={geistSans.className}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
