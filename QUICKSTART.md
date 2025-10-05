# 🚀 Quick Start Guide

## Prerequisites Check
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed or Atlas account
- [ ] Git (optional)

## Setup Steps

### 1. Install Dependencies

```powershell
# Install root dependencies (for concurrent running)
npm install

# Install all dependencies at once
npm run install:all
```

Or install separately:

```powershell
# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment

The `.env` file is already created in the `server` folder with default settings:
```
MONGODB_URI=mongodb://localhost:27017/medicineInventory
PORT=5000
NODE_ENV=development
```

**If using MongoDB Atlas:**
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

### 3. Start MongoDB

**If using local MongoDB:**
```powershell
# Start MongoDB service
mongod
```

**If using MongoDB Atlas:**
- No action needed, it's cloud-hosted

### 4. Seed Database (Optional but Recommended)

```powershell
cd server
node seed-db.js
cd ..
```

This creates 12 sample medicines with various statuses.

### 5. Run Application

**Option A: Run Both (Recommended)**
```powershell
# From root directory
npm run dev
```

This runs both backend and frontend concurrently.

**Option B: Run Separately**

Terminal 1 - Backend:
```powershell
cd server
npm run dev
```

Terminal 2 - Frontend:
```powershell
cd client
npm run dev
```

### 6. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🎯 What You Should See

1. **Hero Section** - Large animated gradient heading
2. **Analytics** - Real-time counters showing:
   - Total Stock Value
   - Total Medicines
   - Soon to Expire
   - Expired Items
3. **Inventory** - Grid of medicine cards with:
   - Search functionality
   - Filter by status
   - Add/Edit/Delete operations
4. **Features** - Showcase of system capabilities
5. **Footer** - Links and information

## 🧪 Test the Auto-Expiry Feature

### Manual Trigger:
```powershell
curl -X POST http://localhost:5000/api/medicines/check-expiry
```

Or visit in browser and check console:
- The server runs expiry check on startup
- Scheduled to run daily at midnight
- Automatically runs when creating/updating medicines

### Add an Expired Medicine:
1. Click "Add Medicine" button
2. Fill form with a past expiry date
3. Submit
4. Notice the status is automatically "Expired"

## 📱 Test Responsive Design

1. Open browser DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Try different screen sizes
4. All sections should adapt beautifully

## 🔍 API Testing

### Get All Medicines:
```powershell
curl http://localhost:5000/api/medicines
```

### Search Medicines:
```powershell
curl "http://localhost:5000/api/medicines?search=aspirin"
```

### Filter by Status:
```powershell
curl "http://localhost:5000/api/medicines?status=expired"
```

### Get Analytics:
```powershell
curl http://localhost:5000/api/medicines/analytics
```

### Create Medicine:
```powershell
curl -X POST http://localhost:5000/api/medicines -H "Content-Type: application/json" -d "{\"name\":\"Test Medicine\",\"category\":\"Test\",\"quantity\":100,\"expiryDate\":\"2025-12-31\",\"price\":10.99}"
```

## ❗ Common Issues

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- If using Atlas, verify IP whitelist

### "Port 5000 already in use"
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Port 3000 already in use"
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Animations not working
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check browser console for errors

### CSS not loading properly
```powershell
# Rebuild client
cd client
npm run build
npm run dev
```

## 🎨 Customization

### Change Colors:
Edit `client/tailwind.config.js`

### Change Database Name:
Edit `MONGODB_URI` in `server/.env`

### Change Ports:
- Backend: Edit `PORT` in `server/.env`
- Frontend: Edit `server.port` in `client/vite.config.js`

## 📦 Build for Production

```powershell
# Build frontend
cd client
npm run build

# The dist folder contains production-ready files
```

## 🎉 Success Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected successfully
- [ ] Sample medicines visible in inventory
- [ ] Analytics showing correct numbers
- [ ] Can add/edit/delete medicines
- [ ] Search and filter working
- [ ] Animations smooth and beautiful
- [ ] Expired medicines marked correctly

## 🆘 Need Help?

1. Check the console for error messages
2. Verify all dependencies installed: `npm list`
3. Ensure MongoDB is accessible
4. Review the full README.md for detailed info

---

**Enjoy your Medicine Inventory Management System! 💊✨**
