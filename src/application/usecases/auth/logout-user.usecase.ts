import { TSessionRepository } from '@/domain/repositories/session-repository.type';

export class LogoutUserUseCase {
    constructor(private readonly sessionRepo: TSessionRepository) {}

    async execute(token: string) {
        const session = await this.sessionRepo.findByToken(token);
        if (!session) throw new Error('Sessão não encontrada');

        return this.sessionRepo.deleteByToken(token);
    }
}
