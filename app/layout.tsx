import type { Metadata } from "next";
import "./globals.css";
import NavLink from "@/components/NavLink";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import LocalSwitcher from "@/components/LocalSwitcher";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe @ Home",
  description: "List all of your private recipe",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const t = await getTranslations("Main");

  return (
    <html lang={locale} className={montserrat.className}>
      <body>
        <NextIntlClientProvider>
          <div className="flex flex-col h-screen justify-between">
            <div className="flex justify-between mb-4 bg-gray-50">
              <Link href="/" className="text-3xl font-bold text-orange-400 p-6">
                {t("name")}
              </Link>

              <nav className="flex justify-center m-4">
                <NavLink url="/" pageName={t("home-link")} />
                <NavLink url="/recipe/add" pageName={t("add-recipe-link")} />
                <LocalSwitcher />
              </nav>
            </div>

            <div className="container mx-auto">{children}</div>
            
            <footer className="flex justify-center bg-orange-200 mt-8 p-4">
              <span className="text-white font-bold">{t("footer")}</span>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
