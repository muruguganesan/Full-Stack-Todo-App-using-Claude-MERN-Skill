# Todo App — MERN Stack

A full-stack Todo application built with **Next.js**, **Express.js**, and **MongoDB**.

---

## Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | Next.js 14 (App Router)       |
| Styling    | Tailwind CSS                  |
| Backend    | Node.js + Express.js          |
| Database   | MongoDB + Mongoose            |
| Auth       | JWT (jsonwebtoken + bcryptjs) |

---

## Features

- User registration & login (JWT auth)
- Create, complete, and delete todos
- Priority levels: Low / Medium / High
- Filter todos: All / Active / Completed
- Per-user data isolation (todos scoped to logged-in user)
- Responsive, clean UI

---

## Project Structure

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── todoController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Todo.js
│   │   └── routes/
│   │       ├── auth.js
│   │       └── todos.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.js
    │   │   ├── page.js
    │   │   ├── login/page.js
    │   │   ├── register/page.js
    │   │   └── todos/page.js
    │   ├── components/Navbar.js
    │   ├── context/AuthContext.js
    │   └── lib/api.js
    ├── .env.example
    └── package.json
```

---

## Setup & Run

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend

```bash
cd todo-app/backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URI and JWT_SECRET
npm run dev
# Runs on http://localhost:5000
```

### Frontend

```bash
cd todo-app/frontend
npm install
cp .env.example .env.local
# Edit .env.local if your backend is on a different port
npm run dev
# Runs on http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint              | Auth | Description          |
|--------|-----------------------|------|----------------------|
| POST   | /api/auth/register    | ❌    | Register user        |
| POST   | /api/auth/login       | ❌    | Login user           |
| GET    | /api/auth/me          | ✅    | Get current user     |
| GET    | /api/todos            | ✅    | Get all user todos   |
| POST   | /api/todos            | ✅    | Create a todo        |
| PUT    | /api/todos/:id        | ✅    | Update a todo        |
| DELETE | /api/todos/:id        | ✅    | Delete a todo        |

---

## Todo Model

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": "medium"
}
```

Priority values: `low` | `medium` | `high`
