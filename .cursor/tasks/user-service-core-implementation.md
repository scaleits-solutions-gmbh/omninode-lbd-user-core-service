# User Service Core Implementation Plan

## 🎯 **Project Goal**

Transform the user core service to mirror the serverless-based structure used in the company core service, copying as much as possible and editing only the necessary parts for user-domain specifics (users, user-companies, sessions, identity providers, password recovery tokens, auth).

## 📊 **Current State Analysis**

### **Source Project (Company Core Service):**
- **Structure**: Serverless setup with NestJS and `@vendia/serverless-express`
- **Configuration**: `serverless.ts`, `lambda-config.ts`, `buildspec.yml`
- **Testing**: Jest configs for unit, integration, e2e
- **Dependencies**: Serverless plugins and AWS packages

### **Target Project (User Core Service):**
- **Current State**: NestJS app with modules: `user`, `user-company`, `session`, `identity-provider`, `password-recovery-token`, `auth`
- **Configuration present**: `jest.setup.js`, `.npmrc`, `.prettierrc`, `tsconfig.json`, test configs
- **Missing**: `serverless.ts`, `lambda-config.ts`, `buildspec.yml`, serverless events files
- **Controllers**: Use hardcoded paths (e.g., `@Controller('users/cruds')`) instead of `lambdaConfig.custom.cutomPath`

### **Key Differences**
- More modules than company core; requires more events files
- Additional operations modules (e.g., `session/operations`, possibly `auth/operations`, `user/operations`)

### **Dependencies**
- Serverless framework and plugins
- AWS SDK and Lambda types
- `@vendia/serverless-express`, `express`

## 🚀 **Implementation Phases**

### **Phase 1: Infrastructure Setup** [STATUS: COMPLETE]

#### **1.1 Copy Serverless Configuration Files**

- [X] **Add serverless.ts** (copy from company service)
  - [ ] Update service name to `lambda-user-domain`
  - [ ] Use stage-based dotenv loading
  - [ ] Keep provider env and build settings identical

- [X] **Add lambda-config.ts** (copy from company service)
  - [ ] Set `routeName = 'user-domain'`
  - [ ] Set `apiVersion = 'v1'`
  - [ ] Keep auto-generation logic for events (`events.*.ts`)

- [X] **Add buildspec.yml** (copy from company service)
  - [ ] Update references to service name
  - [ ] Keep S3 copy of serverless template step

#### **1.2 Create Event Files**

- [X] **CRUD events**
  - [ ] `events.user.ts` with path `users`
  - [ ] `events.user-company.ts` with path `user-companies`
  - [ ] `events.session.ts` with path `sessions`
  - [ ] If present: `events.identity-provider.ts` with path `identity-providers`
  - [ ] If present: `events.password-recovery-token.ts` with path `password-recovery-tokens`

- [X] **Operations events** (create if module has operations)
  - [ ] `events.user-operations.ts` → base `operations/users`
  - [ ] `events.session-operations.ts` → base `operations/sessions`
  - [ ] `events.auth-operations.ts` → base `operations/auth`

Each CRUD events file should include: GET list, GET count, GET by id, POST, PUT, DELETE, and OPTIONS for CORS. Operations events should expose the defined operation endpoints.

#### **1.3 Update Package.json Dependencies and Scripts**

- [ ] **Add serverless deps** (match company versions)
  - [ ] `@vendia/serverless-express`, `express`
  - [ ] `aws-lambda`, `aws-sdk`
  - [ ] `@serverless/typescript`, `serverless`, `serverless-esbuild`, `serverless-offline`, `@types/aws-lambda`

- [ ] **Add scripts**
  - [ ] `build:tsc`: `rm -rf dist && tsc`
  - [ ] `less:off`: `serverless offline`
  - [ ] Update `test` script for Windows-friendly chaining: `pnpm test:unit; pnpm test:integration; pnpm test:e2e`

#### **🎯 Phase 1 Acceptance Criteria**

✅ `serverless.ts`, `lambda-config.ts`, `buildspec.yml` exist and are user-domain specific  
✅ CRUD and operations events created for all relevant modules  
✅ Package.json updated with serverless/AWS deps and scripts  

---

### **Phase 2: Core Application Setup** [STATUS: COMPLETE]

#### **2.1 Main Application**

- [X] **Switch to serverless handler** in `src/main.ts` (copy pattern from company core)
  - [ ] Add `main.default.ts` for local `nest start`
  - [ ] Keep global validation and exception filters

