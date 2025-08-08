# Serverless Configuration Documentation

## 🚀 **Overview**

This document explains how the **Omninode User Core Service** is configured for serverless deployment on AWS Lambda. The service is built using NestJS framework and follows a modular architecture designed for serverless execution.

## 📋 **Architecture Overview**

### **Service Type**
- **Framework**: NestJS (Node.js)
- **Deployment Target**: AWS Lambda
- **Service Name**: `omninode-serverless-user-domain`
- **Package**: `@scaleits-solutions-gmbh/omninode-serverless-user-domain`

### **Current Architecture**
```
┌─────────────────────────────────────────────────────────────┐
│                    AWS Lambda Environment                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                NestJS Application                       │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │ │
│  │  │   Auth      │ │    User     │ │   Session   │       │ │
│  │  │   Module    │ │   Module    │ │   Module    │       │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘       │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │ │
│  │  │ Identity    │ │ Password    │ │ User        │       │ │
│  │  │ Provider    │ │ Recovery    │ │ Company     │       │ │
│  │  │ Module      │ │ Module      │ │ Module      │       │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘       │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 **Serverless Configuration**

### **Entry Point Configuration**

The application is configured to run as a serverless function through the main entry point:

```typescript
// src/main.ts
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestJsKit } from '@scaleits-solutions-gmbh/org-lib-backend-common-kit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global middleware setup
  app.useGlobalPipes(new NestJsKit.CustomValidationPipe());
  app.useGlobalFilters(new NestJsKit.GlobalExceptionFilter());
  
  // Serverless-friendly port configuration
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
```

### **Module Structure**

The application follows a modular architecture with separate modules for different domains:

```typescript
// src/app.module.ts
@Module({
  imports: [
    UserModule,
    UserCompanyModule,
    SessionModule,
    IdentityProviderModule,
    PasswordRecoveryTokenModule,
    AuthModule,
  ],
})
export class AppModule {}
```

## 📦 **Build Configuration**

### **NestJS CLI Configuration**

```json
// nest-cli.json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

### **TypeScript Configuration**

The project uses TypeScript with specific configurations for serverless deployment:

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2020",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

## 🌍 **Environment Configuration**

### **Environment Variables**

The service uses environment variables for configuration, with different settings for different stages:

```javascript
// jest.setup.js - Test environment configuration
process.env.STAGE = 'local';
process.env.NODE_ENV = 'development';
process.env.PORT = '3000';

// Database configuration
process.env.DB_HOST_LOCAL = 'localhost';
process.env.DB_PORT_LOCAL = '5432';
process.env.DB_USERNAME_LOCAL = 'omninode_user';
process.env.DB_PASSWORD_LOCAL = 'omninode_password';
process.env.DB_NAME_LOCAL = 'omninode_local';
process.env.DB_SCHEMA = 'public';

// Production database URL
process.env.DATABASE_URL = 'postgresql://omninode_user:omninode_password@localhost:5432/omninode_local';
```

### **Required Environment Variables**

For production deployment, the following environment variables are required:

```bash
# Application Configuration
STAGE=production
NODE_ENV=production
PORT=3000

# Database Configuration
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DATABASE_URL=postgresql://user:password@host:port/database

# AWS Configuration (if using AWS services)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## 🏗️ **Module Architecture**

### **Core Modules**

The service is organized into domain-specific modules:

#### **1. User Module**
- **Purpose**: User management and CRUD operations
- **Controllers**: `user.cruds.controller.ts`, `user.operations.controller.ts`
- **Services**: `user.cruds.service.ts`, `user.operations.service.ts`
- **DTOs**: Input/Output DTOs for user operations

#### **2. Auth Module**
- **Purpose**: Authentication and authorization
- **Controllers**: `auth.cruds.controller.ts`, `auth.operations.controller.ts`
- **Services**: `auth.cruds.service.ts`, `auth.operations.service.ts`
- **Features**: Login, logout, token management, 2FA

#### **3. Session Module**
- **Purpose**: Session management
- **Controllers**: `session.cruds.controller.ts`, `session.operations.controller.ts`
- **Services**: `session.cruds.service.ts`, `session.operations.service.ts`
- **Features**: Session creation, validation, refresh

#### **4. Identity Provider Module**
- **Purpose**: External identity provider integration
- **Controllers**: `identity-provider.cruds.controller.ts`, `identity-provider.operations.controller.ts`
- **Services**: `identity-provider.cruds.service.ts`, `identity-provider.operations.service.ts`
- **Features**: OAuth, SSO integration

#### **5. Password Recovery Module**
- **Purpose**: Password reset functionality
- **Controllers**: `password-recovery-token.cruds.controller.ts`, `password-recovery-token.operations.controller.ts`
- **Services**: `password-recovery-token.cruds.service.ts`, `password-recovery-token.operations.service.ts`
- **Features**: Token generation, email sending, password reset

#### **6. User Company Module**
- **Purpose**: User-company relationship management
- **Controllers**: `user-company.cruds.controller.ts`, `user-company.operations.controller.ts`
- **Services**: `user-company.cruds.service.ts`, `user-company.operations.service.ts`
- **Features**: Company assignment, role management

## 🔄 **API Structure**

### **CRUD Operations**
Each module follows a consistent pattern with two types of controllers:

1. **CRUD Controllers**: Basic Create, Read, Update, Delete operations
2. **Operations Controllers**: Business logic operations specific to each domain

### **DTO Pattern**
The service uses a comprehensive DTO pattern:

```
src/module/[module-name]/
├── cruds/
│   ├── dto/
│   │   ├── input/
│   │   │   ├── create-[entity].dto.ts
│   │   │   ├── update-[entity].dto.ts
│   │   │   ├── get-[entity]-by-id.dto.ts
│   │   │   └── index.ts
│   │   └── output/
│   │       ├── [entity].dto.ts
│   │       └── index.ts
│   ├── [module-name].cruds.controller.ts
│   └── [module-name].cruds.service.ts
└── operations/
    ├── dto/
    │   ├── [operation].dto.ts
    │   └── index.ts
    ├── [module-name].operations.controller.ts
    └── [module-name].operations.service.ts
