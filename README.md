# Expense Tracker App

## Author: Janumala Akhilendra

## Project Overview
A full-stack expense tracker application with user authentication, role-based access (admin/employee), expense management, and insightful analytics. Built with React (frontend), Node.js/Express (backend), PostgreSQL (database), and styled using Tailwind CSS via the CLI.

## Folder Structure
```
expense-tracker/
│
├── backend/         # Node.js/Express API, models, controllers, routes
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── package.json
│
├── frontend/        # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── index.css
│   │   ├── output.css
│   │   └── App.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── ...
│
└── README.md
```

## Flow Chart

```mermaid
flowchart TD
    A[User] -->|Registers/Logs in| B[Frontend (React)]
    B -->|API Requests| C[Backend (Express)]
    C -->|DB Queries| D[(PostgreSQL)]
    C -->|Role-based Logic| E[Admin/Employee Features]
    E -->|Expense Data| B
    B -->|Analytics| F[Charts/Insights]
```

## Tailwind CSS (CLI) Usage

- **Why CLI?**  
  The project uses Tailwind CSS via the CLI for fast, zero-config utility-first styling. No PostCSS config is needed.
- **How it works:**  
  - All Tailwind directives are in `src/index.css`.
  - The CLI command compiles Tailwind classes into `src/output.css`.
  - The React app imports `output.css` for styling.

## Setup Instructions

1. **Clone the repo**
2. **Create `.env` file in backend** (see `.env.example` if available)
3. **Install dependencies**
    - Backend:  
      ```
      cd backend
      npm install
      ```
    - Frontend:  
      ```
      cd ../frontend
      npm install
      ```
4. **Build Tailwind CSS**  
   In `frontend`:
   ```
   npm run build:css
   ```
   (This will watch for changes and update `output.css` automatically.)
5. **Run the apps**
    - Backend:  
      ```
      cd ../backend
      npm run dev
      ```
    - Frontend (in another terminal):  
      ```
      cd frontend
      npm start
      ```
6. **Access the app**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:5000](http://localhost:5000)

## Major Challenges Faced

- **Tailwind/PostCSS confusion:**  
  Initially, PostCSS was accidentally added, causing plugin errors. Solution: removed PostCSS config and used Tailwind CLI only.
- **Role-based access:**  
  Ensuring secure separation of admin and employee features.
- **JWT authentication:**  
  Handling token expiry and secure storage on the frontend.
- **Database connection:**  
  Managing environment variables and remote PostgreSQL setup.

## Visit Again & Feedback

If you found this project helpful, please consider giving it a ⭐ on GitHub!  
Feedback and contributions are welcome.
