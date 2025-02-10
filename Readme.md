# Expense Tracker App

## Live Deployment
[Click here to view the live application](https://my-project-31lqlpene-tushar-vermas-projects-77aedfe3.vercel.app/)  

## Overview
The **Expense Tracker App** is a full-stack web application built with **Next.js 14**, providing users with an intuitive interface to manage their expenses efficiently. The application supports user authentication, data persistence with a database, and full **CRUD (Create, Read, Update, Delete)** operations.

## Features

### 🛠 Core Features
- **User Authentication**: Secure authentication using JWT.
- **Expense Management**:
  - Add new expenses.
  - View all expenses.
  - Edit and update existing expenses.
  - Delete expenses securely.
- **Real-Time Data Updates**: Changes reflect instantly on the UI.
- **Error Handling & Validations**: Backend and frontend validation for secure data entry.
- **Responsive UI**: Fully responsive with **Tailwind CSS**.
- **Secure API Routes**: All routes protected using authentication.

## Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API routes, Node.js, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Vercel with CI/CD integration

## Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env.local` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 4️⃣ Run the Application
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## API Routes
| Method | Route            | Description                 |
|--------|----------------|-----------------------------|
| POST   | /api/auth/login | User login                 |
| POST   | /api/auth/register | User registration        |
| GET    | /api/expenses  | Fetch all expenses         |
| POST   | /api/expenses  | Add a new expense          |
| PUT    | /api/expenses/:id | Update an existing expense |
| DELETE | /api/expenses/:id | Delete an expense         |

## CI/CD Pipeline (GitHub Actions + Vercel)
### **Steps to Implement CI/CD with GitHub Actions**

1. **Create a GitHub Workflow**: Inside your project, create `.github/workflows/deploy.yml`.
2. **Add the following configuration:**

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main  # Change to your deployment branch
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      
      - name: Install Dependencies
        run: npm install
      
      - name: Build Project
        run: npm run build
      
      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### **Setting up GitHub Secrets**
Go to your repository settings → **Secrets and Variables → Actions** and add:
- **`VERCEL_TOKEN`** → Get it from [Vercel settings](https://vercel.com/account/tokens)

Now, every push to `main` will automatically build and deploy the project!

## 🚀 Future Enhancements
- Implement user roles and permissions
- Add charts for expense analytics
- Implement PWA support
