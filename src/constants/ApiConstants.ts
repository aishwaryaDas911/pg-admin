// Environment detection
const IS_DEVELOPMENT = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname.includes('preview'));

// API Constants for external services
export const API_CONSTANTS = {
  // Base URLs for different services with environment-aware fallbacks
  USER_ROLE_SERVICE: {
    // Use environment-aware URLs with fallback for development
    BASE_URL: IS_DEVELOPMENT
      ? (import.meta.env.VITE_USER_SERVICE_URL || 'http://192.168.12.7:9996')
      : 'http://192.168.12.7:9996',
    PATHS: {
      USER_SERVICE: '/user-role-service/userservice',
      AUTHENTICATE: '/authenticate'
    }
  },

  // Merchant Entity Service
  MERCHANT_ENTITY_SERVICE: {
    BASE_URL: IS_DEVELOPMENT
      ? (import.meta.env.VITE_MERCHANT_SERVICE_URL || 'http://192.168.12.7:9086')
      : 'http://192.168.12.7:9086',
    PATHS: {
      PROGRAM_MANAGER: '/merchant-entity-service/programmanager',
      SEARCH_PROGRAM_MANAGER: '/processSearchProgramManager'
    }
  },

  // Environment settings
  ENVIRONMENT: {
    IS_DEVELOPMENT,
    ENABLE_FALLBACK: IS_DEVELOPMENT,
    ENABLE_MOCK_DATA: IS_DEVELOPMENT && import.meta.env.VITE_ENABLE_MOCK !== 'false',
  },

  // Request configuration with CORS support
  REQUEST_CONFIG: {
    TIMEOUT: 30000,
    CREDENTIALS: 'include' as RequestCredentials,
    MODE: 'cors' as RequestMode,
    CACHE: 'no-cache' as RequestCache,
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(IS_DEVELOPMENT && {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      })
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
