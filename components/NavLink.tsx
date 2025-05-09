import Link from "next/link";

export default function NavLink({url, pageName}: {url: string; pageName: string}) {
    return (
        <Link href={url} className="px-4 py-2 m-2 bg-blue-200 rounded-xl text-white">{pageName}</Link>
    )
}