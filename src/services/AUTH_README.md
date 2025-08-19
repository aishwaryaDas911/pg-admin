# Authentication Service Documentation

## Overview
This application integrates with an external authentication API for user login.

## API Configuration

### Production
- **Endpoint**: `http://192.168.12.7:9996/user-role-service/userservice/authenticate`
- **Method**: POST
- **Credentials**: include

### Development
- **Proxy**: Configured in `vite.config.ts` to proxy `/api/auth` to the external API
- **Fallback**: Development mode includes fallback authentication for offline development

## Error Handling

### Common Issues
1. **CORS Errors**: Resolved by Vite proxy in development
2. **Network Errors**: API server may be unreachable
3. **Authentication Failures**: Invalid credentials or server errors

### Development Fallback
When the external API is unavailable, the app falls back to demo credentials:
- Username: `admin` | Password: `password`
- Username: `demo` | Password: `demo123`
- Username: `test` | Password: `test123`

## Files Structure
- `src/constants/ApiConstants.ts` - API endpoints and configuration
- `src/config/apiConfig.ts` - Consolidated API configuration
- `src/services/authService.ts` - Authentication logic and API calls
- `src/contexts/AuthContext.tsx` - React context for authentication state
- `src/pages/Login.tsx` - Login UI component

## Debugging

### Enable Debug Mode
The auth service includes comprehensive logging. Check browser console for:
- API configuration details
- Request/response information
- Error details and suggested fixes

### Testing API Connectivity
```javascript
import { testApiConnection } from '@/services/authService';
testApiConnection().then(result => console.log('API accessible:', result));
```

## Production Deployment
1. Ensure the API server at `192.168.12.7:9996` is accessible from production environment
2. Configure proper CORS headers on the API server
3. Remove development fallback logic if needed
4. Test authentication with production credentials
