# Project: Task Manager REST API (Express.js + MongoDB)

## Overview

Build a small but complete **RESTful Task Manager API** where users can register, login, and manage their tasks and categories/labels. The goal is a production-ready backend you can ship: well-structured code, authentication, validation, tests, and documentation. This project is targeted to be **simple to start** (CRUD + auth) but **extensible** later.

---

## Objectives

- Implement secure user authentication (JWT).
- Create and protect CRUD endpoints for **Tasks** and **Categories**.
- Enforce per-user authorization: users can only access their own resources.
- Add useful query functionality: pagination, filtering, sorting.
- Provide clear documentation, tests, and a seed script.

---

## Tech stack (recommended)

- Node.js + Express.js
- MongoDB (Atlas or local) with Mongoose
- JWT for auth
- bcrypt for password hashing
- dotenv for configuration
- Jest / Supertest for testing
- Postman/Insomnia for manual testing

---

## User stories

1. As a user, I can register with email and password.
2. As a user, I can login and receive a JWT.
3. As a user, I can create/read/update/delete my tasks.
4. As a user, I can create/read/update/delete categories (labels) and assign them to tasks.
5. As a user, I can list tasks with filters (status, category), sort, and paginate.
6. As a user, I cannot access or modify other users' tasks or categories.

---

## Data Models (MongoDB / Mongoose)

### User

- _id: ObjectId
- username: String (required, unique)
- email: String (required, unique)
- passwordHash: String (required)
- createdAt: Date
- updatedAt: Date

### Category

- _id: ObjectId
- name: String (required) — **unique per user**
- userId: ObjectId (ref `User`, required)
- createdAt: Date
- updatedAt: Date

> Constraint: (userId, name) should be unique to avoid duplicate category names for the same user.

### Task

- _id: ObjectId
- title: String (required)
- description: String (optional)
- status: String Enum `['todo', 'in-progress', 'done']` (default: `todo`)
- priority: String Enum `['low', 'medium', 'high']` (optional)
- dueDate: Date (optional)
- userId: ObjectId (ref `User`, required)
- categories: [ObjectId] (array of `Category` _ids, optional)
- createdAt: Date
- updatedAt: Date

> Indexes: `userId` on tasks & categories. Consider compound index on `(userId, status)` if you plan to query by status frequently.

---

## API Endpoints

> All endpoints under `/api/v1` (recommended). Use JSON for body payloads. Protect routes with `Authorization: Bearer <token>` header where noted.

### Auth

- `POST /api/v1/auth/register`
  - Body: `{ "username": "alice", "email": "alice@example.com", "password": "<plain>" }`
  - Returns: 201 + user summary (no password) or error for duplicate email/username.

- `POST /api/v1/auth/login`
  - Body: `{ "email": "alice@example.com", "password": "<plain>" }`
  - Returns: 200 + `{ token: "<jwt>", user: { _id, username, email } }`.

- `POST /api/v1/auth/logout` (optional — can be implemented client-side by deleting JWT; server-side can implement token blacklist)


### Categories (Authenticated)

- `GET /api/v1/categories` — list user's categories
  - Query: `?q=work` (search), `?page=1&limit=20`
  - Returns: array of categories

- `POST /api/v1/categories` — create
  - Body: `{ "name": "Work" }`
  - Returns: 201 + created category

- `GET /api/v1/categories/:id` — get by id
  - Returns: category if owned by user, 404 otherwise

- `PUT /api/v1/categories/:id` — update (rename)
  - Body: `{ "name": "Personal" }`

- `DELETE /api/v1/categories/:id` — delete
  - Should either remove the category reference from tasks or reject if tasks still reference it (choose one and document behavior).


### Tasks (Authenticated)

- `GET /api/v1/tasks` — list tasks belonging to authenticated user
  - Query parameters:
    - `?status=done` (filter)
    - `?category=<categoryId>` (filter tasks that include this category id)
    - `?q=meeting` (search in title/description)
    - `?sort=dueDate,-createdAt` (comma list; prefix `-` for desc)
    - `?page=1&limit=20`
  - Returns: paginated list `{ items: [...], meta: { page, limit, total } }`

- `POST /api/v1/tasks` — create task
  - Body example:
    ```json
    {
      "title": "Finish chapter 3",
      "description": "Read and summarise",
      "status": "todo",
      "priority": "high",
      "dueDate": "2025-10-01T00:00:00.000Z",
      "categories": ["<categoryId1>", "<categoryId2>"]
    }
    ```
  - Returns: 201 + created task

