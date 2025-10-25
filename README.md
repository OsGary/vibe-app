# Vibe App - Task Manager

A modern full-stack task management application built with React, TypeScript, and Node.js.

## 🚀 Features

- ✅ Create, update, and delete tasks
- 🏷️ Categorize tasks by category
- 📝 Rich task descriptions
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

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/vibe-app.git
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

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:3000`

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
│   │   ├── routes/
│   │   │   └── tasks.ts
│   │   ├── types/
│   │   │   └── task.ts
│   │   └── index.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── task.ts
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT

## �� Author

Your Name
