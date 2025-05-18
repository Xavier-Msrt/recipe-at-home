import path from 'path';
import fs from 'fs';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: number } }, res: NextApiResponse) {
  const { id } = await params;
  if(id < 0 || id > 9999) return  NextResponse.json({error: "id not correct"}, {status: 400});
  

  const extensions = ['.png', '.jpeg']
  const publicPath = process.cwd() + "/public/uploads";

  for (let ext of extensions) {
    const filePath = path.join(publicPath, `${id}${ext}`)
    if (fs.existsSync(filePath)) {
        const imageBuffer = fs.readFileSync(filePath)
        const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg'

        return new NextResponse(new Uint8Array(imageBuffer), {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `inline; filename="${id}${ext}"`,
        },
      })
    }
  }

  return NextResponse.json({ error: 'Image not found' }, {status: 404})
}