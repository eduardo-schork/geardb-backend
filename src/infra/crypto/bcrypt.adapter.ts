import bcrypt from 'bcrypt';
import { TCryptoPort } from './crypto.port';

class BcryptAdapter implements TCryptoPort {
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}

export default new BcryptAdapter();
