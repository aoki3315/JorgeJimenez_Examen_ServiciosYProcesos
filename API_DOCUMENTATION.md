# API Documentation - Evolution Mobility Service

This document defines the contract for the RESTful API used by the Evolution Mobility web application. The service is hosted via Supabase and provides endpoints for product management, categorization, and lead generation.

## Base URL
`https://[PROJECT_ID].supabase.co/rest/v1`

## Authentication
Requests must include the following headers:
- `apikey`: Your public/private Supabase key.
- `Authorization`: `Bearer [TOKEN]`

---

## Endpoints

### 1. Products (`/products`)

**GET** `/products`  
Retrieves a list of all active products.
- **Query Params**: `select=*`, `active=eq.true`
- **Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "Patinete Eléctrico X1",
    "price": 299.99,
    "stock": 15,
    "image_url": "https://..."
  }
]
```

**POST** `/products` (Admin Only)  
Creates a new product.
- **Body**: Product object.
- **Response**: `201 Created`

---

### 2. Categories (`/categories`)

**GET** `/categories`  
Retrieves all product categories.
- **Response**: `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Patinetes",
    "slug": "patinetes"
  }
]
```

---

### 3. Contact Messages (`/contact_messages`)

**POST** `/contact_messages`  
Sends a new contact inquiry.
- **Body**:
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "message": "Información sobre reparaciones"
}
```
- **Response**: `201 Created`

---

## Error Handling
The API returns standard HTTP status codes:
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Missing or invalid API key.
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Server-side failure.
