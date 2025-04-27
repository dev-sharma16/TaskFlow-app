# Task Flow App 🚀

Task Flow is a **Drag-and-Drop Task Manager** that helps users organize, prioritize, and manage their tasks efficiently.  
Built with **React**, **Appwrite**, **TailwindCSS**, and **DND Kit**, it provides a clean, responsive UI and powerful task features.

---

## ✨ Features

- 🔐 Authentication (Sign Up, Login, Logout)
- 🏠 Landing Page with call to action
- 🗂 Task Management (Create, Update, Delete tasks)
- 📋 Dashboard with categorized task columns: To Do, In Progress, Done
- 🖱 Drag and Drop tasks between columns
- 🎨 Fully Responsive and modern UI with smooth transitions
- 📅 Due Date selection for tasks
- ⚡ Priority Management (Low, Medium, High)
- 🛡️ Protected Routes for authenticated users
- 🚀 Optimized Form Handling with react-hook-form

---

## 🛠 Tech Stack

- **Frontend**:
  - React.js (Vite)
  - Tailwind CSS
  - react-router-dom
  - react-hook-form
  - @dnd-kit/core for drag-and-drop

- **Backend**:
  - Appwrite (Authentication, Database, Storage)

---


## 📸 Screenshots

### Landing Page
![Screenshot 2025-04-27 205101](https://github.com/user-attachments/assets/4320e819-9f77-47eb-9452-9c99e8d4426c)

### Dashboard (Task Board)
![Screenshot 2025-04-27 205150](https://github.com/user-attachments/assets/4d65697c-9ea0-40e4-9166-0c709091345d)

### Drag and Drop Task
![Screenshot 2025-04-27 205211](https://github.com/user-attachments/assets/e9aefc21-09c5-4277-ad4c-fffa608acc8f)
![Screenshot 2025-04-27 205225](https://github.com/user-attachments/assets/3bdc05f3-ba06-4ecb-9a9e-982eba459c12)


---


## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-flow-app.git
cd task-flow-app
```

### 2. Install Dependencies
```
npm run install
```

### 3. Configure Appwrite :
  -> Create an Appwrite Project.
  
  -> Create a Database and a Collection for tasks.
  
  -> Enable Authentication (Email/Password).
  
  -> Create a .env file in your root directory and add:
  ```bash
   VITE_APPWRITE_ENDPOINT=your-appwrite-endpoint
   VITE_APPWRITE_PROJECT_ID=your-project-id 
   VITE_APPWRITE_DATABASE_ID=your-database-id
   VITE_APPWRITE_COLLECTION_ID=your-collection-id
   VITE_APPWRITE_BUCKET_ID=your-bucket-id
  ```

### 4. Start Development server
```bash
npm run dev
```

---

## 📂 Folder Structure
```bash
src/
 ├── appwrite/         // Appwrite service config
 ├── components/       // Reusable UI components
 ├── pages/            // App Pages (Login, Signup, Dashboard, Home)
 ├── store/            // Redux Store for authentication
 ├── utils/            // Helper functions (optional)
 ├── App.jsx           // Main App component
 ├── main.jsx          // Entry point
```