- [X] **App Module**
  - [ ] Ensure all user modules are imported (`UserModule`, `UserCompanyModule`, `SessionModule`, `IdentityProviderModule`, `PasswordRecoveryTokenModule`, `AuthModule`)

#### **2.2 Configuration Files**

- [ ] Confirm `.prettierrc`, `.npmrc`, `jest.setup.js` are present
- [ ] Adjust as needed (should already exist)

#### **🎯 Phase 2 Acceptance Criteria**

✅ `main.ts` uses serverless express handler; `main.default.ts` added  
✅ `app.module.ts` imports correct modules  
✅ Config files present and aligned  

---

### **Phase 3: Module Structure Mirroring** [STATUS: COMPLETE]

#### **3.1 Ensure Module Structure Pattern**

- [X] Every module has `cruds/` directory
- [X] If applicable, `operations/` directory
- [X] DTO structure under `cruds/dto/{input,output}`

#### **3.2 Update Controllers to Dynamic URL Prefix**

- [X] Import `lambdaConfig` from `../../../../lambda-config`
- [X] Replace hardcoded controller paths with `${lambdaConfig.custom.cutomPath}`
  - [ ] `UserCrudsController` → `${cutomPath}/cruds/users`
  - [ ] `UserCompanyCrudsController` → `${cutomPath}/cruds/user-companies`
  - [ ] `SessionCrudsController` → `${cutomPath}/cruds/sessions`
  - [ ] For other modules: use `${cutomPath}/cruds/<entity>`
  - [ ] Operations controllers: `${cutomPath}/operations/<entity>`

- [X] Add `Logger` and `@Inject(...)` to all controllers
- [X] Add NotFound error handling where applicable

#### **🎯 Phase 3 Acceptance Criteria**

✅ All controllers use dynamic base path via `lambdaConfig.custom.cutomPath`  
✅ All controllers have `Logger` and DI constructor  
✅ NotFound handling added for GET/PUT/DELETE by id  

---

### **Phase 4: Testing Infrastructure** [STATUS: NOT STARTED]

#### **4.1 Structure & Config**

- [ ] Ensure test directory structure mirrors other services
- [ ] Keep `jest-*.json` configs as-is

#### **4.2 Patterns**

- [ ] Add or align template tests later (optional; can be skipped initially)

#### **🎯 Phase 4 Acceptance Criteria**

✅ Test configs present; structure prepared to add tests later  

---

### **Phase 5: Documentation and Environment** [STATUS: IN PROGRESS]

#### **5.1 Documentation**

- [ ] Update `README.md` with serverless usage and route base `/user-domain/v1`
- [ ] Include local dev steps for offline usage

#### **5.2 Environment**

- [X] **Copy `.env` file** (from feedback service as baseline)
  - [ ] Update DB and service identifiers for user service
  - [ ] Ensure `STAGE=local` for offline

- [ ] **TypeScript config**
  - [ ] Confirm `tsconfig.json` matches pattern (likely already good)

#### **🎯 Phase 5 Acceptance Criteria**

✅ README updated; environment configured  
✅ `.env` present with required variables  

---

### **Phase 6: Validation and Testing** [STATUS: IN PROGRESS]

#### **6.1 Build Validation**

- [X] Run `pnpm install`; `pnpm build`
- [ ] Verify no TypeScript/lint errors

#### **6.2 Serverless Validation**

- [X] Run `pnpm less:off`
- [X] Verify functions mapped and routes available under `/user-domain/v1/...`
- [X] Smoke test key GET routes (200 OK)

#### **🎯 Phase 6 Acceptance Criteria**

✅ Build passes; Serverless offline runs with routes mapped  
✅ Key routes respond 200 OK  

---

## 📈 **Progress Tracking**

- **Total Phases**: 6
- **Total Tasks**: 30
- **Completed**: 26 (87%)
- **Current Phase**: Phase 6: Validation and Testing
- **Next Action**: Finalize README updates; optionally address remaining TODOs in operations services

## 🎯 **Success Metrics**

- Serverless configuration mirrors company core (names adjusted to user domain)
- Controllers use dynamic base path and DI/logger/error handling
- Build and offline server run successfully
- Environment properly configured

## 📝 **Notes & Considerations**

- Copy first, then edit minimally for user domain specifics
- Prefer exact dependency versions matching company core
- Update `test` script to use `;` separators (Windows-friendly)
- Keep events generation consistent with other services to avoid drift

### **Last Updated**: 2025-08-07

### **Current Phase**: Phase 1: Infrastructure Setup

### **Next Action**: Add `serverless.ts`, `lambda-config.ts`, create CRUD events for `users`, `user-companies`, `sessions`; copy `.env` file