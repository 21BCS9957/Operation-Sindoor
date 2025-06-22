# Operation Sindoor

A full-stack application designed for requesting and tracking aid. It features a modern React frontend and a robust Rust backend, demonstrating a complete system for user registration and status tracking.

## ✨ Features

- **User Registration**: A comprehensive form for users to register for medical, financial, or educational aid.
- **Aid Tracking**: Users can track the status of their application using the unique ID provided upon registration.
- **RESTful API**: A well-defined API built with Rust and Axum provides all the necessary endpoints for the frontend.
- **In-Memory Storage**: The backend uses a thread-safe, in-memory store for all data, making it easy to run and test without a database.

## 🛠️ Tech Stack

- **Frontend**:
  - React
  - Vite
  - Bootstrap 5
  - Framer Motion
  - React Router
- **Backend**:
  - Rust
  - Axum
  - Tokio
  - Serde
  - UUID

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://www.rust-lang.org/tools/install) (latest stable version)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/21BCS9957/Operation-Sindoor.git
    cd Operation-Sindoor
    ```

2.  **Set up the Backend:**
    ```sh
    cd sindoor-backend
    cargo build
    ```

3.  **Set up the Frontend:**
    ```sh
    cd ../sindoor
    npm install
    ```

### Running the Application

You will need two separate terminals to run both the backend and frontend servers.

1.  **Run the Backend Server:**
    ```sh
    # In the sindoor-backend directory
    cargo run
    ```
    The server will start on `http://localhost:8000`.

2.  **Run the Frontend Development Server:**
    ```sh
    # In the sindoor directory
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 部署

This project is a monorepo and requires separate deployments for the frontend and backend.

### Backend (Rust)

The Rust backend must be deployed to a service that supports persistent, long-running applications. Vercel cannot host this type of server. Recommended services include:

-   [Railway](https://railway.app/)
-   [Fly.io](https://fly.io/)
-   [Shuttle](https://www.shuttle.rs/)

After deploying your backend, you will get a public URL (e.g., `https://your-backend-url.com`). You will need this for the frontend configuration.

### Frontend (React)

The frontend is configured for deployment on [Vercel](https://vercel.com/).

1.  **Import your GitHub repository** into Vercel.
2.  **Configure the Project Settings**:
    -   **Framework Preset**: `Vite`
    -   **Root Directory**: `sindoor`
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
3.  **Add Environment Variables**:
    -   In your Vercel project's settings, go to "Environment Variables".
    -   Create a new variable:
        -   **Name**: `VITE_API_BASE_URL`
        -   **Value**: The URL of your deployed Rust backend (e.g., `https://your-backend-url.com`).
4.  **Deploy**.

Vercel will now correctly build and deploy only the frontend application from the `sindoor` subdirectory. 