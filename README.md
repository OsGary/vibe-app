# Vibe App - Task Manager

A modern full-stack task management application built with React, TypeScript, and Node.js.

## 🚀 Features

- ✅ Create, update, and delete tasks
- 🏷️ Categorize tasks by category
- 📝 Rich task descriptions
- 🔐 JWT-based authentication
- 👤 User-specific tasks (each user sees only their own)
- 🗄️ PostgreSQL database for data persistence
- 🎨 Beautiful UI with Tailwind CSS
- ⚡ Fast development with Vite

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Nodemon
- bcrypt - password hashing
- jsonwebtoken - JWT authentication

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/OsGary/vibe-app.git
cd Vibe-app
```

2. **Setup Backend:**
```bash
cd backend
npm install
```

3. **Configure Environment Variables:**
Create a `.env` file in the `backend` directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanager
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key-here
```

4. **Setup Database:**
```bash
# Create the database
createdb taskmanager

# Run the schema
psql -U your_username -d taskmanager -f src/db/schema.sql
```

5. **Setup Frontend:**
```bash
cd ../frontend
npm install
```

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

- Users must register/login to access the app
- Passwords are securely hashed with bcrypt
- JWT tokens are stored in localStorage
- All tasks are user-specific
- Token expiration: 7 days

### First Time Setup

1. Start the app and navigate to `http://localhost:5173`
2. Click "Register here" to create an account
3. Enter your email and password (min 6 characters)
4. You'll be automatically logged in after registration

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
Vibe-app/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   └── schema.sql
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── tasks.ts
│   │   ├── types/
│   │   │   ├── task.ts
│   │   │   └── user.ts
│   │   └── index.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── task.ts
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks (All protected - require authentication)
- `GET /api/tasks` - Get all tasks for logged-in user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT

## 👤 Author

OsGary
