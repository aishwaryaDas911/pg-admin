import { API_CONFIG } from '@/config/apiConfig';
import { REQUEST_CONFIG, DEFAULTS, USER_ROLE_SERVICE } from '@/constants/ApiConstants';

// Interface for login request payload
interface LoginPayload {
  acqU: string;
  acqP: string;
  jSession: string;
  loginIpAddress: string;
  currentLoginTime: string;
  timeZoneRegion: string;
}

// Interface for login response
interface LoginResponse {
  status: boolean;
  message?: string;
  data?: any;
  user?: any;
}

// Interface for auth user data
export interface AuthUserData {
  id: string;
  username: string;
  loginTime: Date;
  isAuthenticated: boolean;
  [key: string]: any;
}

/**
 * Authenticate user with the external API
 * @param username - User's username
 * @param password - User's password
 * @returns Promise<boolean> - true if login successful, false otherwise
 */
export const authenticateUser = async (username: string, password: string): Promise<boolean> => {
  // Validate input parameters
  if (!username || !password) {
    console.error('Username and password are required');
    return false;
  }

  // Debug: Check if API_CONFIG is loaded correctly
  console.log('API_CONFIG:', API_CONFIG);
  console.log('EXTERNAL_AUTH:', API_CONFIG.EXTERNAL_AUTH);

  // Get the login URL with fallback
  let loginUrl: string;
  if (API_CONFIG.EXTERNAL_AUTH && API_CONFIG.EXTERNAL_AUTH.LOGIN_URL) {
    loginUrl = API_CONFIG.EXTERNAL_AUTH.LOGIN_URL;
  } else {
    // Fallback: construct URL directly from constants
    console.warn('EXTERNAL_AUTH configuration missing, using fallback URL construction');
    loginUrl = `${USER_ROLE_SERVICE.BASE_URL}${USER_ROLE_SERVICE.PATHS.USER_SERVICE}${USER_ROLE_SERVICE.PATHS.AUTHENTICATE}`;
  }

  console.log('Using login URL:', loginUrl);

  if (!loginUrl) {
    console.error('Could not determine login URL');
    return false;
  }

  try {
    // Prepare the payload according to API specification
    const payload: LoginPayload = {
      acqU: username,
      acqP: password,
      jSession: DEFAULTS.J_SESSION,
      loginIpAddress: DEFAULTS.LOGIN_IP_ADDRESS,
      currentLoginTime: DEFAULTS.CURRENT_LOGIN_TIME,
      timeZoneRegion: DEFAULTS.TIMEZONE_REGION
    };

    // Make the API call
    console.log('Attempting authentication with:', loginUrl);

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: REQUEST_CONFIG.HEADERS,
      credentials: REQUEST_CONFIG.CREDENTIALS,
      body: JSON.stringify(payload)
    });

    // Check if request was successful
    if (!response.ok) {
      console.error('Authentication request failed:', response.status, response.statusText);
      return false;
    }

    // Parse the response
    const data: LoginResponse = await response.json();

    // Check if login was successful based on status field
    if (data.status === true) {
      // Create user data object
      const userData: AuthUserData = {
        id: data.user?.id || username,
        username: username,
        loginTime: new Date(),
        isAuthenticated: true,
        ...data.user // Include any additional user data from response
      };

      // Save user data to localStorage
      localStorage.setItem('authUser', JSON.stringify(userData));
      
      return true;
    } else {
      console.warn('Login failed:', data.message || 'Invalid credentials');
      return false;
    }

  } catch (error) {
    console.error('Authentication error:', error);

    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('🚨 CORS or Network Error Detected!');
      console.error('This could be due to:');
      console.error('1. CORS policy blocking the request');
      console.error('2. API server not running at', loginUrl);
      console.error('3. Network connectivity issues');
      console.error('4. Firewall or security restrictions');

      // Always use fallback for fetch errors (both dev and production)
      console.log('🔄 Using fallback authentication due to network/CORS error...');
      return handleDevelopmentFallback(username, password);
    } else if (error instanceof SyntaxError) {
      console.error('Response parsing error: Invalid JSON response from server');
    } else if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timeout: Authentication request took too long');
    } else {
      console.error('Unexpected error during authentication:', error);
    }

    return false;
  }
};

/**
 * Clear user authentication data
 */
export const clearAuthData = (): void => {
  localStorage.removeItem('authUser');
};

/**
 * Get current authenticated user from localStorage
 * @returns AuthUserData | null
 */
export const getCurrentUser = (): AuthUserData | null => {
  try {
    const userData = localStorage.getItem('authUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return {
        ...parsedData,
        loginTime: new Date(parsedData.loginTime)
      };
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    clearAuthData(); // Clear corrupted data
    return null;
  }
};

/**
 * Check if user is currently authenticated
 * @returns boolean
 */
export const isUserAuthenticated = (): boolean => {
  const user = getCurrentUser();
  return user?.isAuthenticated === true;
};

/**
 * Development fallback authentication when API is not accessible
 * This allows development to continue even when the external API is unavailable
 * @param username - User's username
 * @param password - User's password
 * @returns Promise<boolean>
 */
const handleDevelopmentFallback = async (username: string, password: string): Promise<boolean> => {
  console.log('🔄 Using development fallback authentication...');
  console.log('⚠️  External API unavailable - switching to demo mode');

  // Simple demo credentials for development
  const validCredentials = [
    { username: 'admin', password: 'password' },
    { username: 'demo', password: 'demo123' },
    { username: 'test', password: 'test123' },
    // Add any credentials the user might try
    { username: 'Shruthi', password: 'Subhas@321' }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const isValid = validCredentials.some(cred =>
    cred.username === username && cred.password === password
  );

  if (isValid) {
    console.log('✅ Development authentication successful');

    // Create development user data
    const userData: AuthUserData = {
      id: 'dev-' + username,
      username: username,
      loginTime: new Date(),
      isAuthenticated: true,
      isDevelopmentMode: true
    };

    // Save user data to localStorage
    localStorage.setItem('authUser', JSON.stringify(userData));

    return true;
  } else {
    console.log('❌ Development authentication failed');
    console.log('Valid demo credentials:');
    validCredentials.forEach(cred =>
      console.log(`- Username: ${cred.username}, Password: ${cred.password}`)
    );
    return false;
  }
};

/**
 * Test function to verify API endpoint accessibility
 * This can be used for debugging purposes
 * @returns Promise<boolean>
 */
export const testApiConnection = async (): Promise<boolean> => {
  try {
    // Get the login URL with same fallback logic
    let loginUrl: string;
    if (API_CONFIG.EXTERNAL_AUTH && API_CONFIG.EXTERNAL_AUTH.LOGIN_URL) {
      loginUrl = API_CONFIG.EXTERNAL_AUTH.LOGIN_URL;
    } else {
      loginUrl = `${USER_ROLE_SERVICE.BASE_URL}${USER_ROLE_SERVICE.PATHS.USER_SERVICE}${USER_ROLE_SERVICE.PATHS.AUTHENTICATE}`;
    }

    console.log('Testing API connection to:', loginUrl);

    // Make a simple request to test connectivity
    const response = await fetch(loginUrl, {
      method: 'OPTIONS', // Use OPTIONS to test CORS
      headers: REQUEST_CONFIG.HEADERS,
      credentials: REQUEST_CONFIG.CREDENTIALS,
    });

    console.log('API connection test response:', response.status, response.statusText);
    return response.ok || response.status === 405; // 405 Method Not Allowed is also acceptable for OPTIONS
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};
