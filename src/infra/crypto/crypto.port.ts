import bcryptAdapter from './bcrypt.adapter';

export type TCryptoPort = {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
};

const CryptoPort = bcryptAdapter;

export default CryptoPort;
