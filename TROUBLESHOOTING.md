# 🔧 Quick Troubleshooting Guide

## Common Issues & Solutions

---

### 🚫 Backend Won't Start

**Error:** `Error connecting to database`

**Solutions:**
1. Check MySQL is running:
   ```bash
   # Windows
   net start MySQL80
   
   # Check status
   mysql -u root -p
   ```

2. Verify database exists:
   ```sql
   SHOW DATABASES;
   USE liqued_db;
   ```

3. Check `.env` file in `liqued-backend/server/`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_password
   DB_NAME=liqued_db
   ```

4. Create database if missing:
   ```bash
   cd liqued-backend/server
   mysql -u root -p < database.sql
   ```

---

### 🚫 Frontend Can't Connect to Backend

**Error:** `Failed to fetch products` or `Network Error`

**Solutions:**
1. Verify backend is running on port 5000:
   ```
   Visit: http://localhost:5000/api/health
   Should show: {"status":"OK","message":"Server is running"}
   ```

2. Check Vite proxy in `my-liquedd/vite.config.js`:
   ```javascript
   proxy: {
     '/api': {
       target: 'http://localhost:5000',
       changeOrigin: true
     }
   }
   ```

3. Restart both servers:
   ```bash
   # Stop both (Ctrl+C)
   # Start backend first
   cd liqued-backend/server
   npm start
   
   # Then start frontend
   cd my-liquedd
   npm run dev
   ```

---

### 🚫 CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solutions:**
1. Backend already has CORS enabled - just restart it
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try in incognito mode
4. Check backend console for error messages

---

### 🚫 Login Not Working

**Error:** `Invalid credentials` or `Invalid token`

**Solutions:**

1. **First time?** Create admin user:
   ```sql
   # Register via UI first, then:
   UPDATE users SET role = 'admin' 
   WHERE email = 'your@email.com';
   ```

2. **Token expired?** 
   - Logout and login again
   - Tokens expire after 24 hours

3. **Check JWT_SECRET** in backend `.env`:
   ```env
   JWT_SECRET=your-long-random-secret-key
   ```

4. **Clear localStorage:**
   ```javascript
   // Browser console (F12)
   localStorage.clear()
   ```

---

### 🚫 Images Not Uploading

**Error:** `File size too large` or images don't show

**Solutions:**

1. **Check file size** (max 5MB):
   - Use images under 5MB
   - Supported: JPG, PNG, GIF, WebP

2. **Verify uploads folder exists:**
   ```bash
   cd liqued-backend/server
   # Should exist, if not:
   mkdir uploads
   ```

3. **Check file permissions:**
   ```bash
   # Windows - uploads folder should be writable
   ```

4. **Verify image URLs** in database:
   ```sql
   SELECT id, name, image_url FROM products;
   # Should show: /uploads/image-123456.jpg
   ```

---

### 🚫 Products Not Showing

**Error:** Empty product list or "No products found"

**Solutions:**

1. **Check database has products:**
   ```sql
   SELECT COUNT(*) FROM products;
   ```

2. **Add test product via admin panel:**
   - Login to http://localhost:3000/admin/login
   - Go to Product Management
   - Add a product

3. **Check API response:**
   ```
   Visit: http://localhost:5000/api/products
   Should return JSON with products array
   ```

4. **Check browser console** (F12) for errors

---

### 🚫 Admin Panel Redirects to Login

**Error:** Constantly redirected even after login

**Solutions:**

1. **Check if user is admin:**
   ```sql
   SELECT email, role FROM users 
   WHERE email = 'your@email.com';
   ```

2. **Update role if needed:**
   ```sql
   UPDATE users SET role = 'admin' 
   WHERE email = 'your@email.com';
   ```

3. **Clear browser data:**
   - Clear cookies
   - Clear localStorage
   - Try incognito mode

4. **Check token in localStorage:**
   ```javascript
   // Browser console (F12)
   localStorage.getItem('authToken')
   localStorage.getItem('userData')
   ```

---

### 🚫 Port Already in Use

**Error:** `Port 3000 is already in use` or `Port 5000 is already in use`

**Solutions:**

1. **Find and kill process:**
   ```bash
   # Windows - Find process on port 5000
   netstat -ano | findstr :5000
   # Kill it (use PID from output)
   taskkill /PID <PID> /F
   
   # Same for port 3000
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Or change ports:**
   
   **Backend** - edit `liqued-backend/server/.env`:
   ```env
   PORT=5001
   ```
   
   **Frontend** - edit `my-liquedd/vite.config.js`:
   ```javascript
   server: {
     port: 3001,
     proxy: {
       '/api': 'http://localhost:5001'
     }
   }
   ```

---

### 🚫 npm install Fails

**Error:** Various npm errors during installation

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and try again:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Use correct Node version:**
   ```bash
   node --version
   # Should be v16 or higher
   ```

4. **Check network connection:**
   - Try with VPN off
   - Check if npm registry is accessible

---

### 🚫 Contact Form Not Submitting

**Error:** Form submission fails or no response

**Solutions:**

1. **Check network tab** (F12 → Network):
   - Look for POST to `/api/contact`
   - Check response status and body

2. **Verify all fields filled:**
   - Name (required)
   - Email (required, valid format)
   - Subject (required)
   - Message (required, min 10 chars)

3. **Check backend logs:**
   ```bash
   # Backend terminal should show:
   Contact message sent successfully
   ```

4. **Check database:**
   ```sql
   SELECT * FROM contact_messages 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

---

### 🚫 Categories Not Loading

**Error:** Category dropdown empty in admin

**Solutions:**

1. **Add categories to database:**
   ```sql
   INSERT INTO categories (name, description) VALUES
   ('Soft Drinks', 'Carbonated beverages'),
   ('Juices', 'Fresh fruit juices'),
   ('Energy Drinks', 'Energy boosting drinks'),
   ('Water', 'Still and sparkling water');
   ```

2. **Check API endpoint:**
   ```
   Visit: http://localhost:5000/api/categories
   ```

3. **Verify categoryService:**
   - Check browser console for errors
   - Check network tab for API call

---

## 🔍 Debugging Tips

### Check Backend Health
```bash
curl http://localhost:5000/api/health
# or visit in browser
```

### Check Frontend Build
```bash
cd my-liquedd
npm run build
# Should complete without errors
```

### View Backend Logs
- Backend terminal shows all API requests
- Look for error messages in red

### View Frontend Logs
- Browser console (F12)
- Check Console tab for errors
- Check Network tab for failed requests

### Database Queries
```sql
-- Check all tables
SHOW TABLES;

-- Count records
SELECT 
  (SELECT COUNT(*) FROM users) as users,
  (SELECT COUNT(*) FROM products) as products,
  (SELECT COUNT(*) FROM categories) as categories,
  (SELECT COUNT(*) FROM contact_messages) as messages;
```

---

## 📞 Still Having Issues?

1. **Check the logs:**
   - Backend terminal output
   - Browser console (F12)
   - Network tab (F12)

2. **Read the documentation:**
   - [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
   - [README.md](./README.md)

3. **Verify setup:**
   - Run `setup.bat` again
   - Check all `.env` files
   - Restart both servers

4. **Create an issue:**
   - Include error messages
   - Include steps to reproduce
   - Include environment details

---

**Most issues are solved by restarting both servers!** 🔄
