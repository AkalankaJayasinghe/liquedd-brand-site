# Postman Testing Guide

Base URL: `http://localhost:5000/api`

## 1. Health Check

**GET** `/health`
- No headers or body needed
- Should return: `{"status":"OK","message":"Server is running"}`

---

## 2. Authentication Endpoints

### Register User
**POST** `/auth/register`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
**POST** `/auth/login`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**⚠️ Copy the token from the response - you'll need it for protected routes!**

### Get Profile (Protected)
**GET** `/auth/profile`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Update Profile (Protected)
**PUT** `/auth/profile`

Headers:
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

Body (raw JSON):
```json
{
  "username": "John Updated",
  "email": "john.updated@example.com"
}
```

---

## 3. Product Endpoints

### Get All Products
**GET** `/products`

Optional query parameters:
- `?category_id=1`
- `?search=laptop`

Headers: None needed

### Get Single Product
**GET** `/products/1`

Headers: None needed

### Create Product (Admin Only)
**POST** `/products`

Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

Body (form-data):
```
name: Gaming Laptop
description: High performance gaming laptop
price: 1299.99
category_id: 1
stock: 50
image: [Select File]
```

**Note:** Use form-data, not raw JSON, because of file upload!

### Update Product (Admin Only)
**PUT** `/products/1`

Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

Body (form-data):
```
name: Gaming Laptop Pro
price: 1499.99
stock: 45
image: [Select File - Optional]
```

### Delete Product (Admin Only)
**DELETE** `/products/1`

Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

---

## 4. Contact Endpoints

### Submit Contact Message
**POST** `/contact/submit`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Product Inquiry",
  "message": "I would like to know more about your products."
}
```

### Get All Messages (Admin Only)
**GET** `/contact`

Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

### Get Single Message (Admin Only)
**GET** `/contact/1`

Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

### Mark as Read (Admin Only)
**PUT** `/contact/1/read`

Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

### Delete Message (Admin Only)
**DELETE** `/contact/1`

Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

---

## Quick Testing Steps

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Test health check** - Verify server is running

3. **Register a user** - Create your account

4. **Login** - Get your token

5. **Test protected routes** - Use the token in Authorization header

6. **Create admin user manually in database:**
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```

7. **Login as admin** - Get admin token

8. **Test admin routes** - Create/update/delete products

---

## Tips

- Save requests in a Postman Collection for reuse
- Use Postman Environment Variables for the token:
  - Create variable: `token`
  - Use in headers: `Bearer {{token}}`
- Check the Console tab in Postman for detailed error messages
- Make sure MySQL database is running and tables are created

---

## Common Errors

- **401 Unauthorized**: Token missing or invalid - login again
- **403 Forbidden**: Need admin role for this endpoint
- **404 Not Found**: Check the URL and endpoint path
- **500 Server Error**: Check server console for database errors
