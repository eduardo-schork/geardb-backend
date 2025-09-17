import { IFileStoragePort } from '@/infra/file-storage/file-storage.port';
import { v4 as uuidv4 } from 'uuid';

export type UploadFileInput = {
    filename: string;
    buffer: Buffer;
    mimetype: string;
};

export type UploadFileOutput = {
    url: string;
    path: string;
    filename: string;
    contentType: string;
};

export class UploadFileUseCase {
    constructor(private fileStorageService: IFileStoragePort) {}

    async execute(input: UploadFileInput): Promise<UploadFileOutput> {
        const filePath = `uploads/${uuidv4()}-${input.filename}`;

        const url = await this.fileStorageService.upload(
            filePath,
            input.buffer,
            input.mimetype,
        );

        return {
            url,
            path: filePath,
            filename: input.filename,
            contentType: input.mimetype,
        };
    }
}
