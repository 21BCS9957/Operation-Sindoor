const API_BASE_URL = 'http://localhost:8000';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`🌐 Making API call to: ${url}`, options);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log(`📡 Response status: ${response.status}`);
    console.log(`📡 Response headers:`, response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ HTTP error! status: ${response.status}, body: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ API call successful:`, data);
    return data;
  } catch (error) {
    console.error('❌ API call failed:', error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  console.log('📝 Registering user with data:', userData);
  return apiCall('/register-user', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Get user by ID
export const getUser = async (userId) => {
  return apiCall(`/user/${userId}`, {
    method: 'GET',
  });
};

// Request aid for a user
export const requestAid = async (aidData) => {
  return apiCall('/request-aid', {
    method: 'POST',
    body: JSON.stringify(aidData),
  });
};

// Get aid status by request ID
export const getAidStatus = async (requestId) => {
  return apiCall(`/aid-status/${requestId}`, {
    method: 'GET',
  });
}; 