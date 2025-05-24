import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { getRecipePicture } from '@/lib/recipe';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        const { filePath, ext } = getRecipePicture(Number(id));
        const imageBuffer = fs.readFileSync(filePath);

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': getMimeType(ext),
                'Content-Disposition': `inline; filename="${id}${ext}"`,
            },
        });
    } catch {
        return new Response(null, { status: 500 });
    }
}

function getMimeType(extension: string) {
    const ext = extension.startsWith('.') ? extension.slice(1) : extension;
    return `image/${ext}`;
}
