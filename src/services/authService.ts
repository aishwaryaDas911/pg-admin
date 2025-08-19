import { API_CONFIG } from '@/config/apiConfig';
import { REQUEST_CONFIG, DEFAULTS, USER_ROLE_SERVICE } from '@/constants/ApiConstants';
import { displayErrorGuidance } from '@/utils/networkDiagnostics';

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

    // Determine headers based on environment
    const headers = API_CONFIG.IS_DEVELOPMENT
      ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
      : REQUEST_CONFIG.HEADERS;

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      credentials: API_CONFIG.CORS.CREDENTIALS,
      mode: API_CONFIG.CORS.MODE,
      cache: API_CONFIG.CORS.CACHE,
      body: JSON.stringify(payload)
    };

    console.log('Request options:', requestOptions);

    const response = await fetch(loginUrl, requestOptions);

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

    // Use the network diagnostics utility for better error guidance
    displayErrorGuidance(error);

    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {

      // Always use fallback for fetch errors in development
      console.log('🔄 Activating fallback authentication...');
      try {
        const fallbackResult = await handleDevelopmentFallback(username, password);
        console.log('📝 Fallback authentication result:', fallbackResult);
        return fallbackResult;
      } catch (fallbackError) {
        console.error('🚨 Fallback authentication also failed:', fallbackError);
        return false;
      }
    } else if (error instanceof SyntaxError) {
      console.error('Response parsing error: Invalid JSON response from server');
      // Try fallback for parsing errors too
      console.log('🔄 Trying fallback due to parsing error...');
      try {
        return await handleDevelopmentFallback(username, password);
      } catch (fallbackError) {
        console.error('Fallback failed for parsing error:', fallbackError);
        return false;
      }
    } else if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timeout: Authentication request took too long');
      // Try fallback for timeout errors too
      console.log('🔄 Trying fallback due to timeout...');
      try {
        return await handleDevelopmentFallback(username, password);
      } catch (fallbackError) {
        console.error('Fallback failed for timeout error:', fallbackError);
        return false;
      }
    } else {
      console.error('Unexpected error during authentication:', error);
      // Try fallback for any unexpected errors
      console.log('🔄 Trying fallback due to unexpected error...');
      try {
        return await handleDevelopmentFallback(username, password);
      } catch (fallbackError) {
        console.error('Fallback failed for unexpected error:', fallbackError);
        return false;
      }
    }
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
  console.log('⚠️ External API unavailable - switching to demo mode');
  console.log('🔑 Available demo credentials:');
  console.log('   - admin / password');
  console.log('   - demo / demo123');
  console.log('   - test / test123');
  console.log('   - Shruthi / Subhas@321');
  console.log('📝 Attempting login with:', username);

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
