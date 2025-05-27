'use client';

import Link from 'next/link';

export default function Pagination({
    page,
    totalPages,
    query,
}: {
    page: number;
    totalPages: number;
    query: string;
}) {
    return (
        <div className="flex join justify-center m-4">
            {page > 1 && (
                <Link
                    href={`/?query=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="join-item btn"
                >
                    {page - 1}
                </Link>
            )}
            <button className="join-item btn btn-active">{page}</button>
            {page < totalPages && (
                <Link
                    href={`/?query=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="join-item btn"
                >
                    {page + 1}
                </Link>
            )}
        </div>
    );
}
