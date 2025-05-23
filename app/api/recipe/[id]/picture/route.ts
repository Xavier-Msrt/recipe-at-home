import fs from 'fs';
import { NextResponse } from 'next/server';
import { getRecipePicture } from '@/lib/recipe';
import { AppError } from '@/lib/erros';

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
        if (error instanceof AppError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function getMimeType(extension: string) {
    const ext = extension.startsWith('.') ? extension.slice(1) : extension;
    return `image/${ext}`;
}
