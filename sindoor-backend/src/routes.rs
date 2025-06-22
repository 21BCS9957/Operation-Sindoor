use axum::{
    extract::Path,
    http::StatusCode,
    response::Json,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use uuid::Uuid;

// Data structures
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub phone: String,
    pub aadhaar: String,
    pub aid_type: String,
    pub description: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AidRequest {
    pub id: String,
    pub user_id: String,
    pub aid_type: String,
    pub status: AidStatus,
    pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum AidStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterUserRequest {
    pub name: String,
    pub email: String,
    pub phone: String,
    pub aadhaar: String,
    pub aid_type: String,
    pub description: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestAidRequest {
    pub user_id: String,
    pub aid_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterUserResponse {
    pub user_id: String,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestAidResponse {
    pub request_id: String,
    pub message: String,
}

// App state
pub type AppState = Arc<RwLock<AppData>>;

pub struct AppData {
    pub users: HashMap<String, User>,
    pub aid_requests: HashMap<String, AidRequest>,
}

impl AppData {
    pub fn new() -> Self {
        Self {
            users: HashMap::new(),
            aid_requests: HashMap::new(),
        }
    }
}

// Route handlers
pub async fn register_user(
    Json(payload): Json<RegisterUserRequest>,
) -> Result<Json<RegisterUserResponse>, StatusCode> {
    println!("📝 Received registration request: {:?}", payload);
    
    // Validate required fields
    if payload.name.is_empty() {
        println!("❌ Validation error: name is empty");
        return Err(StatusCode::BAD_REQUEST);
    }
    
    if payload.email.is_empty() {
        println!("❌ Validation error: email is empty");
        return Err(StatusCode::BAD_REQUEST);
    }
    
    if payload.phone.is_empty() {
        println!("❌ Validation error: phone is empty");
        return Err(StatusCode::BAD_REQUEST);
    }
    
    if payload.aadhaar.is_empty() {
        println!("❌ Validation error: aadhaar is empty");
        return Err(StatusCode::BAD_REQUEST);
    }
    
    if payload.aid_type.is_empty() {
        println!("❌ Validation error: aid_type is empty");
        return Err(StatusCode::BAD_REQUEST);
    }
    
    if payload.description.is_empty() {
        println!("❌ Validation error: description is empty");
        return Err(StatusCode::BAD_REQUEST);
    }
    
    let user_id = Uuid::new_v4().to_string();
    println!("🆔 Generated user ID: {}", user_id);
    
    let user = User {
        id: user_id.clone(),
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        aadhaar: payload.aadhaar,
        aid_type: payload.aid_type,
        description: payload.description,
    };


    println!("📝 Registered user: {:?}", user);

    let response = RegisterUserResponse {
        user_id,
        message: "User registered successfully".to_string(),
    };
    
    println!("✅ Sending response: {:?}", response);
    Ok(Json(response))
}

pub async fn get_user(
    Path(user_id): Path<String>,
) -> Result<Json<User>, StatusCode> {

    let user = User {
        id: user_id.clone(),
        name: "John Doe".to_string(),
        email: "john@example.com".to_string(),
        phone: "+91-9876543210".to_string(),
        aadhaar: "1234-5678-9012".to_string(),
        aid_type: "Medical".to_string(),
        description: "Medical assistance required".to_string(),
    };

    Ok(Json(user))
}

pub async fn request_aid(
    Json(payload): Json<RequestAidRequest>,
) -> Result<Json<RequestAidResponse>, StatusCode> {
    let request_id = Uuid::new_v4().to_string();
    
    let aid_request = AidRequest {
        id: request_id.clone(),
        user_id: payload.user_id,
        aid_type: payload.aid_type,
        status: AidStatus::Pending,
        created_at: chrono::Utc::now().to_rfc3339(),
    };

    
    println!("🆘 Aid request created: {:?}", aid_request);

    Ok(Json(RequestAidResponse {
        request_id,
        message: "Aid request submitted successfully".to_string(),
    }))
}

pub async fn get_aid_status(
    Path(request_id): Path<String>,
) -> Result<Json<AidRequest>, StatusCode> {
    // Mock aid request data with random status
    let statuses = vec![AidStatus::Pending, AidStatus::Approved, AidStatus::Rejected];
    let random_status = statuses[request_id.len() % 3].clone();
    
    let aid_request = AidRequest {
        id: request_id,
        user_id: "mock-user-id".to_string(),
        aid_type: "Medical".to_string(),
        status: random_status,
        created_at: chrono::Utc::now().to_rfc3339(),
    };

    Ok(Json(aid_request))
} 