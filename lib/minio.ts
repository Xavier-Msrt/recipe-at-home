import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT as string,
    port: Number(process.env.MINIO_PORT) as number,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESSKEY as string,
    secretKey: process.env.MINIO_SECRETKEY as string,
});

export default minioClient;
