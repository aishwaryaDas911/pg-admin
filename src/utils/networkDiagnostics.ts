import { API_CONSTANTS, USER_ROLE_SERVICE, MERCHANT_ENTITY_SERVICE } from '@/constants/ApiConstants';

/**
 * Network diagnostics utility to help debug API connectivity issues
 */
export class NetworkDiagnostics {
  
  /**
   * Test basic network connectivity
   */
  static async testNetworkConnectivity(): Promise<boolean> {
    try {
      // Test basic internet connectivity
      const response = await fetch('https://httpbin.org/get', {
        method: 'GET',
        mode: 'cors',
        timeout: 5000,
      });
      return response.ok;
    } catch (error) {
      console.error('❌ Basic network connectivity test failed:', error);
      return false;
    }
  }

  /**
   * Test CORS configuration for a specific URL
   */
  static async testCorsSupport(url: string): Promise<{
    supportsOptions: boolean;
    supportsCors: boolean;
    error?: string;
  }> {
    try {
      console.log(`🧪 Testing CORS support for: ${url}`);
      
      // Test OPTIONS request (CORS preflight)
      const optionsResponse = await fetch(url, {
        method: 'OPTIONS',
        mode: 'cors',
        cache: 'no-cache',
      });

      const supportsOptions = optionsResponse.ok || optionsResponse.status === 405;
      
      return {
        supportsOptions,
        supportsCors: supportsOptions,
      };
    } catch (error) {
      return {
        supportsOptions: false,
        supportsCors: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Test User Role Service connectivity
   */
  static async testUserRoleService(): Promise<{
    accessible: boolean;
    url: string;
    status?: number;
    error?: string;
    corsSupport?: boolean;
  }> {
    const url = `${USER_ROLE_SERVICE.BASE_URL}${USER_ROLE_SERVICE.PATHS.USER_SERVICE}${USER_ROLE_SERVICE.PATHS.AUTHENTICATE}`;
    
    try {
      console.log(`🔐 Testing User Role Service: ${url}`);
      
      // Test CORS first
      const corsResult = await this.testCorsSupport(url);
      
      // Try a simple request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          acqU: 'test',
          acqP: 'test',
          jSession: 'test',
          loginIpAddress: 'test',
          currentLoginTime: 'test',
          timeZoneRegion: 'test'
        })
      });

      return {
        accessible: true,
        url,
        status: response.status,
        corsSupport: corsResult.supportsCors,
      };
    } catch (error) {
      console.error(`❌ User Role Service test failed:`, error);
      return {
        accessible: false,
        url,
        error: error instanceof Error ? error.message : 'Unknown error',
        corsSupport: false,
      };
    }
  }

  /**
   * Test Merchant Entity Service connectivity
   */
  static async testMerchantEntityService(): Promise<{
    accessible: boolean;
    url: string;
    status?: number;
    error?: string;
    corsSupport?: boolean;
  }> {
    const url = `${MERCHANT_ENTITY_SERVICE.BASE_URL}${MERCHANT_ENTITY_SERVICE.PATHS.PROGRAM_MANAGER}${MERCHANT_ENTITY_SERVICE.PATHS.SEARCH_PROGRAM_MANAGER}`;
    
    try {
      console.log(`🏢 Testing Merchant Entity Service: ${url}`);
      
      // Test CORS first
      const corsResult = await this.testCorsSupport(url);
      
      // Try a simple request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          programManagerName: '',
          recordsPerPage: '10',
          pageNumber: 1
        })
      });

      return {
        accessible: true,
        url,
        status: response.status,
        corsSupport: corsResult.supportsCors,
      };
    } catch (error) {
      console.error(`❌ Merchant Entity Service test failed:`, error);
      return {
        accessible: false,
        url,
        error: error instanceof Error ? error.message : 'Unknown error',
        corsSupport: false,
      };
    }
  }

  /**
   * Run comprehensive network diagnostics
   */
  static async runDiagnostics(): Promise<{
    networkConnectivity: boolean;
    userRoleService: Awaited<ReturnType<typeof NetworkDiagnostics.testUserRoleService>>;
    merchantEntityService: Awaited<ReturnType<typeof NetworkDiagnostics.testMerchantEntityService>>;
    recommendations: string[];
  }> {
    console.log('🔍 Starting comprehensive network diagnostics...');
    
    const results = {
      networkConnectivity: await this.testNetworkConnectivity(),
      userRoleService: await this.testUserRoleService(),
      merchantEntityService: await this.testMerchantEntityService(),
      recommendations: [] as string[],
    };

    // Generate recommendations based on results
    if (!results.networkConnectivity) {
      results.recommendations.push('Check internet connectivity');
    }

    if (!results.userRoleService.accessible) {
      results.recommendations.push('User Role Service is not accessible - check if server is running on http://192.168.12.7:9996');
      results.recommendations.push('Consider using development fallback authentication');
    }

    if (!results.merchantEntityService.accessible) {
      results.recommendations.push('Merchant Entity Service is not accessible - check if server is running on http://192.168.12.7:9086');
    }

    if (!results.userRoleService.corsSupport || !results.merchantEntityService.corsSupport) {
      results.recommendations.push('CORS issues detected - may need server-side CORS configuration');
      results.recommendations.push('Enable development mode to use fallback authentication');
    }

    if (results.userRoleService.accessible && results.merchantEntityService.accessible) {
      results.recommendations.push('All services are accessible - check request payload format');
    }

    console.log('📊 Diagnostics Results:', results);
    return results;
  }

  /**
   * Display user-friendly error guidance
   */
  static displayErrorGuidance(error: any): void {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log(`
🚨 NETWORK ERROR DETECTED

This error typically occurs due to:

1. CORS Policy Issues:
   - The external API doesn't allow cross-origin requests
   - Missing CORS headers on the server

2. Network Connectivity:
   - API server is not running or not accessible
   - Network firewall blocking the request
   - Invalid API endpoint URL

3. Request Configuration:
   - Incorrect request headers
   - Invalid request payload format

🔧 TROUBLESHOOTING STEPS:

1. Check if the API servers are running:
   - User Service: http://192.168.12.7:9996
   - Merchant Service: http://192.168.12.7:9086

2. Test API connectivity in development:
   - Use browser dev tools to check network requests
   - Try accessing URLs directly in browser

3. Enable development fallback:
   - The app will automatically use demo credentials
   - Check console for fallback activation

4. Contact system administrator:
   - Request CORS configuration on API servers
   - Verify network accessibility

📝 Available Demo Credentials:
   - admin / password
   - demo / demo123
   - test / test123
   - Shruthi / Subhas@321
      `);
    }
  }
}

// Export convenience functions
export const runNetworkDiagnostics = NetworkDiagnostics.runDiagnostics;
export const displayErrorGuidance = NetworkDiagnostics.displayErrorGuidance;
