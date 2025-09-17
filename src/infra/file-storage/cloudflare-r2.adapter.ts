import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { IFileStoragePort } from './file-storage.port';

class CloudflareR2 implements IFileStoragePort {
    private client: S3Client;
    private bucket: string;

    constructor() {
        this.client = new S3Client({
            region: 'auto',
            endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
                secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
            },
        });
        this.bucket = process.env.CLOUDFLARE_R2_BUCKET!;
    }

    async upload(
        filePath: string,
        buffer: Buffer,
        contentType?: string,
    ): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: filePath,
            Body: buffer,
            ContentType: contentType || 'application/octet-stream',
        });

        await this.client.send(command);

        const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${filePath}`;
        return publicUrl;
    }

    async get(filePath: string): Promise<Buffer> {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: filePath,
        });

        const { Body } = await this.client.send(command);
        if (!Body) throw new Error('File not found');

        const stream = Body as Readable;
        const chunks: Uint8Array[] = [];

        for await (const chunk of stream) {
            chunks.push(chunk as Uint8Array);
        }

        return Buffer.concat(chunks);
    }

    async delete(filePath: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: filePath,
        });

        await this.client.send(command);
    }
}

const CloudflareR2Adapter = new CloudflareR2();

export default CloudflareR2Adapter;
