🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built as part of a TDD Kata. The application supports user authentication, role-based access control, inventory management, and a modern, responsive frontend.

📌 Project Overview

The Sweet Shop Management System allows users to:

Register and log in securely

View available sweets

Search sweets by name, category, or price range

Purchase sweets (quantity decreases automatically)

Admin users can additionally:

Add new sweets

Update existing sweets

Delete sweets

Restock sweets

The project follows clean coding practices and demonstrates full-stack development using modern technologies.

🛠 Tech Stack
Backend

Node.js + TypeScript

Express.js (RESTful API)

JWT Authentication

Database: SQL / MongoDB (persistent database, not in-memory)

Frontend

React + TypeScript

React Router (protected routes)

Axios (API communication)

Custom UI styling with gradients and cards

🔐 Authentication & Authorization

Users can register and log in

JWT tokens are used for secure API access

Role-based access control:

User: View, search, purchase sweets

Admin: Add, update, delete, restock sweets

Protected routes ensure unauthorized users cannot access restricted pages.

📡 API Endpoints
Auth

POST /api/auth/register – Register a new user

POST /api/auth/login – Login user

Sweets

GET /api/sweets – Get all sweets

GET /api/sweets/search – Search sweets

POST /api/sweets – Add new sweet (Admin)

PUT /api/sweets/:id – Update sweet (Admin)

DELETE /api/sweets/:id – Delete sweet (Admin)

Inventory

POST /api/sweets/:id/purchase – Purchase sweet

POST /api/sweets/:id/restock – Restock sweet (Admin)

🖥 Frontend Features

Beautiful Login & Register pages

Protected Dashboard after login

Sweet cards with gradients and hover effects

Search and filter functionality

Purchase button disabled when stock is zero

Admin-only controls (Add / Delete / Restock)

Logout button for ending session

🚀 How to Run Locally
Backend Setup
cd backend
npm install
npm run dev
Frontend Setup
cd frontend
npm install
npm start

Ensure backend is running before starting frontend.

🧪 Testing

Backend logic designed following Test-Driven Development (TDD) principles

Core flows manually tested:

Authentication

Role-based access

Inventory updates

Error handling

(Test reports can be added if automated tests are extended.)

🤖 My AI Usage

AI tools were actively used as part of the development process.

Tools Used

ChatGPT

Claude

How AI Was Used

Debugging TypeScript and React errors

Designing authentication and protected route logic

Improving UI/UX styling

Validating backend routes and API structure

Cross-checking project requirements against implementation

Reflection

AI significantly improved development speed and helped resolve complex integration issues. All generated suggestions were reviewed, understood, and manually integrated to ensure correctness and originality.

📷 Screenshots
<img width="723" height="665" alt="image" src="https://github.com/user-attachments/assets/449bd7fc-7c9d-4422-8ea0-985a854f4c43" />



✅ Status

✔ All core requirements from the TDD Kata Word document have been implemented.

Author: Shazia Afreen
Project Type: Full-Stack Web Application
Status: Completed 🎉
