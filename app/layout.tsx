import type { Metadata } from "next";
import "./globals.css";
import NavLink from "@/components/NavLink";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Recipe @ Home",
  description: "List all of your private recipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
      <div className="flex justify-between mb-4 ">
          <Image src="./next.svg"
                 alt="receipe logo"
                 width={100}
                 height={100}
                 className="m-4"
          />

          <nav className="flex justify-center m-4">
              <NavLink url="/" pageName="Home"/>
              <NavLink url="/add-recipe" pageName="Add recipe"/>
          </nav>
      </div>
      <div className="container mx-auto">
          {children}
      </div>

      </body>
    </html>
  );
}
