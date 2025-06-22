use axum::{
    routing::{get, post},
    Router,
    response::Json,
};
use std::sync::Arc;
use tokio::sync::RwLock;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use http::header::HeaderName;
use dotenv::dotenv;
use tokio::net::TcpListener;
use serde_json::json;

mod routes;
use routes::AppData;

// Health check endpoint
async fn health_check() -> Json<serde_json::Value> {
    Json(json!({
        "status": "healthy",
        "message": "Operation Sindoor backend is running",
        "endpoints": [
            "POST /register-user",
            "GET /user/:id", 
            "POST /request-aid",
            "GET /aid-status/:id"
        ]
    }))
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    
    println!("🚀 Starting Operation Sindoor backend...");
    
    // Create the shared state
    let app_data = Arc::new(RwLock::new(AppData::new()));

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers([
            HeaderName::from_static("content-type"),
            HeaderName::from_static("authorization"),
            HeaderName::from_static("accept"),
            HeaderName::from_static("x-requested-with"),
            HeaderName::from_static("origin"),
        ]);

    println!("🌐 CORS configured for all origins");


    let app = Router::new()
        .route("/", get(health_check))
        .route("/health", get(health_check))
        .route("/register-user", post(routes::register_user))
        .route("/user/:id", get(routes::get_user))
        .route("/request-aid", post(routes::request_aid))
        .route("/aid-status/:id", get(routes::get_aid_status))
        .layer(cors)
        .with_state(app_data);

    println!("📋 Routes configured:");
    println!("   GET  / - Health check");
    println!("   GET  /health - Health check");
    println!("   POST /register-user - User registration");
    println!("   GET  /user/:id - Get user");
    println!("   POST /request-aid - Request aid");
    println!("   GET  /aid-status/:id - Get aid status");

    // Run it
    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));
    let listener = TcpListener::bind(addr).await.unwrap();
    println!("🚀 Operation Sindoor backend running on http://{}", addr);
    println!("🔍 Test with: curl http://localhost:8000/health");
    
    axum::serve(listener, app).await.unwrap();
}
