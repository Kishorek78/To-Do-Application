import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Account created successfully! Welcome to TaskFlow!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      // Redirect to Google OAuth
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      window.location.href = `${apiUrl}/auth/google`;
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error('Failed to sign up with Google');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden px-4 py-6 sm:py-8">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/10 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/15 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-36 h-36 sm:w-64 sm:h-64 rounded-full bg-[#00eaff]/8 blur-3xl animate-pulse delay-1500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-gradient-cyan rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-cyan border border-[#00eaff] mb-3 sm:mb-4 lg:mb-6 transform hover:scale-105 transition-all duration-300">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gradient-cyan drop-shadow-lg mb-2">
            Join TaskFlow
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#b0b8c1]">
            Create your account to get started
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl glass-dark border border-[#00eaff]/30 shadow-2xl w-full">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6 w-full">
            <div className="w-full">
              <label htmlFor="name" className="block text-sm font-medium text-[#00eaff] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-modern focus:ring-2 focus:ring-[#00eaff]/50 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base w-full touch-manipulation"
                placeholder="Enter your full name"
              />
            </div>

            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-[#00eaff] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-modern focus:ring-2 focus:ring-[#00eaff]/50 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base w-full touch-manipulation"
                placeholder="Enter your email"
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="block text-sm font-medium text-[#00eaff] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-modern focus:ring-2 focus:ring-[#00eaff]/50 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base w-full touch-manipulation"
                placeholder="Create a password"
              />
            </div>

            <div className="w-full">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#00eaff] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input-modern focus:ring-2 focus:ring-[#00eaff]/50 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base w-full touch-manipulation"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-[#00eaff] focus:ring-[#00eaff] border-[#00eaff]/30 rounded mt-1 touch-manipulation"
              />
              <label htmlFor="terms" className="ml-2 block text-xs sm:text-sm text-[#b0b8c1] touch-manipulation leading-relaxed">
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="text-[#00eaff] hover:text-[#a259ff] font-medium transition-colors duration-200"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-[#00eaff] hover:text-[#a259ff] font-medium transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold flex items-center justify-center gap-2 sm:gap-3 transform hover:scale-[1.02] transition-all duration-200 touch-manipulation"
            >
              {loading ? (
                <>
                  <div className="spinner h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4 sm:my-6 lg:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#00eaff]/20" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-[#232526] text-[#b0b8c1]">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 lg:space-y-4">
            <button 
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl glass-dark border border-[#00eaff]/20 text-[#00eaff] hover:bg-[#00eaff]/10 hover:border-[#00eaff]/40 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] touch-manipulation text-sm sm:text-base"
            >
              {googleLoading ? (
                <>
                  <div className="spinner h-3 w-3 sm:h-4 sm:w-4"></div>
                  Connecting to Google...
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <button className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl glass-dark border border-[#00eaff]/20 text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200 font-medium opacity-50 cursor-not-allowed touch-manipulation text-sm sm:text-base">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Continue with Twitter (Coming Soon)
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-[#b0b8c1]">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-[#00eaff] hover:text-[#a259ff] font-medium transition-colors duration-200 touch-manipulation"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4 sm:mt-6">
          <Link
            to="/"
            className="text-xs sm:text-sm text-[#b0b8c1] hover:text-[#00eaff] transition-colors duration-200 touch-manipulation"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