```

## 🚀 **Deployment Configuration**

### **Build Process**

```bash
# Install dependencies
pnpm install

# Build the application
pnpm build

# The build output goes to ./dist directory
```

### **Package Configuration**

```json
// package.json
{
  "name": "@scaleits-solutions-gmbh/omninode-serverless-user-domain",
  "version": "0.0.1",
  "description": "User Core Service",
  "scripts": {
    "build": "pnpm lint:fix; nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main"
  }
}
```

## 🧪 **Testing Configuration**

### **Test Structure**

The project includes comprehensive testing with three levels:

1. **Unit Tests**: `test/unit/` - Individual function testing
2. **Integration Tests**: `test/integration/` - Component interaction testing
3. **E2E Tests**: `test/e2e/` - Full API endpoint testing

### **Test Configuration**

```javascript
// jest.setup.js
process.env.STAGE = 'local';
process.env.NODE_ENV = 'development';
process.env.PORT = '3000';
// ... database configuration
```

### **Running Tests**

```bash
# All tests
pnpm test

# Specific test types
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# With coverage
pnpm test:cov
```

## 🔒 **Security Configuration**

### **Global Middleware**

The application includes security middleware:

```typescript
// Global validation pipe
app.useGlobalPipes(new NestJsKit.CustomValidationPipe());

// Global exception filter
app.useGlobalFilters(new NestJsKit.GlobalExceptionFilter());
```

### **Input Validation**

All inputs are validated using:
- **class-validator**: Runtime validation decorators
- **zod**: Schema validation for DTOs
- **Custom validation pipes**: Business logic validation

## 📊 **Monitoring and Logging**

### **Error Handling**

The service uses a global exception filter for consistent error responses:

```typescript
// Global exception filter
app.useGlobalFilters(new NestJsKit.GlobalExceptionFilter());
```

### **Logging**

- **Console logging**: For development and debugging
- **Structured logging**: For production monitoring
- **Error tracking**: Centralized error handling

## 🔧 **Dependencies**

### **Core Dependencies**

```json
{
  "@nestjs/common": "^11.1.5",
  "@nestjs/core": "^11.1.5",
  "@nestjs/platform-express": "^11.1.5",
  "@scaleits-solutions-gmbh/omninode-lib-backend-common-kit": "0.0.5",
  "@scaleits-solutions-gmbh/omninode-lib-database-drizzle": "^0.0.35",
  "@scaleits-solutions-gmbh/omninode-lib-global-common-kit": "^0.0.2",
  "dotenv": "^16.4.5",
  "reflect-metadata": "^0.2.2",
  "rxjs": "^7.8.2",
  "zod": "^4.0.14"
}
```

### **Development Dependencies**

```json
{
  "@nestjs/cli": "^11.0.7",
  "@nestjs/testing": "^11.1.5",
  "jest": "^29.7.0",
  "typescript": "^5.8.3",
  "eslint": "^9.32.0",
  "prettier": "^3.6.2"
}
```

## 🚨 **Important Notes**

### **Serverless Considerations**

1. **Cold Start Optimization**: The application is designed to minimize cold start times
2. **Memory Management**: Efficient memory usage for Lambda constraints
3. **Connection Pooling**: Database connections are managed efficiently
4. **Stateless Design**: No server-side state storage

### **Deployment Best Practices**

1. **Environment Variables**: Use AWS Systems Manager Parameter Store for sensitive data
2. **VPC Configuration**: Configure Lambda to run in appropriate VPC
3. **IAM Roles**: Use least privilege principle for Lambda execution roles
4. **Monitoring**: Set up CloudWatch alarms and logging

### **Performance Optimization**

1. **Bundle Size**: Minimize deployment package size
2. **Dependencies**: Use only necessary dependencies
3. **Caching**: Implement appropriate caching strategies
4. **Database**: Use connection pooling and query optimization

## 📚 **Additional Resources**

- [NestJS Documentation](https://docs.nestjs.com/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Development Team 