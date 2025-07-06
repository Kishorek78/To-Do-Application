import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setGoogleLoading(true);
    try {
      // Redirect to Google OAuth
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      window.location.href = `${apiUrl}/auth/google`;
    } catch (error) {
      console.error('Google signin error:', error);
      toast.error('Failed to sign in with Google');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#00eaff]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-[#a259ff]/10 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[#f1c27d]/15 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-[#00eaff]/8 blur-3xl animate-pulse delay-1500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-gradient-cyan rounded-3xl shadow-cyan border border-[#00eaff] mb-6 transform hover:scale-105 transition-all duration-300">
            <svg className="h-10 w-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gradient-cyan drop-shadow-lg mb-2">
            Welcome Back
          </h1>
          <p className="text-lg text-[#b0b8c1]">
            Sign in to your TaskFlow account
          </p>
        </div>

        {/* Login Form */}
        <div className="card p-8 rounded-3xl glass-dark border border-[#00eaff]/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#00eaff] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-modern"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#00eaff] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-modern"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#00eaff] focus:ring-[#00eaff] border-[#00eaff]/30 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#b0b8c1]">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-[#00eaff] hover:text-[#a259ff] transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="spinner h-5 w-5"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#00eaff]/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#232526] text-[#b0b8c1]">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl glass-dark border border-[#00eaff]/20 text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <>
                  <div className="spinner h-4 w-4"></div>
                  Connecting to Google...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl glass-dark border border-[#00eaff]/20 text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200 font-medium opacity-50 cursor-not-allowed">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Continue with Twitter (Coming Soon)
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-[#b0b8c1]">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#00eaff] hover:text-[#a259ff] font-semibold transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#b0b8c1] hover:text-[#00eaff] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
