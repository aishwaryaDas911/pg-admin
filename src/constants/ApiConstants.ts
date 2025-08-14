// API Constants for external services
export const API_CONSTANTS = {
  // Base URLs for different services
  USER_ROLE_SERVICE: {
    // Use proxy in development, direct URL in production
    BASE_URL: import.meta.env.DEV ? '' : 'http://192.168.12.7:9996',
    PATHS: {
      USER_SERVICE: import.meta.env.DEV ? '/api/auth' : '/user-role-service/userservice',
      AUTHENTICATE: '/authenticate'
    }
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    TIMEOUT: 30000,
    CREDENTIALS: 'include' as RequestCredentials,
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  
  // Timezone and session defaults
  DEFAULTS: {
    J_SESSION: 'subh',
    LOGIN_IP_ADDRESS: '2345',
    CURRENT_LOGIN_TIME: 'GMT+0530',
    TIMEZONE_REGION: 'Asia/Kolkata'
  }
} as const;

// Export individual constants for easier usage
export const { USER_ROLE_SERVICE, REQUEST_CONFIG, DEFAULTS } = API_CONSTANTS;
