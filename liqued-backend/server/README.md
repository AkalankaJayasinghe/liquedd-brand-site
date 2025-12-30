# Liqued Backend API

Node.js backend server for the Liqued application.

## Features

- User authentication with JWT
- Product management
- Category management
- Contact form handling
- File upload support
- MySQL database integration

## Technologies

- Express.js
- MySQL2
- JWT Authentication
- Bcrypt.js for password hashing
- Multer for file uploads
- CORS enabled

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the database credentials and JWT secret

3. **Create database:**
   - Run the SQL script in `database.sql` to create tables
   ```bash
   mysql -u root -p < database.sql
   ```

4. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)

### Products (`/api/products`)
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)

### Contact (`/api/contact`)
- `POST /submit` - Submit contact message
- `GET /` - Get all messages (admin only)
- `GET /:id` - Get message by ID (admin only)
- `PUT /:id/read` - Mark message as read (admin only)
- `DELETE /:id` - Delete message (admin only)

## Directory Structure

```
server/
├── config/
│   └── database.js          # MySQL configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product management
│   └── contactController.js # Contact form handling
├── models/
│   ├── User.js             # User model
│   ├── Product.js          # Product model
│   └── Category.js         # Category model
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── productRoutes.js    # Product endpoints
│   └── contactRoutes.js    # Contact endpoints
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── upload.js           # File upload handling
├── uploads/                # Uploaded files directory
├── server.js              # Main server file
└── package.json
```

## Default Port

Server runs on port **5000** by default (configurable via .env)

## License

ISC
