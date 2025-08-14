import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ChatakLogo from '../../src/assets/Chatak-AdminLogo.jpg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, location]);

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(formData.username, formData.password);

      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to dashboard...",
        });
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset functionality will be implemented soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* CHATAK Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1 mb-1">
             <img
      src={ChatakLogo}
      alt="Chatak Logo"
      className="h-full w-60 object-cover"
    />
          </div>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-card/95 border-border/50 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md border border-border/50">
              <p className="font-medium mb-1">🔧 Demo Credentials (External API Fallback):</p>
              <p>Username: <span className="font-mono">admin</span> | Password: <span className="font-mono">password</span></p>
              <p>Username: <span className="font-mono">demo</span> | Password: <span className="font-mono">demo123</span></p>
              <p>Username: <span className="font-mono">Shruthi</span> | Password: <span className="font-mono">Subhas@321</span></p>
              <p className="text-xs mt-1 opacity-75">⚠️ If external API unavailable, fallback auth is used</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 h-12 bg-background border-input focus:border-ring focus:ring-ring"
                    disabled={isLoading}
                    required
                    aria-describedby={error ? "error-message" : undefined}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 bg-background border-input focus:border-ring focus:ring-ring"
                    disabled={isLoading}
                    required
                    aria-describedby={error ? "error-message" : undefined}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-secondary hover:text-secondary/80 transition-colors focus:outline-none focus:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isLoading || !formData.username.trim() || !formData.password.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Copyright ©2020-2021 Chatak. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
            <span>Powered by</span>
            <span className="font-semibold">
              <span className="text-primary">C</span>
              <span className="text-secondary">H</span>
              <span className="text-accent">A</span>
              <span className="text-primary">T</span>
              <span className="text-secondary">A</span>
              <span className="text-accent">K</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
