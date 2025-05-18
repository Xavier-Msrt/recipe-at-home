"use client";
import Image from "next/image";
import Button from "../Button";
import { useTranslations } from "next-intl";

export default function RecipeListCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const handleButton = () => {
    console.log("handleButton");
  };
  const t = useTranslations("RecipeCard");

  return (
    <div className="rounded-xl shadow-2xl w-1/3">
      <div className="flex justify-center">
        <Image
          alt={t("picture-alt")}
          src="/pasta.jpg"
          width={1920}
          height={1080}
          className="flex justify-center rounded-t-xl"
        />
      </div>
      <div className="m-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-4">
          <p className="break-all">{description}</p>
          <div className="flex justify-end-safe mt-4">
            <Button handle={handleButton} text={t("see-recipe")} />
          </div>
        </div>
      </div>
    </div>
  );
}
