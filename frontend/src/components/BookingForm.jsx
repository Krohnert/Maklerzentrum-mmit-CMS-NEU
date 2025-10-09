import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cohorts, modulesList, locations } from '../mockData';

const BookingForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    cohort: '',
    module: '',
    locationPreference: '',
    participants: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cohort = params.get('cohort');
    const module = params.get('module');
    const loc = params.get('loc');

    if (cohort || module || loc) {
      setFormData(prev => ({
        ...prev,
        ...(cohort && { cohort }),
        ...(module && { module }),
        ...(loc && { locationPreference: loc })
      }));
    }
  }, [location]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.cohort) newErrors.cohort = 'Bitte Monat/Kohorte wählen.';
    if (!formData.module) newErrors.module = 'Bitte Modul auswählen.';
    if (!formData.firstName) newErrors.firstName = 'Bitte Vorname eingeben.';
    if (!formData.lastName) newErrors.lastName = 'Bitte Nachname eingeben.';
    if (!formData.email) {
      newErrors.email = 'Bitte E-Mail eingeben.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Diese E-Mail sieht nicht korrekt aus.';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Bitte AGB & Datenschutz bestätigen.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      // Redirect to thank you page with parameters
      window.location.href = `/danke?cohort=${encodeURIComponent(formData.cohort)}&module=${encodeURIComponent(formData.module)}`;
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="card-custom">
      <div className="space-y-6">
        {/* Cohort */}
        <div>
          <label htmlFor="cohort" className="block text-sm font-semibold text-gray-700 mb-2">
            Monat/Kohorte *
          </label>
          <select
            id="cohort"
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow ${
              errors.cohort ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Wähle einen Monat</option>
            {cohorts.map(cohort => (
              <option key={cohort} value={cohort}>{cohort}</option>
            ))}
          </select>
          {errors.cohort && <p className="text-red-500 text-sm mt-1">{errors.cohort}</p>}
        </div>

        {/* Module */}
        <div>
          <label htmlFor="module" className="block text-sm font-semibold text-gray-700 mb-2">
            Modul *
          </label>
          <select
            id="module"
            name="module"
            value={formData.module}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow ${
              errors.module ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Wähle ein Modul</option>
            <option value="Alle Module">Alle Module (Gesamt)</option>
            {modulesList.map(module => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>
          {errors.module && <p className="text-red-500 text-sm mt-1">{errors.module}</p>}
        </div>

        {/* Location Preference */}
        <div>
          <label htmlFor="locationPreference" className="block text-sm font-semibold text-gray-700 mb-2">
            Ortpräferenz
          </label>
          <select
            id="locationPreference"
            name="locationPreference"
            value={formData.locationPreference}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
          >
            <option value="">Nächstgelegener Standort</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Participants */}
        <div>
          <label htmlFor="participants" className="block text-sm font-semibold text-gray-700 mb-2">
            Teilnehmende
          </label>
          <input
            type="number"
            id="participants"
            name="participants"
            min="1"
            value={formData.participants}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
          />
        </div>

        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
              Vorname *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
              Nachname *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Nachricht (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
          ></textarea>
        </div>

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 mr-3 w-5 h-5 text-[#D81C1C] border-gray-300 rounded focus:ring-[#D81C1C]"
            />
            <span className="text-sm text-gray-600">
              Ich stimme den <a href="/agb" className="text-[#D81C1C] hover:underline">AGB</a> und der <a href="/datenschutz" className="text-[#D81C1C] hover:underline">Datenschutzerklärung</a> zu. *
            </span>
          </label>
          {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Reservieren'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;