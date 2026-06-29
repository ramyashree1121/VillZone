# VillZone: Full Codebase Walkthrough

This document provides a comprehensive tour of the entire VillZone project source code. It is designed to help new developers understand the architecture, data flow, and file structure of both the frontend client and the backend server.

---

## 1. Project Root Directory
The project is split into two primary workspaces:
- `frontend/`: The React + Vite application.
- `backend/`: The Node.js + Express API server.

Both operate independently but communicate over standard HTTP REST protocols.

---

## 2. Frontend Walkthrough (`/frontend`)

The frontend is a modern React Single Page Application (SPA).

### Key Configuration Files
- `package.json`: Contains scripts like `npm run dev` (starts Vite) and dependencies (React, Tailwind, Framer Motion, Recharts).
- `vite.config.js`: Configuration for the Vite bundler.
- `tailwind.config.js` / PostCSS: Configures the Tailwind utility classes and any custom themes (like the primary/secondary colors).
- `.env`: Contains `VITE_API_URL` which points to the backend server (e.g., `http://localhost:5000`).

### Entry Point & Routing
- `src/main.jsx`: The absolute entry point. Mounts the React application to the DOM.
- `src/App.jsx`: The root component. It handles the global layout (Navbar, Footer) and defines all the application routes using **React Router**.
  - **Public Routes**: `/`, `/about`, `/management`, `/uniform`, `/gallery`, etc.
  - **Protected Admin Routes**: `/admin`, `/admin/dashboard` (wrapped in authentication logic).

### Pages (`src/pages/`)
These are the top-level route components.
- `Home.jsx`: The complex landing page featuring a hero slider, statistics counters, and dynamically fetched notices and principal messages.
- `Management.jsx` / `Uniform.jsx`: Public pages that fetch specific data from the backend (like the Leadership API) and render them using grid layouts and animations.
- `AdminDashboard.jsx`: The core of the backend management UI. It maintains state for which "Tab" is active and renders the corresponding component.

### Components (`src/components/`)
Reusable UI elements.
- `AnimatedSection.jsx`: A wrapper component utilizing **Framer Motion** to trigger fade-in and slide-up animations when the element scrolls into view.
- `Navbar.jsx` / `Footer.jsx`: Global navigation elements.
- `admin/`: Contains all the individual CRUD management tabs for the dashboard (e.g., `LeadershipTab.jsx`, `FacultyTab.jsx`, `SettingsTab.jsx`).

---

## 3. Backend Walkthrough (`/backend`)

The backend is a monolithic Express.js server that handles REST API requests, database connections, and file uploads.

### Key Configuration Files
- `package.json`: Contains the `npm run dev` script (runs nodemon/node).
- `.env`: Typically contains `PORT`, `MONGO_URI`, and `JWT_SECRET`.

### Entry Point & Core Setup
- `server.js`: This is the massive core file of the backend. It contains almost all of the backend logic in one place.
  - **Express Setup**: Initializes the app, configures CORS, and sets up JSON parsing.
  - **Static Files**: Uses `app.use('/uploads', express.static(...))` to serve uploaded images directly to the frontend.
  - **Multer**: Configures disk storage for file uploads (saving them to the `/uploads` directory with unique timestamps).

### Database & Models (`backend/models/Schemas.js`)
The backend uses **Mongoose** to define schemas for MongoDB.
- Contains schemas for: `User`, `Settings`, `Notice`, `Event`, `Gallery`, `Staff`, `Syllabus`, and `Leadership`.
- These schemas dictate the structure of the data and include timestamps automatically.

### The "Offline" Fallback Mechanism
A highly unique aspect of `server.js` is the `isDbConnected` flag and `memoryStorage` object.
- **Connection Attempt**: On startup, the server tries to connect to MongoDB. If it succeeds, `isDbConnected = true`. If it fails (e.g., running locally without a DB), `isDbConnected = false`.
- **The Fallback**: Every single API route (GET, POST, PUT, DELETE) checks `isDbConnected`. 
  - If true, it performs standard Mongoose operations (e.g., `Leadership.find()`).
  - If false, it performs array manipulation on the `memoryStorage` object (e.g., `memoryStorage.leadership.push(...)`).
- This brilliant pattern ensures the UI never breaks and can be developed/demoed completely offline.

### Authentication & Middleware
- `authenticateToken`: A custom middleware function that intercepts requests to protected routes. It reads the `Authorization` header, verifies the **JWT**, and attaches the decoded user data to `req.user`.
- Passwords for the admin accounts are hashed using **bcrypt.js** before saving and verified during login.

### API Routes Architecture
The routes in `server.js` follow standard REST patterns:
- **Public Routes**: `GET /api/leadership`, `GET /api/gallery`, etc. (No authentication required).
- **Protected Routes**: `POST /api/leadership`, `PUT /api/leadership/:id`, `DELETE ...` (Wrapped with `authenticateToken`).

---

## 4. Data Flow Example: Adding a Leadership Member

To tie it all together, here is exactly what happens when an Admin adds a new Leadership member:

1. **Frontend Action**: Admin fills out the form in `LeadershipTab.jsx` and clicks "Save".
2. **API Call**: The frontend sends a `POST` request to `${VITE_API_URL}/api/leadership` with the JSON payload and the `Authorization: Bearer <token>` header.
3. **Backend Middleware**: Express receives the request. `authenticateToken` validates the JWT.
4. **Backend Route**: The `POST /api/leadership` route handler runs.
   - If connected to MongoDB, it instantiates `new Leadership(req.body)` and calls `.save()`.
   - If offline, it assigns an ID and pushes the data to `memoryStorage.leadership`.
5. **Response**: Backend responds with `201 Created` and the saved data.
6. **Frontend Update**: `LeadershipTab.jsx` receives the response, updates its local `leadership` array state, and the UI re-renders instantly to show the new member!
