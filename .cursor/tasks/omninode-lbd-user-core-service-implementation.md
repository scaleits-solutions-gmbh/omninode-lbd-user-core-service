# User Core Service Implementation Plan

## 🎯 **Project Goal**

Refactor User Core Service (user, user-company, session, identity-provider, password-recovery-token, auth) to standardized modules with CRUD/operations, JWT/session flows, password recovery, Swagger JSON-only docs, validation/error normalization, Drizzle-backed storage, and full tests.

## 📊 **Current State Analysis**

### **For Refactoring Tasks:**

- **Current Implementation**: Modules present and wired; `main.ts` exposes `/docs-json` and uses org validation/exception filters.
- **Target Architecture**: Consistent controllers/services returning raw DAO results; rigorous DTO validation; stable contracts.
- **Impact Analysis**: Auth/session flows; secure password handling; token lifetimes; identity provider records.
- **Migration Strategy**: Phase by module; protect contracts with e2e tests.

## 🚀 **Implementation Phases**

### **Phase 1: Bootstrap & Docs** [STATUS: NOT STARTED]

- [ ] Validate docs JSON exposure at `${cutomPath}/docs-json`
- [ ] Confirm validation/exception filters enabled

#### **🎯 Acceptance Criteria**

✅ Docs reachable; standardized error shape

---

### **Phase 2: User + User-Company CRUDs** [STATUS: NOT STARTED]

- [ ] CRUD endpoints and DTOs with validation and Swagger annotations
- [ ] Raw DAO results; pagination for list endpoints

#### **🎯 Acceptance Criteria**

✅ Endpoints implemented; tests green

---

### **Phase 3: Session Module** [STATUS: NOT STARTED]

- [ ] Create/refresh/invalidate session endpoints
- [ ] Secure session storage and expiry handling

#### **🎯 Acceptance Criteria**

✅ Sessions rotate/expire correctly; security verified

---

### **Phase 4: Auth Module** [STATUS: NOT STARTED]

- [ ] Login/logout, token issuance and verification
- [ ] Password hashing, throttling, and lockout policies

#### **🎯 Acceptance Criteria**

✅ JWTs issued/verified; lockout works; tests cover edge cases

---

### **Phase 5: Identity Provider Module** [STATUS: NOT STARTED]

- [ ] CRUD for identity providers; link to users
- [ ] Validation of provider-specific fields

#### **🎯 Acceptance Criteria**

✅ Records validated; referential integrity enforced

---

### **Phase 6: Password Recovery Token** [STATUS: NOT STARTED]

- [ ] Issue/validate/redeem tokens; expiry and single-use
- [ ] Email trigger integration hook (future)

#### **🎯 Acceptance Criteria**

✅ Tokens lifecycle covered by tests; secure flows

---

### **Phase 7: Database Integration** [STATUS: NOT STARTED]

- [ ] Drizzle repositories; transactions; indexes for lookups
- [ ] Error mapping to 404/409 where applicable

#### **🎯 Acceptance Criteria**

✅ DAO tests; performance acceptable

---

### **Phase 8: Security & Observability** [STATUS: NOT STARTED]

- [ ] CORS, headers; basic request logging and correlation IDs
- [ ] Secrets/env validation and rotation strategy (doc)

#### **🎯 Acceptance Criteria**

✅ Security headers present; logs carry requestId

---

### **Phase 9: Testing & CI/CD** [STATUS: NOT STARTED]

- [ ] Unit, Integration, E2E across modules
- [ ] CI `buildspec.yml` with pnpm; lint/format enforcement

#### **🎯 Acceptance Criteria**

✅ `pnpm test` green; coverage ≥ 75% (security-sensitive)
✅ CI builds/packages successfully

## 📈 **Progress Tracking**

- **Total Phases**: 9
- **Total Tasks**: 45+
- **Completed**: 0 (0%)
- **Current Phase**: Phase 1
- **Next Action**: Verify docs and filters

## 🎯 **Success Metrics**

- ≥ 75% coverage; zero critical security findings
- Stable contracts across auth/session flows

## 📝 **Notes & Considerations**

- Output DTOs removed; return raw DAO results [[memory:5529533]]
- Ensure JWT secret management and token expiry alignment

### **Last Updated**: 2025-08-08

### **Current Phase**: Phase 1

### **Next Action**: Run offline and hit `/docs-json`
