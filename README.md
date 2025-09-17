# 🚘 GearDB Backend

Bem-vindo ao backend do GearDB, uma API em Node.js/Express responsável por autenticação JWT, persistência em PostgreSQL com Sequelize, armazenamento de mídias na Cloudflare R2 e integração com o serviço de IA que classifica veículos a partir de imagens.

## 🚀 Visão Geral
- **Orquestração central**: `src/index.ts` carrega variáveis de ambiente, conecta ao banco e inicia o servidor HTTP, garantindo que a API só suba após o banco estar pronto.
- **Servidor HTTP**: `ExpressServerAdapter` configura logs de requisição, CORS, JSON, roteamento e tratamento de erros antes de expor o servidor na porta configurada via `APP_PORT`.
- **Camada de dados**: `SequelizeAdapter` injeta credenciais do PostgreSQL, realiza `authenticate`/`sync` e dispara seeders quando necessário.
- **Cliente HTTP externo**: o adaptador Axios define `IA_BACKEND_URL`, interceptores de log e tratamento de erros padronizado ao conversar com serviços remotos.
- **Predição de veículos**: o caso de uso `PredictVehicleUseCase` envia imagens para o serviço de IA `/predict` e cruza as melhores predições com o catálogo interno.

> Referências principais: `src/index.ts`, `src/infra/http-server/express/express-server.adapter.ts`, `src/infra/database/sequelize/sequelize.adapter.ts`, `src/infra/http-request/axios-http-request.adapter.ts`, `src/application/usecases/predict-vehicle.usecase.ts`.

## 🗂 Estrutura de Pastas
```text
src
├── index.ts                # Ponto de entrada: sobe banco e servidor HTTP
├── application             # Casos de uso, DTOs e orquestração de regras de negócio
├── domain                  # Entidades e contratos do domínio (usuários, veículos, fórum…)
└── infra                   # Adaptações para o mundo externo
    ├── auth                # Configuração JWT e provedores de autenticação
    ├── database            # Sequelize, models e seeders
    ├── file-storage        # Cliente Cloudflare R2
    ├── http-request        # Cliente Axios para serviços de IA
    └── http-server         # Servidor Express, middlewares e rotas
```

## 🧑‍💻 Setup Local
1. **Clonagem**
   ```bash
   git clone <url-do-repositorio>
   cd geardb-backend
   ```
2. **Ambiente Node.js**: Utilize Node 18+ (ou a versão usada em produção) e habilite o corepack para o Yarn clássico, se necessário.
3. **Instalação de dependências**
   ```bash
   yarn install
   ```
4. **Execução em desenvolvimento**
   ```bash
   yarn dev
   ```
   - `yarn dev` roda o `nodemon`, que observa `src/` e invoca `ts-node --transpile-only` com `tsconfig-paths` segundo `nodemon.json`.
5. **Build e produção**
   ```bash
   yarn build   # tsc --noEmit para validar os tipos
   yarn start   # executa dist/index.js após transpilar
   ```

## 🔐 Variáveis de Ambiente
| Variável | Descrição |
| --- | --- |
| `APP_PORT` | Porta em que o Express escuta conexões HTTP. |
| `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` | Credenciais usadas pelo Sequelize para autenticar e sincronizar os models com o PostgreSQL. |
| `JWT_SECRET`, `JWT_EXPIRES_IN` | Segredo e tempo de expiração utilizados na emissão/validação de tokens JWT. |
| `IA_BACKEND_URL` | Base URL do serviço de IA consumido pelo adaptador Axios para predição de veículos. |
| `CLOUDFLARE_R2_ENDPOINT`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | Endpoint e credenciais do bucket R2 usados pelo cliente S3. |
| `CLOUDFLARE_R2_BUCKET`, `CLOUDFLARE_R2_PUBLIC_URL` | Nome do bucket e URL pública usada para construir links de mídia. |

Crie um arquivo `.env` na raiz copiando essas chaves e preenchendo com valores válidos.

## 🧰 Comandos Úteis
- **Testes end-to-end**: `yarn test:e2e` (Jest + supertest).
- **Seeds**: `yarn seed:vehicles` popula veículos e especificações; demais seeders (`user`, `topic`, `comment`) vivem em `src/infra/database/sequelize/seeders/` e são disparados automaticamente com sincronização forçada.
- **Sincronização do banco**: quando precisar resetar dados, invoque `DatabasePort.connect(true)` (por exemplo em um script temporário) para realizar `sync({ force: true })` e rodar todos os seeders.

## 🌐 Endpoints Principais
As rotas ficam em `src/infra/http-server/express/routes/` e são agrupadas por contexto:
- `/auth`: cadastro/login sem autenticação prévia.
- `/predict`: upload de imagem para predição de veículos.
- `/user`, `/user-follow`, `/user-vehicle`, `/session`: gestão de perfis, relacionamentos e sessões.
- `/vehicle`, `/vehicle-spec`, `/fipe-price`: catálogo de veículos, especificações e integração de preços.
- `/forum`, `/topic`, `/topic-like`, `/comment`, `/comment-like`: fórum comunitário e interações.
- `/media`: upload e gerenciamento de arquivos vinculados.

Exceto `/auth` e `/predict`, todas utilizam o middleware `authenticate` que valida JWT no header `Authorization`.

## 📦 Exemplo: Predição de Veículo (`POST /predict`)
```http
POST /predict HTTP/1.1
Content-Type: multipart/form-data; boundary=---XXX

-----XXX
Content-Disposition: form-data; name="file"; filename="car.jpg"
Content-Type: image/jpeg

<bytes da imagem>
-----XXX--
```
Resposta (200):
```json
[
  {
    "label": "Ford Mustang GT",
    "confidence": 0.92,
    "vehicle": {
      "id": "uuid",
      "brand": "Ford",
      "model": "Mustang",
      "year": 2021,
      "imageUrl": "https://..."
    }
  }
]
```
1. O Express usa `multer` em memória para receber o arquivo.
2. O caso de uso monta um `FormData`, chama o serviço de IA (`/predict`) via Axios e ordena as maiores confianças.
3. Cada label é cruzado com o repositório Sequelize para enriquecer a resposta com dados do veículo.

## 🛠 Tecnologias e Próximos Passos
- **Stack principal**: Node.js, Express, TypeScript, Sequelize/PostgreSQL, JWT, Axios, Cloudflare R2 (SDK S3), Multer.
- **Melhorias sugeridas**: cobertura de testes para todos os módulos, documentação OpenAPI/Swagger, automação de seeds por CLI e pipelines para lint/test/build.
