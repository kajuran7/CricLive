'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, CreditCard } from 'lucide-react';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  skillLevel: string;
  hasEquipment: boolean;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  consent: boolean;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    skillLevel: '',
    hasEquipment: false,
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    consent: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationForm>>({});

  const totalSteps = 3;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<RegistrationForm> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.skillLevel) newErrors.skillLevel = 'Skill level is required';
    }

    if (step === 3) {
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
      if (!formData.consent) newErrors.consent = 'You must consent to data collection';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    
    try {
      // TODO: Submit registration to API
      console.log('Submitting registration:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Redirect to payment page or show success message
      alert('Registration submitted successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegistrationForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i + 1 < currentStep 
                ? 'bg-green-600 text-white' 
                : i + 1 === currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {i + 1 < currentStep ? '✓' : i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                i + 1 < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Address & Details</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your street address"
            />
          </div>
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="City"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="State"
            />
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.zipCode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ZIP Code"
            />
            {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level *
            </label>
            <select
              id="skillLevel"
              value={formData.skillLevel}
              onChange={(e) => handleInputChange('skillLevel', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.skillLevel ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select skill level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            {errors.skillLevel && <p className="mt-1 text-sm text-red-600">{errors.skillLevel}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasEquipment"
              checked={formData.hasEquipment}
              onChange={(e) => handleInputChange('hasEquipment', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasEquipment" className="ml-2 text-sm text-gray-700">
              I have my own cricket equipment
            </label>
          </div>

          <div>
            <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-2">
              Medical Conditions (Optional)
            </label>
            <textarea
              id="medicalConditions"
              value={formData.medicalConditions}
              onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please list any medical conditions or allergies..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Emergency Contact & Consent</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name *
            </label>
            <input
              type="text"
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Emergency contact name"
            />
            {errors.emergencyContact && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact}</p>}
          </div>

          <div>
            <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Phone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Emergency contact phone"
              />
            </div>
            {errors.emergencyPhone && <p className="mt-1 text-sm text-red-600">{errors.emergencyPhone}</p>}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-2">Data Privacy & Consent</h3>
              <p className="text-sm text-blue-800 mb-4">
                We collect and process your personal data in accordance with our privacy policy. 
                This includes your contact information, medical details (if provided), and tournament participation data.
              </p>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange('consent', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="consent" className="ml-2 text-sm text-blue-800">
                  I consent to the collection and processing of my personal data as described above *
                </label>
              </div>
              {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <CreditCard className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-yellow-900 mb-2">Registration Fee</h3>
              <p className="text-sm text-yellow-800">
                Tournament registration fee: <span className="font-semibold">$25.00</span><br />
                Payment will be processed securely after form submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournament Registration</h1>
            <p className="text-gray-600">Join our cricket tournament and showcase your skills</p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-4">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
