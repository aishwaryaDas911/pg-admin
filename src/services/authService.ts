import { API_CONFIG } from '@/config/apiConfig';
import { REQUEST_CONFIG, DEFAULTS } from '@/constants/ApiConstants';

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
    const response = await fetch(API_CONFIG.EXTERNAL_AUTH.LOGIN_URL, {
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
    
    // Handle network errors, parsing errors, etc.
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error: Unable to connect to authentication service');
    } else if (error instanceof SyntaxError) {
      console.error('Response parsing error: Invalid JSON response');
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
