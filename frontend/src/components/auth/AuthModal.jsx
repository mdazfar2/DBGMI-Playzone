import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Mail, Lock, Calendar, MapPin, Map, Smartphone, Shield, User, CreditCard } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../common/Button';

const MOCK_OTP = '123456';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginStep, setLoginStep] = useState('email');
  const [signupStep, setSignupStep] = useState('contact');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState('email');
  
  // Form states
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [favoriteMap, setFavoriteMap] = useState('');
  const [upiId, setUpiId] = useState('');
  
  const resetForm = () => {
    setEmail('');
    setOtp('');
    setPhone('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setConfirmPassword('');
    setDob('');
    setCity('');
    setFavoriteMap('');
    setUpiId('');
    setLoginStep('email');
    setSignupStep('contact');
    setForgotPasswordStep('email');
    setIsLoading(false);
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };
  
  // Mock OTP verification
  const verifyOtp = (enteredOtp) => {
    return enteredOtp === MOCK_OTP;
  };
  
  const handleSendOtp = () => {
    if (!email) {
      toast.error('Please enter your email address', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ef4444',
        }
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success('OTP sent successfully to email! Use 123456', {
        duration: 5000,
        position: 'bottom-center',
        style: {
          background: '#10b981',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981',
        }
      });

      // Fix: Set signupStep to 'verification' when on signup, not loginStep
      if (activeTab === 'signup') {
        setSignupStep('verification');
      } else if (loginStep === 'forgotPassword') {
        setForgotPasswordStep('otp');
      } else {
        setLoginStep('password');
      }
    }, 1500);
  };
  
  const handleLogin = () => {
    if (!password) {
      toast.error('Please enter your password', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ef4444',
        }
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate login processing
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful! Welcome back, soldier!', {
        style: {
          background: '#10b981',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981',
        }
      });
      handleClose();
    }, 1500);
  };
  
  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      toast.error('Please fill in all required fields', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ef4444',
        }
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ef4444',
        }
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password reset successfully! Please login with your new password.', {
        style: {
          background: '#10b981',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981',
        }
      });
      setLoginStep('email');
      setForgotPasswordStep('email');
    }, 1500);
  };
  
  const handleForgotPasswordOtp = () => {
    if (!verifyOtp(otp)) {
      toast.error('Invalid OTP. Please try again.', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ef4444',
        }
      });
      return;
    }
    
    setForgotPasswordStep('newPassword');
  };
  
  const handleSignupNext = () => {
    if (signupStep === 'contact') {
      if (!email || !phone) {
        toast.error('Please fill in all required fields', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }
      
      handleSendOtp();
    } else if (signupStep === 'verification') {
      if (!verifyOtp(otp)) {
        toast.error('Incorrect OTP entered. Please check and try again.', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }
      
      setSignupStep('name');
    } else if (signupStep === 'name') {
      if (!firstName || !lastName) {
        toast.error('Please enter your full name', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }
      
      setSignupStep('profile');
    } else if (signupStep === 'profile') {
      if (!dob || !city || !favoriteMap) {
        toast.error('Please fill in all required fields', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }
      
      setSignupStep('upi');
    } else if (signupStep === 'upi') {
      if (!upiId) {
        toast.error('Please enter your UPI ID', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }
      
      // Basic UPI ID validation
      if (!upiId.includes('@')) {
        toast.error('Please enter a valid UPI ID (e.g., name@upi)', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }
      
      setSignupStep('password');
    } else {
      // Password step
      if (!password || !confirmPassword) {
        toast.error('Please fill in all required fields', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }

      // Password length validation
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          }
        });
        return;
      }
      setIsLoading(true);
      // Simulate account creation
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Account created successfully! Welcome to DBGMI!', {
          style: {
            background: '#10b981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
          }
        });
        handleClose();
      }, 2000);
    }
  };
  
  // Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isOpen) {
        if (activeTab === 'login') {
          if (loginStep === 'email') {
            handleSendOtp();
          } else if (loginStep === 'password') {
            handleLogin();
          } else if (loginStep === 'forgotPassword') {
            if (forgotPasswordStep === 'email') {
              handleSendOtp();
            } else if (forgotPasswordStep === 'otp') {
              handleForgotPasswordOtp();
            } else {
              handleResetPassword();
            }
          }
        } else {
          handleSignupNext();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab, loginStep, signupStep, forgotPasswordStep, email, otp, phone, firstName, lastName, password, confirmPassword, dob, city, favoriteMap, upiId]);
  
  const renderLoginContent = () => {
    if (loginStep === 'email') {
      return (
        <div className="space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-white">Join the Battle</h3>
            <p className="text-gray-400 text-sm mt-1">Enter your email to continue your mission</p>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleSendOtp} 
            fullWidth
            isLoading={isLoading}
            loadingText="Verifying..."
          >
            Continue
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2.5 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors flex items-center justify-center bg-gray-850">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
            
            <button className="w-full px-4 py-2.5 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors flex items-center justify-center bg-gray-850">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5 mr-2" />
              Continue with Facebook
            </button>
          </div>
        </div>
      );
    } else if (loginStep === 'password') {
      return (
        <div className="space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-white">Welcome Back, Soldier</h3>
            <p className="text-gray-400 text-sm mt-1">Enter your password to continue</p>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <Lock className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setLoginStep('forgotPassword');
                setForgotPasswordStep('email');
              }}
              className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
            >
              Forgot Password?
            </button>
            
            <button
              onClick={() => handleTabChange('signup')}
              className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
            >
              Create New Account
            </button>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleLogin} 
            fullWidth
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            Login
          </Button>
        </div>
      );
    } else if (loginStep === 'forgotPassword') {
      if (forgotPasswordStep === 'email') {
        return (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <h3 className="text-xl font-bold text-white">Reset Your Password</h3>
              <p className="text-gray-400 text-sm mt-1">Enter the email you used to create your account</p>
            </div>
            
            <div>
              <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="forgot-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <Button 
              variant="primary" 
              onClick={handleSendOtp} 
              fullWidth
              isLoading={isLoading}
              loadingText="Sending OTP..."
            >
              Send OTP
            </Button>
            
            <div className="text-center">
              <button
                onClick={() => setLoginStep('password')}
                className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      } else if (forgotPasswordStep === 'otp') {
        return (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <h3 className="text-xl font-bold text-white">Verify Your Identity</h3>
              <p className="text-gray-400 text-sm mt-1">We sent a code to {email}</p>
            </div>
            
            <div>
              <label htmlFor="forgot-otp" className="block text-sm font-medium text-gray-300 mb-1">
                Enter OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="forgot-otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
                <Shield className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <Button 
              variant="primary" 
              onClick={handleForgotPasswordOtp} 
              fullWidth
              isLoading={isLoading}
              loadingText="Verifying..."
            >
              Verify OTP
            </Button>
            
            <div className="text-center">
              <button
                onClick={() => {
                  handleSendOtp();
                  toast('OTP resent successfully!', {
                    icon: '🔄',
                    position: 'bottom-center',
                  });
                }}
                className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
              >
                Resend OTP
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <h3 className="text-xl font-bold text-white">Set New Password</h3>
              <p className="text-gray-400 text-sm mt-1">Set your new password and remember it</p>
            </div>
            
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter new password (min 8 characters)"
                />
                <Lock className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirm-new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Confirm your new password"
                />
                <Lock className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <Button 
              variant="primary" 
              onClick={handleResetPassword} 
              fullWidth
              isLoading={isLoading}
              loadingText="Resetting..."
            >
              Reset Password
            </Button>
            
            <div className="text-center">
              <button
                onClick={() => setLoginStep('password')}
                className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      }
    }
  };
  
  const renderSignupContent = () => {
    if (signupStep === 'contact') {
      return (
        <div className="space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-white">Join DBGMI</h3>
            <p className="text-gray-400 text-sm mt-1">Step 1 of 6 - Contact Information</p>
          </div>
          
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Contact Number / WhatsApp *
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Your 10-digit mobile number"
              />
              <Smartphone className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleSignupNext} 
            fullWidth
            isLoading={isLoading}
            loadingText="Sending OTP..."
          >
            Send OTP
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      );
    }
    
    if (signupStep === 'verification') {
      return (
        <div className="space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-white">Verify Your Email</h3>
            <p className="text-gray-400 text-sm mt-1">Step 2 of 6 - Verification</p>
            <p className="text-gray-400 text-sm">We sent a code to {email}</p>
          </div>
          
          <div>
            <label htmlFor="signup-otp" className="block text-sm font-medium text-gray-300 mb-1">
              Enter OTP *
            </label>
            <div className="relative">
              <input
                type="text"
                id="signup-otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
              <Shield className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleSignupNext} 
            fullWidth
            isLoading={isLoading}
            loadingText="Verifying..."
          >
            Verify & Continue
          </Button>
          
          <div className="text-center">
            <button
              onClick={() => {
                handleSendOtp();
                toast('OTP resent successfully!', {
                  icon: '🔄',
                  position: 'bottom-center',
                });
              }}
              className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
            >
              Resend OTP
            </button>
          </div>
        </div>
      );
    }
    
    if (signupStep === 'name') {
      return (
        <div className="space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-white">Your Real Name</h3>
            <p className="text-gray-400 text-sm mt-1">Step 3 of 6 - Personal Information</p>
            <p className="text-gray-400 text-xs mt-2">Please enter your legal name (not in-game name) for record keeping</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-1">
                First Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="First name"
                />
                <User className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-1">
                Last Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Last name"
                />
                <User className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleSignupNext} 
            fullWidth
            isLoading={isLoading}
            loadingText="Continuing..."
          >
            Continue
          </Button>
        </div>
      );
    }
    
    if (signupStep === 'profile') {
      return (
        <div className="space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-white">Player Profile</h3>
            <p className="text-gray-400 text-sm mt-1">Step 4 of 6 - Gaming Preferences</p>
          </div>
          
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-1">
              Date of Birth *
            </label>
            <div className="relative">
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
              City *
            </label>
            <div className="relative">
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your city"
              />
              <MapPin className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div>
            <label htmlFor="favorite-map" className="block text-sm font-medium text-gray-300 mb-1">
              Favorite BGMI Map *
            </label>
            <div className="relative">
              <select
                id="favorite-map"
                value={favoriteMap}
                onChange={(e) => setFavoriteMap(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                <option value="">Select a map</option>
                <option value="Erangel">Erangel</option>
                <option value="Miramar">Miramar</option>
                <option value="Sanhok">Sanhok</option>
                <option value="Vikendi">Vikendi</option>
                <option value="Livik">Livik</option>
              </select>
              <Map className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleSignupNext} 
            fullWidth
            isLoading={isLoading}
            loadingText="Continuing..."
          >
            Continue
          </Button>
        </div>
      );
    }

    if (signupStep === 'upi') {
      return (
        <div className="space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-white">Payment Information</h3>
            <p className="text-gray-400 text-sm mt-1">Step 5 of 6 - UPI Details</p>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-200 text-sm">
              <span className="font-semibold">Why we need this:</span> When you win tournaments in the future, 
              we'll use this UPI ID to send you your well-deserved cash prizes quickly and securely.
            </p>
          </div>
          
          <div>
            <label htmlFor="upi-id" className="block text-sm font-medium text-gray-300 mb-1">
              UPI ID *
            </label>
            <div className="relative">
              <input
                type="text"
                id="upi-id"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., name@upi or mobile@paytm"
              />
              <CreditCard className="absolute right-3 top-3.5 text-gray-400" size={18} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Example: name@upi, 9876543210@paytm, etc.</p>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleSignupNext} 
            fullWidth
            isLoading={isLoading}
            loadingText="Continuing..."
          >
            Continue
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-5">
        <div className="text-center mb-2">
          <h3 className="text-xl font-bold text-white">Secure Your Account</h3>
          <p className="text-gray-400 text-sm mt-1">Step 6 of 6 - Set Password</p>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password *
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Create a password (min 8 characters)"
            />
            <Lock className="absolute right-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
            <Lock className="absolute right-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>
        
        <Button 
          variant="primary" 
          onClick={handleSignupNext} 
          fullWidth
          isLoading={isLoading}
          loadingText="Creating Account..."
        >
          Create DBGMI Account
        </Button>
      </div>
    );
  };
  
  return (
    <>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
            <div className="relative">
              {/* BGMI-themed decorative elements */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500"></div>
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>
              
              {/* Header */}
              <div className="p-6 pb-0 relative">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    <span className="text-yellow-500">DBGMI</span> Tournament
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {activeTab === 'login' ? 'Sign in to your account' : 'Create your warrior profile'}
                  </p>
                </div>
                
                {/* Auth tabs */}
                <div className="flex border-b border-gray-800">
                  <button
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'login'
                        ? 'text-yellow-500 border-b-2 border-yellow-500 font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => handleTabChange('login')}
                  >
                    Login
                  </button>
                  <button
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'signup'
                        ? 'text-yellow-500 border-b-2 border-yellow-500 font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => handleTabChange('signup')}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {activeTab === 'login' ? renderLoginContent() : renderSignupContent()}
              </div>
              
              {/* Footer */}
              <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-800 text-center">
                <p className="text-xs text-gray-500">
                  {activeTab === 'login' 
                    ? "Don't have an account? " 
                    : "Already have an account? "}
                  <button
                    onClick={() => handleTabChange(activeTab === 'login' ? 'signup' : 'login')}
                    className="text-yellow-500 hover:text-yellow-400 font-medium"
                  >
                    {activeTab === 'login' ? 'Sign up' : 'Login'}
                  </button>
                </p>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default AuthModal;