# Medicine Inventory Management Website - Project Instructions

## 🧠 TASK

Build a fully functional, modern Medicine Inventory Management Website with a premium, animated frontend and a MongoDB backend.
The backend must automatically mark expired medicines by checking expiry dates in real time.

## 🧭 1. Tech Stack & Project Setup

### Frontend:
- React + Vite + Tailwind CSS
- GSAP or Framer Motion → page transitions & micro-animations
- Lenis or Locomotive Scroll → smooth scrolling effects

### Backend:
- Node.js + Express.js

### Database:
- MongoDB (no SQL / other DBs allowed)

### Project Structure:
```
/client   → React frontend
/server   → Node + Express backend
.env      → for MongoDB URI and other secrets
```

### Other Requirements:
- Use environment variables for sensitive info (e.g., MongoDB URI).
- Code must be modular, clean, and well-commented.

## ✨ 2. Frontend Design & Animation Style

### Hero Section:
- Large animated gradient headline (blue-purple or teal-indigo)
- Smooth fade-in entrance animations
- Sticky navigation bar that shrinks on scroll
- Abstract shapes or gradient backgrounds

### Page Transitions:
- Seamless fade / slide / reveal transitions between pages (GSAP / Framer Motion)
- Parallax scrolling for immersive storytelling

### Animations & Interactions:
- Scroll-triggered reveals (cards slide or fade in)
- Animated gradient text on headings
- Cursor hover effects (scale, glow, tilt)
- Staggered entrance animations for sections

### Cards & UI Elements:
- Glassmorphism or subtle shadow cards for medicine info
- Hover effects (scale, glow, rotate, blur)
- Responsive grid layout

### Color & Typography:
- Palette: white, light gray, medical greens & blues, gradient accents
- Bold Sans Serif headings, clean readable body text
- Grid-based layout with ample whitespace

### Overall Aesthetic:
Modern • Futuristic • Smooth • Elegant → like a blend of SaaS Dashboard + modern design agency.

## 📊 3. Core Frontend Sections

- Hero Section → Gradient headline, CTA, animated background
- Medicine Inventory Dashboard → CRUD cards with animations
- Analytics Section → Real-time counters and charts for key stats
- Testimonials / Features Carousel → Horizontal scroll / GSAP timeline
- Footer → Animated gradient line, links, socials

## 🧠 4. MongoDB Database Functionality

### Collection: medicines

### Schema Fields:
- name: String
- category: String
- quantity: Number
- expiryDate: Date
- price: Number
- status: String → "active" or "expired"

### API Endpoints (CRUD):
- POST /api/medicines → Add new medicine
- GET /api/medicines → Get all medicines (with pagination, search, and filter)
- PUT /api/medicines/:id → Update medicine details
- DELETE /api/medicines/:id → Delete a medicine

### Search & Filter:
- Search by name or category
- Filter by expiry date range

## 🧠 5. Automatic Expiry Status Logic

### Goal:
Automatically update status to "expired" when expiryDate < current date, without manual intervention.

### Implementation Options:
- MongoDB Middleware / Hooks: Run checks during insert or update. If expiryDate is past, mark status as "expired".
- MongoDB Change Streams: Watch the medicines collection. On any insert or update, automatically check and update the status.

### Expected Behavior:
- On insert → expired medicines are immediately marked "expired".
- On update → if a medicine becomes expired, status changes in real time.
- A scheduled daily check can be used to catch previously missed entries.

## 📈 6. Analytics

The Analytics section must calculate and display the following metrics dynamically:

- **Total Stock Value**: Sum of price × quantity for all active medicines
- **Soon-to-Expire Count**: Number of medicines whose expiryDate falls within the next 30 days
- **Expired Count**: Number of medicines currently marked as expired

These values must update automatically when the database changes (e.g., via change streams, re-fetching, or periodic polling). Display them on the dashboard using animated counters and charts.

## 🧰 7. Expected Final Output

✅ Modern, animated frontend with smooth transitions and premium design
✅ Fully functional backend with CRUD and real-time auto-expiry logic
✅ Proper folder structure (/client & /server)
✅ .env for MongoDB connection
✅ README.md with:
  - Tech stack
  - Setup instructions (client + server)
  - MongoDB URI usage
  - Sample data seeding steps

## ❗ Important Notes

- Use only MongoDB for all DB operations.
- Prioritize animation quality and smooth frontend UX.
- Auto-expiry logic must be reliable and implemented in backend.
- No optional or bonus sections — all listed features are required.
