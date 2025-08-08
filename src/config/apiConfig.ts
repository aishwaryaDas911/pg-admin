// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  
  // Entity endpoints
  ENDPOINTS: {
    BANKS: '/banks',
    MERCHANTS: '/merchants',
    SUB_MERCHANTS: '/sub-merchants',
    MERCHANT_GROUPS: '/merchant-groups',
    ISOS: '/isos',
    PROGRAM_MANAGERS: '/program-managers',
    FEE_PROGRAMS: '/fee-programs',
    ACQUIRER_PROTOCOLS: '/acquirer-protocols',
    
    // File uploads
    UPLOADS: '/uploads',
    
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile',
    },
    
    // Dashboard & Analytics
    DASHBOARD: '/dashboard',
    ANALYTICS: '/analytics',
    REPORTS: '/reports',
  },
  
  // Default pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
  
  // File upload constraints
  UPLOAD: {
    MAX_SIZE_MB: 5,
    MAX_SIZE_BYTES: 5 * 1024 * 1024,
    ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ACCEPTED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  
  // Request headers
  HEADERS: {
    DEFAULT: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    MULTIPART: {
      'Content-Type': 'multipart/form-data',
    },
  },
  
  // Response status codes
  STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },
  
  // Cache configuration
  CACHE: {
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    LONG_TTL: 60 * 60 * 1000,   // 1 hour
  },
};

// Environment-specific configurations
export const getEnvironmentConfig = () => {
  const env = import.meta.env.VITE_NODE_ENV || 'development';
  
  const configs = {
    development: {
      BASE_URL: 'http://localhost:3000/api',
      LOG_LEVEL: 'debug',
      ENABLE_MOCK: true,
    },
    staging: {
      BASE_URL: 'https://staging-api.example.com/api',
      LOG_LEVEL: 'info',
      ENABLE_MOCK: false,
    },
    production: {
      BASE_URL: 'https://api.example.com/api',
      LOG_LEVEL: 'error',
      ENABLE_MOCK: false,
    },
  };
  
  return configs[env as keyof typeof configs] || configs.development;
};

export default API_CONFIG;
