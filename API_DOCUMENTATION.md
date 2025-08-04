# User Core Service API Documentation

## Overview

The User Core Service provides REST API endpoints for managing user data with full CRUD operations, pagination, filtering, and comprehensive validation.

## Base URL

```
/users
```

## Endpoints

### GET /users

Retrieve a paginated list of users with optional filtering and sorting.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `sort` (optional): Sort field (allowed: createdAt, email)
- `order` (optional): Sort order (asc, desc)
- `filter` (optional): Filter by field (allowed: email, firstName, lastName)

**Response:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "imageUrl": "https://example.com/image.jpg",
      "email": "user@example.com",
      "firstName": "John",
      "middleNames": "Michael",
      "lastName": "Doe",
      "position": "Software Engineer",
      "theme": "system",
      "language": "en",
      "lastSeenAt": "2024-01-01T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /users/count

Get the total count of users.

**Response:**
```json
{
  "count": 5
}
```

### GET /users/:userId

Retrieve a specific user by ID.

**Path Parameters:**
- `userId`: User UUID

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "imageUrl": "https://example.com/image.jpg",
  "email": "user@example.com",
  "firstName": "John",
  "middleNames": "Michael",
  "lastName": "Doe",
  "position": "Software Engineer",
  "theme": "system",
  "language": "en",
  "lastSeenAt": "2024-01-01T00:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### POST /users

Create a new user.

**Request Body:**
```json
{
  "imageUrl": "https://example.com/image.jpg",
  "email": "newuser@example.com",
  "firstName": "Jane",
  "middleNames": "Marie",
  "lastName": "Smith",
  "position": "Product Manager",
  "theme": "light",
  "language": "en"
}
```

**Required Fields:**
- `email`: Valid email address (unique)
- `firstName`: String (max 255 characters)
- `lastName`: String (max 255 characters)
- `position`: String (max 255 characters)
- `theme`: Enum (system, light, dark)
- `language`: Enum (en, de, es, pt)

**Optional Fields:**
- `imageUrl`: String (max 500 characters)
- `middleNames`: String (max 255 characters)

**Response:** Same as GET /users/:userId

### PUT /users/:userId

Update an existing user.

**Path Parameters:**
- `userId`: User UUID

**Request Body:** Same as POST /users (all fields optional)

**Response:** Same as GET /users/:userId

### DELETE /users/:userId

Delete a user.

**Path Parameters:**
- `userId`: User UUID

**Response:** Same as GET /users/:userId

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation Failed",
  "errorDetails": [
    {
      "field": "email",
      "message": "Email must be a valid email format"
    }
  ]
}
```

### 404 Not Found
```json
{
  "message": "User not found",
  "errorDetails": [
    {
      "message": "User not found",
      "code": "USER_NOT_FOUND"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "errorDetails": [
    {
      "message": "Database connection failed",
      "code": "DATABASE_ERROR"
    }
  ]
}
```

## Data Types

### Theme Enum
- `system`: System theme
- `light`: Light theme
- `dark`: Dark theme

### Language Enum
- `en`: English
- `de`: German
- `es`: Spanish
- `pt`: Portuguese

## Validation Rules

- **Email**: Must be unique, valid email format, max 255 characters
- **First Name**: Required, string, max 255 characters
- **Last Name**: Required, string, max 255 characters
- **Position**: Required, string, max 255 characters
- **Middle Names**: Optional, string, max 255 characters
- **Image URL**: Optional, string, max 500 characters
- **Theme**: Required, must be valid enum value
- **Language**: Required, must be valid enum value
- **User ID**: Must be valid UUID v4 format

## Rate Limiting

Currently no rate limiting is implemented.

## Authentication

Currently no authentication is required. In production, this should be protected with proper authentication and authorization. 