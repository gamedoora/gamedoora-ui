'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = [
  'Gameplay Mechanic',
  'Art Style',
  'Narrative Concept',
  'Technical Innovation',
  'Game Design',
  'Audio/Music',
  'User Experience',
  'Monetization',
  'Multiplayer',
  'Virtual Reality',
  'Augmented Reality',
  'Mobile Gaming',
  'Accessibility',
  'Other'
];

export default function CreateIdea() {
  const { data: session } = useSession();
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    isPublic: true,
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated && !session) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, loading, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated && !session) {
    return null; // Will redirect via useEffect
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Idea title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Idea description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
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
      // Here you would typically call an API to create the idea
      // For now, we'll simulate a successful creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to ideas page with success message
      router.push('/ideas?created=true');
    } catch (error) {
      setErrors({ submit: 'Failed to create idea' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Share Your Game Idea</h1>
            <p className="text-gray-600 mt-1">Inspire the community with your creative game concepts</p>
          </div>
          <Link 
            href="/ideas"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.submit}
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Idea Details
              </h2>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Idea Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Give your idea a catchy title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Idea Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe your idea in detail. What makes it unique? How would it work? What problems does it solve?"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. puzzle, multiplayer, procedural, AI (separate with commas)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Add tags to help others discover and categorize your idea
                </p>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Visibility
              </h2>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Make idea public
                  </span>
                </label>
                <p className="mt-1 text-sm text-gray-500 ml-6">
                  {formData.isPublic 
                    ? "Anyone can view and like your idea" 
                    : "Only you can see this idea"
                  }
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Link 
                href="/ideas"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sharing Idea...
                  </div>
                ) : (
                  'Share Idea'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Guidelines Section */}
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Idea Sharing Guidelines</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Be specific and detailed about your concept - the more detail, the better feedback you&rsquo;ll receive</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Consider gameplay mechanics, target audience, and unique selling points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Use clear, engaging language that makes your idea easy to understand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Add relevant tags to help developers find ideas that match their skills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Remember: sharing ideas can lead to amazing collaborations!</span>
            </li>
          </ul>
        </div>

        {/* Example Ideas Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Inspiration?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-2">Gameplay Mechanic</h4>
              <p>&ldquo;Time Rewind Combat: Players can rewind the last 3 seconds of combat to undo damage or retry failed attacks&rdquo;</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-2">Art Style</h4>
              <p>&ldquo;Living Watercolor: Game world painted in watercolor that bleeds and flows based on player emotions&rdquo;</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-2">Narrative Concept</h4>
              <p>&ldquo;Perspective Shifts: Same story told from multiple character viewpoints, revealing new plot elements&rdquo;</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-2">Technical Innovation</h4>
              <p>&ldquo;Procedural Sound: Music and effects that adapt in real-time to player skill level and playstyle&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 