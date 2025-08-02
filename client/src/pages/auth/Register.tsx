import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Building, AlertCircle } from "lucide-react";
import quickdeskLogo from "@/assets/quickdesk-logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    role: "end-user", // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRoleRequest, setShowRoleRequest] = useState(false);
  const [roleRequestSent, setRoleRequestSent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Show role request button if role is changed from default
    if (field === "role" && value !== "end-user") {
      setShowRoleRequest(true);
      setRoleRequestSent(false);
    } else if (field === "role" && value === "end-user") {
      setShowRoleRequest(false);
    }
  };

  const handleRoleRequest = () => {
    // In a real app, this would send a request to the backend
    console.log(`Role change request sent for ${formData.role}`);
    setRoleRequestSent(true);
    setShowRoleRequest(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      // For demo purposes, we'll just log the data
      console.log("Registration data:", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        role: formData.role,
        roleRequested: formData.role !== "end-user"
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just store basic user data
      localStorage.setItem('user', JSON.stringify({
        id: Math.random().toString(36).substring(7),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: "end-user" // Always register as end-user initially
      }));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-brand items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <img src={quickdeskLogo} alt="QuickDesk" className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Join QuickDesk Today</h2>
          <p className="text-xl text-white/90 mb-8">
            Get started with the most powerful help desk solution for modern teams
          </p>
          <div className="grid grid-cols-1 gap-4 text-left max-w-md">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span>Free of cost Service</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span>We hear you</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            <img src={quickdeskLogo} alt="QuickDesk" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">QuickDesk</h1>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <CardDescription>
                Start your free trial and transform your support experience
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error message */}
              {error && (
                <div className="text-red-500 text-center mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <Label htmlFor="firstName" className="form-label">First name*</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="lastName" className="form-label">Last name*</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="form-group">
                  <Label htmlFor="email" className="form-label">Email address*</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Company field */}
                <div className="form-group">
                  <Label htmlFor="company" className="form-label">Company (optional)</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="form-group">
                  <Label htmlFor="role" className="form-label">Role*</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="end-user">End User</SelectItem>
                      <SelectItem value="support-agent">Support Agent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {showRoleRequest && (
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRoleRequest}
                        disabled={roleRequestSent}
                      >
                        {roleRequestSent ? "Request Sent" : "Request Role Change"}
                      </Button>
                      {roleRequestSent && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          Admin approval required
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Password fields */}
                <div className="form-group">
                  <Label htmlFor="password" className="form-label">Password*</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="form-group">
                  <Label htmlFor="confirmPassword" className="form-label">Confirm password*</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              {/* Social login separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={isLoading}>
                  {/* Google icon */}
                  Google
                </Button>
                <Button variant="outline" disabled={isLoading}>
                  {/* Apple icon */}
                  Apple
                </Button>
              </div>

              {/* Login link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}