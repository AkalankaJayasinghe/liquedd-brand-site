# Liqued E-Commerce Application

Full-stack e-commerce platform for Liqued beverages with React frontend and Node.js/Express backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### 1. Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE liqued_db;
exit;

# Import schema
cd liqued-backend/server
mysql -u root -p liqued_db < database.sql
```

### 2. Backend Setup

```bash
cd liqued-backend/server

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your database credentials
# Update: DB_PASSWORD, JWT_SECRET

# Start server
npm start
```

Backend runs on: **http://localhost:5000**

### 3. Frontend Setup

```bash
cd my-liquedd

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## 📚 Full Documentation

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for:
- ✅ Complete integration details
- ✅ API endpoints
- ✅ Admin panel usage
- ✅ Troubleshooting guide
- ✅ Security recommendations

---

## 🎯 Features

### Customer Features
- Browse product catalog
- Filter products by category
- Search functionality
- Product details
- Contact form
- Responsive design

### Admin Features
- Secure authentication
- Product management (CRUD)
- Category management
- Image uploads
- Dashboard statistics
- Contact message viewing

---

## 🔐 Admin Access

1. Register at: `http://localhost:3000/admin/login`
2. Update user role in database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```
3. Login to admin panel

---

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- React Router 7.10.1
- Vite 7.2.4
- CSS3

### Backend
- Node.js + Express 5.2.1
- MySQL 2 (mysql2)
- JWT Authentication
- Multer (file uploads)
- bcryptjs (password hashing)

---

## 📁 Project Structure

```
liqued-project/
├── liqued-backend/          # Backend server
│   └── server/
│       ├── config/          # Database config
│       ├── controllers/     # Route handlers
│       ├── models/          # Data models
│       ├── routes/          # API routes
│       ├── middleware/      # Auth & upload
│       ├── uploads/         # Product images
│       └── database.sql     # Database schema
│
├── my-liquedd/              # Frontend app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utilities
│   └── public/
│
└── INTEGRATION_GUIDE.md     # Full integration docs
```

---

## 🔗 API Endpoints

### Public
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - Get categories
- `POST /api/contact` - Submit contact form
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login

### Admin (Requires Auth)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/auth/profile` - Get user profile

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=liqued_db
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🧪 Testing

### Backend
```bash
cd liqued-backend/server
npm test
```

### Frontend
```bash
cd my-liquedd
npm run lint
npm run build
```

---

## 🚢 Deployment

### Backend
1. Set environment variables on hosting platform
2. Run database migrations
3. Deploy to Node.js hosting (Heroku, DigitalOcean, etc.)

### Frontend
1. Update `VITE_API_BASE_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `dist` folder to static hosting (Vercel, Netlify, etc.)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Akalanka Jayasinghe**
- GitHub: [@AkalankaJayasinghe](https://github.com/AkalankaJayasinghe)

---

## 🙏 Acknowledgments

- React Team
- Express.js Team
- MySQL Team
- All open-source contributors

---

**Need Help?** Check the [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) or open an issue!
