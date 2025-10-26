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

## 🧪 Testing

The application includes comprehensive testing across all layers:

- **Backend**: 34 unit and integration tests using Vitest + Supertest
- **Frontend**: 20 component tests using Vitest + React Testing Library
- **E2E**: 17 end-to-end tests using Playwright

### Running Tests

#### Backend Tests

```bash
cd backend
npm test              # Run all backend tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

**Test Coverage:**
- Database mock utilities (6 tests)
- Auth middleware (6 tests)
- Auth routes (10 tests)
- Task routes (12 tests)

#### Frontend Tests

```bash
cd frontend
npm test              # Run all frontend tests
npm run test:watch    # Watch mode for development
npm run test:ui        # Interactive UI mode
npm run test:coverage  # Generate coverage report
```

**Test Coverage:**
- Component tests for TaskForm (5 tests)
- Component tests for TaskItem (6 tests)
- Component tests for TaskList (6 tests)
- Setup and configuration tests (3 tests)

#### E2E Tests

```bash
# From project root
npm run e2e           # Run all E2E tests
npm run e2e:ui        # Interactive UI mode (recommended)
npm run e2e:headed    # Run with visible browser
npm run e2e:debug     # Debug mode
npm run e2e:report    # View test report
```

**E2E Test Coverage:**
- Authentication flows (7 tests)
  - Login with valid credentials
  - Error handling for invalid credentials
  - User registration
  - Logout functionality
  - Form switching
  - Validation
- Task management flows (10 tests)
  - Display existing tasks
  - Create new tasks
  - Toggle completion status
  - Delete tasks
  - Empty state handling
  - Task categorization
  - Form validation

### Test Structure

```
Vibe-app/
├── backend/
│   ├── src/
│   │   ├── __tests__/          # Backend tests
│   │   │   ├── auth.test.ts
│   │   │   ├── tasks.test.ts
│   │   │   ├── middleware/
│   │   │   │   └── auth.test.ts
│   │   │   └── db-mock.test.ts
│   │   └── __mocks__/          # Database mocks
│   │       └── db.ts
│   ├── vitest.config.ts        # Vitest configuration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── __tests__/          # Frontend tests
│   │   │   ├── setup.test.tsx
│   │   │   └── components/
│   │   │       ├── TaskForm.test.tsx
│   │   │       ├── TaskItem.test.tsx
│   │   │       └── TaskList.test.tsx
│   │   ├── mocks/              # API mocks (MSW)
│   │   │   └── handlers.ts
│   │   └── test/               # Test setup
│   │       └── setup.ts
│   └── vite.config.ts          # Vitest config integrated
├── e2e/                         # E2E tests
│   ├── auth.spec.ts
│   └── tasks.spec.ts
├── playwright.config.ts         # Playwright configuration
└── package.json                 # Root package with E2E scripts
```

### Testing Technologies

#### Backend Testing
- **Vitest**: Fast test runner with native TypeScript support
- **Supertest**: HTTP assertion library for API testing
- **Mock Database**: PostgreSQL pool mocked to avoid database dependency

#### Frontend Testing
- **Vitest**: Test runner (matches Vite setup)
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: Simulate user interactions
- **MSW (Mock Service Worker)**: API mocking for tests
- **jsdom**: DOM environment simulation

#### E2E Testing
- **Playwright**: Cross-browser testing
- **Multiple browsers**: Chromium, Firefox, WebKit
- **Auto server management**: Automatically starts backend and frontend

### Writing New Tests

#### Backend Test Example

```typescript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import authRouter from '../routes/auth';

describe('Auth Routes', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRouter);
  });

  it('should login successfully', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
```

#### Frontend Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  it('should call onSubmit with correct data', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<TaskForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/title/i), 'New Task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'New Task',
      description: undefined,
      category: undefined,
    });
  });
});
```

#### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should create a new task', async ({ page }) => {
  await page.goto('/');
  
  // Login
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Login")');
  
  // Create task
  await page.fill('input[id="title"]', 'My New Task');
  await page.click('button:has-text("Add Task")');
  
  // Verify task appears
  await expect(page.locator('text=My New Task')).toBeVisible();
});
```

### Test Coverage Goals

- **Backend**: 80%+ coverage for routes and middleware
- **Frontend**: 70%+ coverage for components and logic
- **E2E**: All critical user flows covered (auth + CRUD operations)

### Troubleshooting

**Backend tests failing:**
- Ensure all dependencies are installed: `npm install`
- Check that port 3001 is not in use

**Frontend tests failing:**
- Run `npm install` in the frontend directory
- Check for TypeScript errors: `npm run build`

**E2E tests failing:**
- Ensure servers are running on ports 3001 and 5173
- Use `npm run e2e:ui` for interactive debugging
- Check browser compatibility if specific browser tests fail

## 🤝 Contributing

Contributions are welcome! When adding new features, please:

1. Write tests for new functionality
2. Ensure all tests pass: `npm test` (backend), `npm test` (frontend)
3. Run E2E tests for user-facing changes: `npm run e2e:ui`
4. Update this README if testing procedures change

## 📝 License

MIT

## 👤 Author

OsGary
