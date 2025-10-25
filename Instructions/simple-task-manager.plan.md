<!-- bf7bbe12-47a5-4933-a898-99dd72a2d7e6 2bf69a85-e972-4bac-8bb8-59c459bfb5ad -->
# Simple Task Manager Implementation Plan

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Database**: PostgreSQL with pg library

## Database Schema

### Tasks Table

```sql
- id: UUID (primary key)
- title: VARCHAR(255)
- description: TEXT
- category: VARCHAR(100)
- is_completed: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Backend Structure (`/backend`)

```
backend/
├── src/
│   ├── index.ts          # Express app setup
│   ├── routes/
│   │   └── tasks.ts      # Task CRUD endpoints
│   ├── db/
│   │   ├── connection.ts # PostgreSQL connection
│   │   └── schema.sql    # Database schema
│   └── types/
│       └── task.ts       # TypeScript interfaces
├── package.json
└── tsconfig.json
```

## Frontend Structure (`/frontend`)

```
frontend/
├── src/
│   ├── App.tsx           # Main app component
│   ├── components/
│   │   ├── TaskList.tsx  # Display tasks
│   │   ├── TaskItem.tsx  # Individual task
│   │   └── TaskForm.tsx  # Create/edit form
│   ├── services/
│   │   └── api.ts        # API client
│   ├── types/
│   │   └── task.ts       # TypeScript interfaces
│   └── main.tsx
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Key Features

1. Display all tasks in a clean list
2. Add new tasks with title, description, and category
3. Mark tasks as complete/incomplete
4. Edit existing tasks
5. Delete tasks
6. Filter by category
7. Responsive design with Tailwind CSS

## Implementation Steps

1. Set up PostgreSQL database and create schema
2. Build backend API with Express and TypeScript
3. Create frontend with Vite, React, and TypeScript
4. Implement task CRUD operations
5. Add Tailwind CSS styling
6. Connect frontend to backend API
7. Add filtering and completion toggle features

### To-dos

- [x] Set up PostgreSQL database and create tasks table schema
- [x] Initialize backend with Express, TypeScript, and configure database connection
- [x] Implement CRUD API endpoints for tasks
- [x] Initialize frontend with Vite, React, TypeScript, and Tailwind CSS
- [x] Create TaskList, TaskItem, and TaskForm components
- [x] Connect frontend to backend API and implement state management
- [ ] Apply Tailwind CSS styling for a clean, responsive UI