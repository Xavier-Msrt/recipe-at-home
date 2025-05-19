import fs from 'fs';
import { NextResponse } from 'next/server';
import { getRecipePicture } from '@/lib/recipe';

export async function GET({ params }: { params: { id: number } }) {
  const { id } = await params;

  try {
    const { filePath, ext } = await getRecipePicture(id);
    const imageBuffer = fs.readFileSync(filePath);

    return new NextResponse(new Uint8Array(imageBuffer), {
      status: 200,
      headers: {
        'Content-Type': getMimeType(ext),
        'Content-Disposition': `inline; filename="${id}${ext}"`,
      },
    });
  } catch (error) {
    console.log(error);
    if (error === 'id not correct')
      return NextResponse.json({ error: 'id not correct' }, { status: 400 });

    if (error === 'Server error')
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  return NextResponse.json({ error: 'Image not found' }, { status: 404 });
}

function getMimeType(extension: string) {
  const ext = extension.startsWith('.') ? extension.slice(1) : extension;
  return `image/${ext}`;
}
