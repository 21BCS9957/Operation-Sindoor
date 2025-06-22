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