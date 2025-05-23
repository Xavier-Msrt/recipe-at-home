import Link from 'next/link';

export default function NavLink({
    url,
    pageName,
}: {
    url: string;
    pageName: string;
}) {
    return (
        <Link
            href={url}
            className="px-4 py-2 m-2 bg-orange-200 text-white font-bold hover:bg-orange-400 rounded-xl "
        >
            {pageName}
        </Link>
    );
}
