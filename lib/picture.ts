import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { FileTooLargeError, InvalidFileTypeError } from './erros';

export async function savePicture(file: Blob, fileName: string) {
    if (
        !file.type.startsWith('image/png') &&
        !file.type.startsWith('image/jpg') &&
        !file.type.startsWith('image/jpeg')
    ) {
        throw new InvalidFileTypeError();
    }

    if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        throw new FileTooLargeError();
    }

    const UPLOAD_DIR = 'public/uploads';

    let extension = '';
    if (file.type === 'image/png') extension = '.png';
    else if (file.type === 'image/jpeg') extension = '.jpg';

    const bufferRawImage = Buffer.from(await file.arrayBuffer());
    const bufferCompressImage = await compressImage(bufferRawImage, file.type);
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
    }
    fs.writeFileSync(
        path.resolve(UPLOAD_DIR, fileName + extension),
        bufferCompressImage
    );
}

async function compressImage(
    buffer: Buffer,
    mimeType: string
): Promise<Buffer> {
    if (mimeType === 'image/jpeg') {
        return sharp(buffer)
            .jpeg({
                quality: 85,
                mozjpeg: true,
            })
            .toBuffer();
    }

    if (mimeType === 'image/png') {
        return sharp(buffer)
            .png({
                compressionLevel: 6,
                adaptiveFiltering: true,
            })
            .toBuffer();
    }

    throw new Error('Unsupported image type');
}
