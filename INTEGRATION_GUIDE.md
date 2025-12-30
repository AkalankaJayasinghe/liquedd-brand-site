# 🔗 Frontend-Backend Integration Guide

## ✅ Integration Complete!

Your Liqued frontend and backend are now fully connected and ready to use.

---

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd liqued-backend/server
npm install
npm start
```

**Backend runs on:** `http://localhost:5000`

### 2. Start the Frontend

```bash
cd my-liquedd
npm install
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

---

## 📋 What Was Fixed

### ✅ Configuration
- ✅ Vite proxy configured to route `/api` to backend
- ✅ Environment variables setup (`.env` and `.env.example`)
- ✅ API service updated to use Vite env vars

### ✅ Services Layer
- ✅ **authService.js** - Created for authentication (login, register, logout)
- ✅ **productService.js** - Updated to use real API (removed mock data)
- ✅ **contactService.js** - Updated to use real API (fixed field names)
- ✅ **categoryService.js** - Created for category management

### ✅ Admin Panel
- ✅ **Login.jsx** - Admin authentication page
- ✅ **Dashboard.jsx** - Admin dashboard with stats
- ✅ **ProductManagement.jsx** - Full CRUD for products

### ✅ Routing
- ✅ Admin routes added (`/admin/login`, `/admin/dashboard`, `/admin/products`)
- ✅ Public routes remain unchanged
- ✅ Admin pages don't show header/footer

### ✅ Data Structure
- ✅ Fixed field name mismatch: `fullName` → `name` in contact form
- ✅ Products now use `category_id` from backend
- ✅ Image uploads use `image_url` field

---

## 🔐 Admin Access

### Create Admin User

You need to create an admin user directly in the database:

```sql
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@liquedd.com', '$2a$10$YourHashedPasswordHere', 'admin');
```

**Or register normally and update role:**

1. Go to `http://localhost:3000/admin/login`
2. Click "Register"
3. Create account
4. Update in database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'youremail@example.com';
```

### Login

- **URL:** `http://localhost:3000/admin/login`
- **Email:** Your admin email
- **Password:** Your password

---

## 📁 Project Structure

```
my-liquedd/
├── .env                          # ✅ NEW - Environment variables
├── .env.example                  # ✅ NEW - Environment template
├── vite.config.js               # ✅ UPDATED - Added proxy
├── src/
│   ├── App.jsx                  # ✅ UPDATED - Admin routes added
│   ├── services/
│   │   ├── apiService.js        # ✅ UPDATED - Vite env vars
│   │   ├── authService.js       # ✅ NEW - Authentication
│   │   ├── productService.js    # ✅ UPDATED - Real API calls
│   │   ├── contactService.js    # ✅ UPDATED - Real API calls
│   │   └── categoryService.js   # ✅ NEW - Category management
│   └── components/
│       └── pages/
│           └── admin/           # ✅ NEW - Admin components
│               ├── Login.jsx
│               ├── Login.css
│               ├── Dashboard.jsx
│               ├── Dashboard.css
│               ├── ProductManagement.jsx
│               └── ProductManagement.css
```

---

## 🎯 API Endpoints Connected

### Public Endpoints
| Method | Endpoint | Frontend Service | Status |
|--------|----------|-----------------|--------|
| GET | `/api/products` | productService | ✅ |
| GET | `/api/products/:id` | productService | ✅ |
| GET | `/api/categories` | categoryService | ✅ |
| POST | `/api/contact` | contactService | ✅ |
| POST | `/api/auth/register` | authService | ✅ |
| POST | `/api/auth/login` | authService | ✅ |

### Admin Endpoints (Require Auth)
| Method | Endpoint | Frontend Service | Status |
|--------|----------|-----------------|--------|
| POST | `/api/products` | productService | ✅ |
| PUT | `/api/products/:id` | productService | ✅ |
| DELETE | `/api/products/:id` | productService | ✅ |
| GET | `/api/auth/profile` | authService | ✅ |

---

## 🔧 Features Available

### For Visitors
- ✅ Browse products
- ✅ Filter by category
- ✅ Search products
- ✅ Submit contact form
- ✅ View company information

### For Admins
- ✅ Login/Logout
- ✅ View dashboard
- ✅ Create products (with image upload)
- ✅ Edit products
- ✅ Delete products
- ✅ View all products
- ✅ Category management (via API)

---

## 🎨 Database Setup

Make sure your MySQL database is set up:

1. **Create database:**
```sql
CREATE DATABASE liqued_db;
```

2. **Run the schema:**
```bash
cd liqued-backend/server
mysql -u root -p liqued_db < database.sql
```

3. **Verify tables:**
```sql
USE liqued_db;
SHOW TABLES;
```

You should see:
- users
- categories
- products
- contact_messages

---

## 🐛 Troubleshooting

### Backend Connection Failed
```
Error: Failed to fetch products
```
**Solution:** Make sure backend is running on port 5000

### CORS Errors
**Solution:** Backend already has CORS enabled, restart both servers

### Images Not Showing
**Solution:** 
- Check `/uploads` folder exists in backend
- Verify image paths start with `/uploads/`
- Ensure Vite proxy includes `/uploads`

### Authentication Issues
```
Error: Invalid or expired token
```
**Solution:** 
- Login again
- Check if JWT_SECRET is set in backend `.env`
- Token expires after 24 hours

---

## 🔒 Security Notes

⚠️ **Before Production:**

1. **Environment Variables**
   - Set strong `JWT_SECRET` in backend `.env`
   - Don't commit `.env` files to Git

2. **Database**
   - Use strong database passwords
   - Don't use `root` user in production

3. **Backend**
   - Add rate limiting
   - Enable HTTPS
   - Validate all inputs
   - Add helmet.js for security headers

4. **Frontend**
   - Update `VITE_API_BASE_URL` to production URL
   - Enable production builds

---

## 📝 Next Steps

### Recommended Enhancements:

1. **Add pagination** to products list
2. **Image optimization** before upload
3. **Search functionality** on products page
4. **Email notifications** for contact form
5. **Password reset** functionality
6. **User profile** management
7. **Order management** system
8. **Analytics dashboard** with real stats

---

## 🎉 You're All Set!

Your full-stack e-commerce application is now ready to use!

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Admin: `http://localhost:3000/admin/login`

Happy coding! 🚀
