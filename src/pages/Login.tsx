import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Lock, Eye, EyeOff, AlertCircle, Shield, Zap, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
            <div className="absolute inset-0 animate-pulse rounded-full h-12 w-12 border-4 border-secondary/10"></div>
          </div>
          <p className="text-muted-foreground font-medium animate-pulse">Loading...</p>
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-8 h-8 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-br from-secondary/25 to-accent/25 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-gradient-to-br from-primary/35 to-secondary/35 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Enhanced CHATAK Branding */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 rounded-lg blur-xl"></div>
              <div className="relative inline-flex items-center space-x-1 mb-3 p-4">
                <span className="text-5xl font-bold tracking-wide">
                  <span className="text-primary drop-shadow-sm">C</span>
                  <span className="text-secondary drop-shadow-sm">H</span>
                  <span className="text-accent drop-shadow-sm">A</span>
                  <span className="text-primary drop-shadow-sm">T</span>
                  <span className="text-secondary drop-shadow-sm">A</span>
                  <span className="text-accent drop-shadow-sm">K</span>
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-lg font-medium">Admin Portal</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Features highlight */}
          <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">Fast</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">Collaborative</p>
            </div>
          </div>

          {/* Enhanced Login Card */}
          <Card className="backdrop-blur-lg bg-card/80 border-border/20 shadow-2xl shadow-primary/10 animate-fade-in">
            <CardHeader className="space-y-1 text-center pb-6">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
              
              {/* Demo credentials with better styling */}
              <div className="mt-4 p-4 bg-gradient-to-r from-muted/40 to-muted/60 rounded-lg border border-border/30">
                <p className="font-semibold text-sm mb-2 text-foreground/90">Demo Credentials</p>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Username:</span>
                    <code className="bg-background/60 px-2 py-1 rounded text-foreground font-mono">admin</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Password:</span>
                    <code className="bg-background/60 px-2 py-1 rounded text-foreground font-mono">password</code>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-fade-in border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Enhanced Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold text-foreground/90">
                    Username
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="pl-12 h-14 bg-background/60 border-input/50 focus:border-primary/50 focus:ring-primary/20 focus:ring-2 transition-all duration-200 rounded-lg"
                      disabled={isLoading}
                      required
                      aria-describedby={error ? "error-message" : undefined}
                    />
                  </div>
                </div>

                {/* Enhanced Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground/90">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 h-14 bg-background/60 border-input/50 focus:border-primary/50 focus:ring-primary/20 focus:ring-2 transition-all duration-200 rounded-lg"
                      disabled={isLoading}
                      required
                      aria-describedby={error ? "error-message" : undefined}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-secondary hover:text-secondary/80 transition-colors duration-200 focus:outline-none focus:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Enhanced Login Button */}
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold text-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading || !formData.username.trim() || !formData.password.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground"></div>
                      <span>Signing you in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Enhanced Footer */}
          <div className="mt-10 text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-muted-foreground/50"></div>
              <span>Copyright ©2020-2021 Chatak. All Rights Reserved.</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-muted-foreground/50"></div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <span>Powered by</span>
              <span className="font-bold text-sm">
                <span className="text-primary">C</span>
                <span className="text-secondary">H</span>
                <span className="text-accent">A</span>
                <span className="text-primary">T</span>
                <span className="text-secondary">A</span>
                <span className="text-accent">K</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
