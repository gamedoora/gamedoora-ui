'use client';
import Link from 'next/link';
import Hero from '../components/Hero';
import Brand from '../components/Brand';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  checkUsernameAvailability, 
  validateUsernameRealTime,
  addUsernameToBloomFilter 
} from '@/lib/usernameValidation';

export default function SignUp() {
  const { data: session } = useSession();
  const router = useRouter();
  const { register, loading, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);

  if (session) {
    redirect(`/`);
  }

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/profile');
    }
  }, [isAuthenticated, loading, router]);

  // Debounced username availability check
  const checkUsername = useCallback(async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      setUsernameSuggestions([]);
      return;
    }

    setUsernameChecking(true);
    
    try {
      const result = await checkUsernameAvailability(username);
      setUsernameAvailable(result.isValid);
      
      if (!result.isValid && result.suggestions) {
        setUsernameSuggestions(result.suggestions);
      } else {
        setUsernameSuggestions([]);
      }

      if (!result.isValid && typeof result.error === 'string') {
        setErrors(prev => ({
          ...prev,
          username: result.error!
        }));
      } else if (result.isValid) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Username check failed:', error);
    } finally {
      setUsernameChecking(false);
    }
  }, []);

  // Debounce username checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.username) {
        checkUsername(formData.username);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.username, checkUsername]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for username
    if (name === 'username') {
      // Real-time format validation
      const validation = validateUsernameRealTime(value);
      if (!validation.isValid && typeof validation.error === 'string') {
        setErrors(prev => ({
          ...prev,
          username: validation.error!
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
        });
      }
      setUsernameAvailable(null);
      setUsernameSuggestions([]);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing (except for username real-time validation)
    if (errors[name] && name !== 'username') {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (usernameAvailable === false) {
      newErrors.username = 'Username is not available';
    } else if (usernameAvailable === null && formData.username.trim()) {
      newErrors.username = 'Please wait for username availability check';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await register({
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        username: formData.username.trim(),
        email: formData.email,
        password: formData.password,
      });
      
      if (result.success) {
        // Add username to bloom filter after successful registration
        addUsernameToBloomFilter(formData.username.trim());
        
        // Registration successful, redirect to login
        router.push('/sign-in?message=Registration successful! Please log in.');
      } else {
        setErrors({ submit: result.error || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <Hero />
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <Brand signIn={false} />

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                {errors.submit && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {errors.submit}
                  </div>
                )}

                <div className="flex gap-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="first name"
                      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                        errors.firstName ? 'border-red-300' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="last name"
                      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                        errors.lastName ? 'border-red-300' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="your_username"
                      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                        errors.username ? 'border-red-300' : 
                        usernameAvailable === true ? 'border-green-300' :
                        usernameAvailable === false ? 'border-red-300' :
                        'border-gray-200 dark:border-gray-700'
                      }`}
                    />
                    {usernameChecking && (
                      <div className="absolute right-3 top-4">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                    {!usernameChecking && usernameAvailable === true && (
                      <div className="absolute right-3 top-4 text-green-600">
                        ✓
                      </div>
                    )}
                    {!usernameChecking && usernameAvailable === false && (
                      <div className="absolute right-3 top-4 text-red-600">
                        ✗
                      </div>
                    )}
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                  )}
                  {usernameSuggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {usernameSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, username: suggestion }));
                              setUsernameSuggestions([]);
                            }}
                            className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    3-20 characters, letters, numbers, underscore, or hyphen. No spaces.
                  </p>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gamedoora.com"
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      errors.email ? 'border-red-300' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your Password"
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      errors.password ? 'border-red-300' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div className="mt-6">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Sign up'
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Have an account already?{' '}
                <Link
                  href={'/sign-in'}
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign In
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
