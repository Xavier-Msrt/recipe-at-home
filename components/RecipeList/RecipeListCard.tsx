"use client";
import Image from "next/image";

export default function RecipeListCard({title, description }: {title: string; description: string}) {
    const handleButton = () => {
        console.log("handleButton");
    }
    return (
        <div className="rounded-xl shadow-2xl w-1/3">
            <div className="flex justify-center">
                <Image alt="pasta image"
                       src="/pasta.jpg"
                       width={1920}
                       height={1080}
                       className="flex justify-center rounded-t-xl"
                />
            </div>
            <div className="m-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <div className="flex justify-between gap-10 mt-4">
                    <p className="w-3/4">{description}</p>
                    <button
                        onClick={handleButton}
                        className="w-1/4 m-4 bg-amber-500 px-4 py-2 rounded-xl text-white font-bold"
                    >Voir
                    </button>
                </div>

            </div>
        </div>
    );
}