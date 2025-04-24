// default values for deployment

const DEFAULT_API_URL ='http://localhost:8080';

//from environment variable 
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || DEFAULT_API_URL;

// Backend status check configuration
export const BACKEND_STATUS = {
    CHECK_INTERVAL: 30000, // Check every 30 seconds
    TIMEOUT: 5000, // Timeout after 5 seconds
    ENDPOINT: '/api/status', // Health check endpoint
  };
  
  // Feature flags
  export const FEATURES = {
    ENABLE_BACKEND_STATUS_CHECK: process.env.REACT_APP_ENABLE_STATUS_CHECK !== 'false',
    SHOW_MAINTENANCE_NOTIFICATION: process.env.REACT_APP_SHOW_MAINTENANCE === 'true',
  };
