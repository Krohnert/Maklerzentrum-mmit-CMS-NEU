import React, { useState } from 'react';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    timeframe: '',
    teamSize: '',
    modules: '',
    location: '',
    contactPerson: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.timeframe) newErrors.timeframe = 'Bitte Zeitraum/Monat angeben.';
    if (!formData.teamSize) newErrors.teamSize = 'Bitte Teamgrösse angeben.';
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

    setTimeout(() => {
      console.log('Company form submitted:', formData);
      window.location.href = '/danke-firmenklasse';
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="card-custom">
      <div className="space-y-6">
        {/* Timeframe */}
        <div>
          <label htmlFor="timeframe" className="block text-sm font-semibold text-gray-700 mb-2">
            Zeitraum/Monat *
          </label>
          <input
            type="text"
            id="timeframe"
            name="timeframe"
            placeholder="z.B. März 2026 oder Q2 2026"
            value={formData.timeframe}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow ${
              errors.timeframe ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.timeframe && <p className="text-red-500 text-sm mt-1">{errors.timeframe}</p>}
        </div>

        {/* Team Size */}
        <div>
          <label htmlFor="teamSize" className="block text-sm font-semibold text-gray-700 mb-2">
            Teamgrösse *
          </label>
          <input
            type="number"
            id="teamSize"
            name="teamSize"
            min="1"
            placeholder="Anzahl Teilnehmer"
            value={formData.teamSize}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow ${
              errors.teamSize ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
        </div>

        {/* Modules */}
        <div>
          <label htmlFor="modules" className="block text-sm font-semibold text-gray-700 mb-2">
            Module/Themen
          </label>
          <textarea
            id="modules"
            name="modules"
            rows="3"
            placeholder="Welche Module interessieren euch?"
            value={formData.modules}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
            Gewünschter Ort
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="z.B. Zürich oder bei euch vor Ort"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700 mb-2">
            Ansprechperson
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            placeholder="Vorname Nachname"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
          />
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

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
            Firma/Rechnungsadresse
          </label>
          <textarea
            id="company"
            name="company"
            rows="3"
            placeholder="Firmenname, Adresse"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D81C1C] focus:border-transparent transition-shadow"
          ></textarea>
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

        {/* Terms */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;