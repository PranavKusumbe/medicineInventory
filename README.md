# 💊 Medicine Inventory Management System

A modern, full-stack medicine inventory management website with **world-class animations**, real-time expiry tracking, automated status updates, and cinematic user experience.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Animations](https://img.shields.io/badge/Animations-GSAP%20%2B%20Framer%20Motion-purple)

## ✨ Features

- 🔄 **Real-Time Auto-Expiry**: Automatic status updates for expired medicines
- 📊 **Live Analytics**: Dynamic dashboard with animated counters and glassmorphism cards
- 💳 **CRUD Operations**: Complete medicine management with layout animations
- 🔍 **Advanced Search & Filter**: Find medicines instantly
- 📱 **Responsive Design**: Beautiful UI across all devices
- ⚡ **World-Class Animations**: 
  - Custom cursor with multiple states
  - 3D medical symbol with React Three Fiber
  - Smooth scrolling with Lenis
  - Parallax effects and scroll-triggered animations
  - Magnetic buttons and 3D card tilts
  - Glassmorphism with cursor tracking
  - Floating particles and gradient overlays
- 🎨 **Modern Design**: Glassmorphism, gradients, and premium aesthetics inspired by Stripe and Obys

## 🧭 Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool (lightning-fast HMR)
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Layout animations & gestures
- **GSAP + ScrollTrigger** - Advanced scroll animations
- **React Three Fiber** - 3D graphics with Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Lenis** - Buttery smooth scrolling
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM with middleware for auto-expiry
- **node-cron** - Scheduled tasks (midnight expiry checks)

## 🎨 Animation Features

### Custom Cursor System
- Multi-state cursor (default, hover, text)
- Follows mouse with smooth spring physics
- Mix-blend-mode for visual effects
- Adapts to interactive elements

### 3D Medical Symbol (Hero Section)
- Interactive 3D medical cross using React Three Fiber
- Mouse parallax effect
- Floating animation with rotating geometry
- Orbiting particle system

### Smooth Scrolling
- Lenis integration for buttery smooth scrolling
- Synchronized with GSAP ScrollTrigger
- Custom easing (easeOutExpo)
- 60fps performance

### Analytics Dashboard
- Glassmorphism cards with 3D tilt on hover
- Cursor-tracking parallax effect
- Animated counters with spring physics
- Floating particles on hover
- Pulsing border glow effects

### Inventory Cards
- Layout animations with Framer Motion
- Slide-in action buttons on hover
- Gradient shine effect
- Status badges with pulse animation
- Smooth expand/collapse transitions

### Navigation
- Magnetic button effect (follows cursor)
- Scroll shrink with backdrop blur
- Animated logo with shine effect
- Underline hover effects on links

### Footer
- Floating gradient orbs
- Animated gradient top border
- 3D social icon hover effects
- Staggered reveal animations

## 📁 Project Structure

```
medicineInventory/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Navbar.jsx        # Magnetic nav with scroll effects
│   │   │   ├── Hero.jsx          # 3D hero with parallax
│   │   │   ├── Hero3D.jsx        # 3D medical symbol (R3F)
│   │   │   ├── Analytics.jsx     # Glassmorphism cards with tilt
│   │   │   ├── Inventory.jsx     # Layout animations
│   │   │   ├── Features.jsx      # Scroll storytelling
│   │   │   ├── Footer.jsx        # Floating orbs
│   │   │   └── CustomCursor.jsx  # Multi-state cursor
│   │   ├── hooks/         # Custom React hooks
│   │   │   └── useSmoothScroll.js  # Lenis integration
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles with animations
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Node.js backend
│   ├── models/            # Mongoose models
│   │   └── Medicine.js
│   ├── routes/            # API routes
│   │   └── medicines.js
│   ├── config/            # Configuration files
│   │   ├── database.js
│   │   └── seed.js
│   ├── server.js          # Entry point
│   └── package.json
│
├── assets/                # Images and static files
├── Instruction.md         # Original project requirements
├── step2.md              # Animation upgrade instructions
└── README.md             # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Clone Repository
```bash
git clone <repository-url>
cd medicineInventory
```

### 2️⃣ Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Copy from .env.example and configure your MongoDB URI
cp .env.example .env

# Edit .env file with your settings:
# MONGODB_URI=mongodb://localhost:27017/medicineInventory
# PORT=5000
# NODE_ENV=development
```

### 3️⃣ Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install
```

### 4️⃣ MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in server/.env

### 5️⃣ Seed Database (Optional)

```bash
# From server directory
node -e "import('./config/database.js').then(db => db.default()).then(() => import('./config/seed.js')).then(seed => seed.seedDatabase(true)).then(() => process.exit(0))"
```

Or create a seed script:
```javascript
// server/seed-db.js
import connectDB from './config/database.js';
import { seedDatabase } from './config/seed.js';

connectDB().then(async () => {
  await seedDatabase(true);
  process.exit(0);
});
```

Then run:
```bash
node seed-db.js
```

## 🎮 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Client runs on http://localhost:3000
```

### Production Mode

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 🔌 API Endpoints

### Medicines

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/medicines` | Get all medicines (with pagination, search, filter) |
| GET | `/api/medicines/:id` | Get single medicine |
| POST | `/api/medicines` | Create new medicine |
| PUT | `/api/medicines/:id` | Update medicine |
| DELETE | `/api/medicines/:id` | Delete medicine |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/medicines/analytics` | Get analytics data |

### Query Parameters (GET /api/medicines)

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by name or category
- `category` - Filter by category
- `status` - Filter by status (active/expired)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order (asc/desc)

### Example Requests

**Create Medicine:**
```bash
curl -X POST http://localhost:5000/api/medicines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aspirin 100mg",
    "category": "Pain Relief",
    "quantity": 150,
    "expiryDate": "2025-12-31",
    "price": 9.99
  }'
```

**Get Analytics:**
```bash
curl http://localhost:5000/api/medicines/analytics
```

## 🧠 Auto-Expiry Logic

The system uses multiple layers to ensure expired medicines are automatically marked:

### 1. Mongoose Middleware
- `pre('save')` - Checks expiry on document creation
- `pre('findOneAndUpdate')` - Checks expiry on updates

### 2. Scheduled Tasks
- Runs daily at midnight using `node-cron`
- Checks all medicines and updates expired status
- Also runs on server startup

### 3. Manual Trigger
```bash
curl -X POST http://localhost:5000/api/medicines/check-expiry
```

## 📊 Database Schema

### Medicine Collection

```javascript
{
  name: String,           // Medicine name
  category: String,       // Category (Pain Relief, Antibiotic, etc.)
  quantity: Number,       // Stock quantity
  expiryDate: Date,       // Expiry date
  price: Number,          // Unit price
  status: String,         // 'active' or 'expired'
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) to Purple (#8b5cf6) gradient
- **Medical Green**: #10b981
- **Medical Blue**: #3b82f6
- **Teal**: #14b8a6
- **Indigo**: #6366f1

### Animation System
- **GSAP + ScrollTrigger**: Scroll-based parallax, pinning, and scrubbing animations
- **Framer Motion**: Layout animations, gesture-based interactions, spring physics
- **React Three Fiber**: 3D graphics and WebGL animations
- **Lenis**: Buttery smooth scrolling with custom easing
- **Hardware Acceleration**: All animations use `transform` and `opacity` for 60fps performance

### Key Animation Patterns
1. **Parallax Scrolling**: Different scroll speeds for depth
2. **Stagger Reveals**: Sequential element animations
3. **Magnetic Elements**: Buttons that follow cursor
4. **3D Card Tilts**: Perspective transforms on hover
5. **Glassmorphism + Tilt**: Cards that respond to cursor position
6. **Layout Animations**: Smooth expand/collapse with Framer Motion
7. **Scroll Storytelling**: Content that reveals as you scroll

### UI Components
- **Glassmorphism cards**: Frosted glass effect with backdrop blur
- **Custom Cursor**: Multi-state cursor system with spring physics
- **3D Elements**: React Three Fiber medical symbols
- **Gradient text**: Animated color transitions
- **Hover effects**: Scale, glow, tilt
- **Responsive grid**: Mobile-first design

## 🔧 Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/medicineInventory
PORT=5000
NODE_ENV=development
```

### Client (.env) - Optional
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
mongosh

# If using Atlas, verify:
# 1. Network access (whitelist IP)
# 2. Database user credentials
# 3. Connection string format
```

### Port Already in Use
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### npm Install Errors
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📝 Sample Data

The seed file includes 12 sample medicines with various categories:
- Pain Relief (Paracetamol, Ibuprofen, Aspirin)
- Antibiotics (Amoxicillin, Azithromycin)
- Antihistamines (Cetirizine, Loratadine)
- Cardiovascular (Lisinopril)
- Gastrointestinal (Omeprazole)
- Diabetes (Metformin)
- Supplements (Vitamin D3, Multivitamin)

## 🚀 Deployment

### Backend (Heroku/Render)
1. Create account on hosting platform
2. Connect repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build project: `npm run build`
2. Deploy `dist` folder
3. Configure environment variables
4. Set API URL

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)

## 🎬 Animation Upgrade (v2.0)

The frontend was upgraded with world-class animations inspired by premium sites like Stripe and Obys. Key enhancements:

### New Dependencies
```bash
npm install @react-three/fiber @react-three/drei three lenis --legacy-peer-deps
```

### Component Upgrades

**Hero Section:**
- 3D medical symbol with React Three Fiber
- Multi-layer parallax scrolling
- Mouse-tracking parallax effects
- GSAP timeline animations

**Analytics Dashboard:**
- Glassmorphism cards with 3D cursor tilt
- Scroll-triggered counter animations
- Floating particle effects on hover
- Pulsing border glow

**Inventory Cards:**
- Layout animations (smooth expand/collapse)
- Slide-in action buttons
- Gradient shine effects
- Status badge pulse

**Navigation:**
- Magnetic button effect
- Scroll-triggered shrink with backdrop blur
- Animated logo with shine
- Underline hover effects

**Footer:**
- Floating gradient orbs
- Animated gradient border
- 3D social icon rotations
- Staggered reveal animations

### Custom Features
- **Multi-state cursor** that adapts to context
- **Smooth scrolling** with Lenis (60fps)
- **Hardware-accelerated** animations
- **Scroll storytelling** with GSAP ScrollTrigger

All backend functionality remains unchanged - only visual enhancements!

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for modern medicine inventory management

## 🎯 Future Enhancements

- [ ] User authentication & authorization
- [ ] Multi-pharmacy support
- [ ] Email/SMS notifications for expiring medicines
- [ ] QR code generation for medicines
- [ ] Barcode scanning integration
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Export reports (PDF/Excel)
- [ ] Advanced analytics & charts
- [ ] Batch operations for inventory

---

**Version:** 2.0 (World-Class Animations)  
**Last Updated:** 2024  
Built with ❤️ for modern medicine inventory management
- [ ] Supplier management
- [ ] Purchase orders
- [ ] Sales tracking
- [ ] Report generation (PDF/Excel)
- [ ] Dark/Light theme toggle
- [ ] Mobile app (React Native)

---

**Note**: Make sure MongoDB is running before starting the backend server. The application will not work without a database connection.

For any issues or questions, please open an issue on the repository.
