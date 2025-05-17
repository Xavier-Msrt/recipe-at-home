import type { Metadata } from "next";
import "./globals.css";
import NavLink from "@/components/NavLink";
import {Montserrat} from 'next/font/google';
import Link from "next/link";
const montserrat = Montserrat({
  weight: "400",
  subsets: ['latin'],
})

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
    <html lang="fr" className={montserrat.className}>
      <body>
      <div className="flex justify-between mb-4 bg-gray-50">
        <Link href="/" className="text-3xl font-bold text-orange-400 p-6">Recipe @ Home</Link>

          <nav className="flex justify-center m-4">
              <NavLink url="/" pageName="Home"/>
              <NavLink url="/add-recipe" pageName="Add recipe"/>
          </nav>
      </div>
      <div className="container mx-auto">
          {children}
      </div>
      <footer className="flex justify-center bg-orange-200 mt-8 p-4">
        <span className="text-white font-bold">Recipe @ Home - Open Source project to learn NextJS</span>
      </footer>
      </body>
    </html>
  );
}
