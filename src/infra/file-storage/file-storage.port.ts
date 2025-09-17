import CloudflareR2Adapter from './cloudflare-r2.adapter';

export interface IFileStoragePort {
    upload(filePath: string, buffer: Buffer, contentType?: string): Promise<string>;
    get(filePath: string): Promise<Buffer>;
    delete(filePath: string): Promise<void>;
}

const FileStoragePort = CloudflareR2Adapter;

export default FileStoragePort;
