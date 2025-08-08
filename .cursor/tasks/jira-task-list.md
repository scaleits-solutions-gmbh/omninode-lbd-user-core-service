## omninode-lbd-user-core-service — Simple Task List (for Jira)

- Standardize Nest bootstrap with global `ValidationPipe` and `ClassSerializerInterceptor`.
- Swagger JSON/UI: ensure OpenAPI covers modules: `auth`, `identity-provider`, `password-recovery-token`, `session`, `user`, `user-company`.
- `serverless.ts` functions per module:
  - Auth operations (login/refresh/logout)
  - Identity Provider CRUD
  - Identity Provider Operations
  - Password Recovery Token CRUD
  - Password Recovery Token Operations
  - Session CRUD
  - Session Operations
  - User CRUD
  - User Operations
  - User-Company operations
- Align `events` exports and `lambda-config.ts` configuration.
- DTOs: annotate inputs with `class-validator` and `@nestjs/swagger` for all modules.
- Controllers: remove output DTOs; return raw service-layer results; standardize HTTP codes.
- Services: implement DAO interactions using `omninode-lib-database-drizzle`; ensure repository support for all user-core entities.
- Authentication/authorization: guards, strategies, and context propagation across modules; document expected headers/tokens.
- Session management strategy: expiration, rotation, and invalidation rules.
- Error handling: normalized exception mapping and response envelopes.
- Tests:
  - Unit: DTO validation, auth strategy behaviors, services
  - Integration: DB flows and token/session lifecycle
  - E2E: full auth and user flows
- Scripts: pnpm lint, test (unit/integration/e2e), build, docs generation.
- CI/CD: update `buildspec.yml` to run pipeline and include OpenAPI artifact.
- Ensure `col.json` alignment with current endpoints; update mappings as needed.
- Cleanup legacy/duplicate task files and reconcile imports.


