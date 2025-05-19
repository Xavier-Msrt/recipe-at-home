import path from 'path';
import fs from 'fs';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getRecipe, getRecipePicture } from '@/lib/recipe';

export async function GET(req: Request, { params }: { params: { id: number } }, res: NextApiResponse) {
  const { id } = await params;
  // if(id < 0 || id > 9999) return  NextResponse.json({error: "id not correct"}, {status: 400});
  

  // const extensions = ['.png', '.jpeg', '.jpg']
  // const publicPath = process.cwd() + "/public/uploads";

  // for (let ext of extensions) {
  //   const filePath = path.join(publicPath, `${id}${ext}`)
  //   if (fs.existsSync(filePath)) {
  //       const imageBuffer = fs.readFileSync(filePath)

  //       return new NextResponse(new Uint8Array(imageBuffer), {
  //       status: 200,
  //       headers: {
  //         'Content-Type': getMimeType(ext),
  //         'Content-Disposition': `inline; filename="${id}${ext}"`,
  //       },
  //     })
  //   }
  // }

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
    console.log(error)
    if(error == "id not correct")
      return NextResponse.json({error: "id not correct"}, {status: 400});

    if(error == "Server error")
      return NextResponse.json({ error: 'Image not found' }, {status: 404})
  }

  return NextResponse.json({ error: 'Image not found' }, {status: 404})
}

function getMimeType(extension: string) {
  const ext = extension.startsWith('.') ? extension.slice(1) : extension;
  return `image/${ext}`;
}