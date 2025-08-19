// API Constants for external services
export const API_CONSTANTS = {
  // Base URLs for different services
  USER_ROLE_SERVICE: {
    // Always use direct URL to external API
    BASE_URL: 'http://192.168.12.7:9996',
    PATHS: {
      USER_SERVICE: '/user-role-service/userservice',
      AUTHENTICATE: '/authenticate'
    }
  },

  // Merchant Entity Service
  MERCHANT_ENTITY_SERVICE: {
    BASE_URL: 'http://192.168.12.7:9086',
    PATHS: {
      PROGRAM_MANAGER: '/merchant-entity-service/programmanager',
      SEARCH_PROGRAM_MANAGER: '/processSearchProgramManager'
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
export const { USER_ROLE_SERVICE, MERCHANT_ENTITY_SERVICE, REQUEST_CONFIG, DEFAULTS } = API_CONSTANTS;
