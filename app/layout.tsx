import { getLocale, getTranslations } from 'next-intl/server';
import './globals.css';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';
import LocalSwitcher from '@/components/LocalSwitcher';

export const metadata: Metadata = {
    title: 'Recipe @ Home',
    description: 'List all of your private recipe',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const t = await getTranslations('Main');

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider>
                    <div className="flex flex-col h-screen gap-0">
                        <header>
                            <nav className="navbar bg-base-100 shadow-sm">
                                <div className="flex-1">
                                    <a className="btn btn-ghost text-xl">
                                        {t('name')}
                                    </a>
                                </div>
                                <div className="flex-none">
                                    <ul className="menu menu-horizontal px-1">
                                        <li>
                                            <Link href="/">
                                                {t('home-link')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/add">
                                                {t('add-recipe-link')}
                                            </Link>
                                        </li>
                                        <li>
                                            <LocalSwitcher />
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </header>
                        <main className="container mx-auto">{children}</main>
                        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed inset-x-0 bottom-0">
                            <aside>
                                <p>
                                    {t('footer') + ' '}
                                    <a
                                        href="https://github.com/Xavier-Msrt/recipe-at-home"
                                        className="link link-neutral"
                                    >
                                        GitHub
                                    </a>
                                </p>
                            </aside>
                        </footer>
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
