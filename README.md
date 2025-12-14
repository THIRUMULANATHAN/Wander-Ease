# WanderEase API

**Version:** 1.0.0  
**Specification:** OpenAPI 3.0 (OAS 3.0)

WanderEase API is the backend service powering the **WanderEase** travel platform.  
It exposes RESTful endpoints for managing **users**, **authentication**,  
**travel packages**, **activities**, and **real-time messaging**.

This project is built as a **learning and demonstration backend**, focusing on
clean architecture, role-based access control, and scalable API design.

---

## 📌 About the Project

WanderEase API simulates the backend of a modern travel and social platform.
It supports:

- User authentication & authorization
- Travel package and activity management
- Chat rooms and messaging
- Social features such as friends and online status

The backend follows REST best practices and is fully documented using
**Swagger / OpenAPI**.

> ⚠️ This API is **not a production service**.  
> It is intended strictly for **educational and portfolio purposes**.

---

## ✨ Features

- JWT-based authentication
- Role-based authorization (User / Admin)
- Soft-delete support for critical resources
- Modular route architecture
- REST fallback support for chat messages
- Swagger-documented API endpoints
- Clean separation of concerns (Controllers, Routes, Services)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT (JSON Web Tokens)**
- **Swagger / OpenAPI 3.0**

---

## 🚀 Server Configuration

| Environment | Base URL |
|------------|----------|
| Local | `http://localhost:5000` |

---

## 📖 API Documentation (Swagger)

The API is fully documented using **Swagger (OpenAPI 3.0)**.

Once the server is running, access the Swagger UI at:

http://localhost:5000/api-docs

yaml
Copy code

Swagger provides:
- Endpoint definitions
- Request & response schemas
- Authorization support
- Try-it-out functionality

---

## 🔐 Authentication & Authorization

The API uses **JWT-based authentication**.

### Access Levels
- **Public** – No authentication required
- **Authenticated User** – Requires valid JWT
- **Admin** – Requires admin role

JWT must be sent in the request header:

Authorization: Bearer <token>

yaml
Copy code

---

## 📦 API Modules

### Activities
Travel activity management (e.g., Hiking, Yachting).

| Method | Endpoint | Description | Access |
|------|---------|------------|--------|
| GET | `/api/activities` | Get all active activities | Public |
| POST | `/api/activities` | Create activity | Admin |
| GET | `/api/activities/{slug}` | Get activity by slug | Public |
| PUT | `/api/activities/{id}` | Update activity | Admin |
| DELETE | `/api/activities/{id}` | Delete activity (soft delete) | Admin |

---

### Authentication
User authentication & session handling.

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout current user |

---

### Messages
Chat messages & conversations.

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/messages/{roomId}` | Get chat history |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/{id}` | Edit message |
| DELETE | `/api/messages/{id}` | Delete message (soft delete) |
| PATCH | `/api/messages/read/{roomId}` | Mark messages as read |

---

### Packages
Travel package management.

| Method | Endpoint | Description | Access |
|------|---------|------------|--------|
| GET | `/api/packages` | Get all active packages | Public |
| POST | `/api/packages` | Create package | Admin |
| GET | `/api/packages/featured` | Get featured packages | Public |
| GET | `/api/packages/{id}` | Get package by ID | Public |
| PUT | `/api/packages/{id}` | Update package | Admin |
| DELETE | `/api/packages/{id}` | Delete package (soft delete) | Admin |

---

### Rooms
Chat rooms & virtual rooms.

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/rooms/user/{userId}` | Get user rooms |
| GET | `/api/rooms/{id}` | Get room details |
| POST | `/api/rooms` | Create room |
| PATCH | `/api/rooms/{id}/add` | Add member |
| PATCH | `/api/rooms/{id}/remove` | Remove member |
| DELETE | `/api/rooms/{id}` | Delete room (soft delete) |

---

### Users
User management & social features.

| Method | Endpoint | Description | Access |
|------|---------|------------|--------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/me/friends` | Get friends | Auth |
| GET | `/api/users/{id}` | Get user by ID | Auth |
| PUT | `/api/users/{id}` | Update profile | Auth |
| DELETE | `/api/users/{id}` | Delete user (soft delete) | Admin |
| PATCH | `/api/users/{id}/status` | Update online status | Auth |
| POST | `/api/users/friends/add` | Add friend | Auth |
| POST | `/api/users/friends/remove` | Remove friend | Auth |
| PATCH | `/api/users/{id}/promote` | Promote to admin | Admin |

---

## ⚠️ Disclaimer

This API is built **solely for educational and portfolio purposes**.  
It should **not** be used in production environments.

---

## 👨‍💻 Author

**Thirumulanathan V**  
Full Stack Developer  

- GitHub: https://github.com/THIRUMULANATHAN  
- LinkedIn: https://www.linkedin.com/in/thirumulanathan  

---
