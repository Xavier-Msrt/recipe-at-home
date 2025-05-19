import { SendRecipe } from '@/types/Recipe';
import Input from '../Input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type DetailProps = {
  recipe: SendRecipe;
  setRecipe: Dispatch<SetStateAction<SendRecipe>>;
};

type PictureProps = {
  picture: File | undefined;
  setPicture: Dispatch<SetStateAction<File | undefined>>;
};
export default function FormDetailRecipe({
  detail,
  picture,
}: {
  detail: DetailProps;
  picture: PictureProps;
}) {
  const t = useTranslations('FormDetailRecipe');

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleTitleChange = (title: string) => {
    detail.setRecipe({ ...detail.recipe, title });
  };

  const handleDescriptionChange = (description: string) => {
    detail.setRecipe({ ...detail.recipe, description });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      picture.setPicture(file);
    }
  };

  useEffect(() => {
    if (picture.picture) {
      const previewUrl = URL.createObjectURL(picture.picture);
      setImagePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [picture.picture]);

  return (
    <div className="ml-4">
      <Input
        type="text"
        label={t('title')}
        value={detail.recipe.title}
        setValue={handleTitleChange}
      />
      {imagePreview && (
        <div className="flex justify-center">
          <Image
            src={imagePreview}
            alt={t('image-alt')}
            className="w-auto max-h-60 mt-4 rounded shadow"
          />
        </div>
      )}
      <div className="flex justify-center">
        <input
          type="file"
          onChange={handleFile}
          className="border border-gray-400 rounded-sm p-2 m-2"
        />
      </div>
      <Input
        type="area"
        label={t('description')}
        value={detail.recipe.description}
        setValue={handleDescriptionChange}
      />
    </div>
  );
}
