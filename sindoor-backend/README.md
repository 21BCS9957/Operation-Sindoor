# Operation Sindoor Backend

A Rust-based backend API for the Operation Sindoor application using Axum framework.

## 🚀 Quick Start

1. **Install Rust** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Build and run**:
   ```bash
   cargo build
   cargo run
   ```

3. **Server will start on**: `http://localhost:8000`

## 📋 API Endpoints

### 1. Register User
- **POST** `/register-user`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "aadhaar": "1234-5678-9012",
    "aid_type": "Medical",
    "description": "Medical assistance required"
  }
  ```
- **Response**:
  ```json
  {
    "user_id": "uuid-string",
    "message": "User registered successfully"
  }
  ```

### 2. Get User
- **GET** `/user/:id`
- **Response**:
  ```json
  {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "aadhaar": "1234-5678-9012",
    "aid_type": "Medical",
    "description": "Medical assistance required"
  }
  ```

### 3. Request Aid
- **POST** `/request-aid`
- **Body**:
  ```json
  {
    "user_id": "user-uuid",
    "aid_type": "Medical"
  }
  ```
- **Response**:
  ```json
  {
    "request_id": "uuid-string",
    "message": "Aid request submitted successfully"
  }
  ```

### 4. Get Aid Status
- **GET** `/aid-status/:id`
- **Response**:
  ```json
  {
    "id": "request-id",
    "user_id": "user-id",
    "aid_type": "Medical",
    "status": "Pending",
    "created_at": "2024-01-01T00:00:00Z"
  }
  ```

## 🛠 Tech Stack

- **Rust** - Programming language
- **Axum** - Web framework
- **Tokio** - Async runtime
- **Serde** - Serialization/deserialization
- **Tower** - HTTP middleware
- **UUID** - Unique identifier generation
- **Chrono** - Date/time handling

## 🔧 Configuration

- **Port**: 8000 (configurable via `.env`)
- **CORS**: Enabled for all origins (for development)

## 📝 Notes

- Currently uses in-memory storage (no database)
- Mock data is returned for user and aid status endpoints
- CORS is configured to allow frontend connections from `http://localhost:5173`

## 🔗 Frontend Integration

The backend is designed to work with the React frontend running on `http://localhost:5173`. CORS is configured to allow cross-origin requests from the frontend. 