- `GET /api/v1/tasks/:id` — retrieve

- `PUT /api/v1/tasks/:id` — full update
  - Body: same as create but all fields optional; only update the owner’s task

- `PATCH /api/v1/tasks/:id` — partial update (useful for toggling status)
  - Example: `{ "status": "done" }`

- `DELETE /api/v1/tasks/:id` — delete

- **Category association helpers** (optional endpoints for clarity):
  - `POST /api/v1/tasks/:id/categories` — body `{ "categoryId": "..." }` (adds category to task)
  - `DELETE /api/v1/tasks/:id/categories/:categoryId` — remove single category from task


### Admin / Extra (Optional)

- `GET /api/v1/admin/users` — list users (if you build admin role)
- `POST /api/v1/seed` — seed endpoint for dev only (protect strongly)

---

## Validation & Error Handling

- Use express-validator / Joi / Zod to validate request bodies.
- Return consistent error shapes, e.g.: `{ "error": "ValidationError", "message": "Title is required", "fields": { title: "required" } }`.
- For unauthorized access return 401, forbidden 403, not found 404, and 400 for bad requests.

---

## Security Best Practices

- Hash passwords with `bcrypt` (salt rounds >= 10).
- Store JWT secret in environment variables; prefer RS256 for rotation (optional).
- Use HTTPS in production.
- Set appropriate CORS rules (only your frontend origins).
- Use helmet, express-rate-limit to mitigate common attacks.
- Avoid exposing server stack traces in production.
- Validate all incoming IDs (`ObjectId`) to avoid injection.

---

## Tests

- Unit tests for utility functions & model logic.
- Integration tests (Supertest) for endpoints:
  - Auth: register/login happy & unhappy paths.
  - Tasks: CRUD & authorization (user cannot access another's task).
  - Categories: create & uniqueness per user.
- Aim for at least 60–80% coverage for this small project.

---

## Deliverables (what you should produce)

1. Working Express app with the endpoints above.
2. README with setup, run, test, and deployment instructions.
3. Postman/Insomnia collection (or curl examples).
4. Seed script to create a test user and sample tasks/categories.
5. Tests (unit + integration).
6. (Optional) Dockerfile for easy deployment.

---

## Acceptance Criteria (Ship-ready)

- A new user can sign up and login to receive a JWT.
- Authenticated user can create, list, update, delete tasks and categories.
- Requests from the wrong user yield 403/404 and no data leak.
- Endpoints support pagination, filtering by status and category, and sorting.
- README clearly explains how to run the app locally and how to run tests.

---

## Stretch Goals (after main MVP)

- Add file attachments to tasks (S3 or local storage).
- Add sharing: let user share a task with another user (access control).
- Add cron/email reminders for due tasks.
- Implement WebSocket notifications.
- Add full-text search with MongoDB text indexes or Elasticsearch.

---

## Suggested Milestones & Timeline (example)

1. Day 1: Project skeleton, user model, register/login JWT.
2. Day 2: Task model + CRUD endpoints + basic tests.
3. Day 3: Category model, endpoints, task-category relationships.
4. Day 4: Pagination/filtering/sorting + validations.
5. Day 5: Tests, README, seed script, deploy to a free host.

---

## README / Resume Notes (short blurb)

**Task Manager API** — RESTful API built with Express.js & MongoDB featuring JWT authentication, user-scoped tasks and categories, pagination, filtering, and tests. (Include link to repo & deployment).

---

## Example curl (create task)

```bash
curl -X POST "http://localhost:3000/api/v1/tasks" \
 -H "Authorization: Bearer <token>" \
 -H "Content-Type: application/json" \
 -d '{"title":"Buy milk","description":"2 liters","status":"todo"}'
```

---

## Notes / Decisions to make (pick & document)

- When deleting a category: either cascade-remove references from tasks or block deletion if tasks reference it. Choose one and document.
- Categories: single select vs multi-select on tasks. This spec uses multi-select (`categories: [ObjectId]`).
- Token invalidation: basic JWT expiry vs token blacklist.

---

### Good luck!

This problem statement is intentionally realistic and keeps scope manageable while leaving plenty of room for further features. Ship the MVP first — tests and docs matter more than neat bells & whistles. Happy building! 👨\u200d💻
