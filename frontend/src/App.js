import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';
import Home from './pages/Home';
import Schulung from './pages/Schulung';
import Services from './pages/Services';
import About from './pages/About';
import Kontakt from './pages/Kontakt';
import Danke from './pages/Danke';
import DankeFirmenklasse from './pages/DankeFirmenklasse';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import Impressum from './pages/Impressum';

// Redirect component for Schulung route
const SchulungRedirect = () => {
  React.useEffect(() => {
    window.location.href = '/schulung.html';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D81C1C] mx-auto mb-4"></div>
        <p className="text-gray-600">Weiterleitung zur Schulungsseite...</p>
      </div>
    </div>
  );
};

// Redirect component for Services route
const ServicesRedirect = () => {
  React.useEffect(() => {
    window.location.href = '/services.html';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D81C1C] mx-auto mb-4"></div>
        <p className="text-gray-600">Weiterleitung zur Services-Seite...</p>
      </div>
    </div>
  );
};

// Redirect component for About route
const AboutRedirect = () => {
  React.useEffect(() => {
    window.location.href = '/about.html';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D81C1C] mx-auto mb-4"></div>
        <p className="text-gray-600">Weiterleitung zur Über uns-Seite...</p>
      </div>
    </div>
  );
};

// Redirect component for Kontakt route
const KontaktRedirect = () => {
  React.useEffect(() => {
    window.location.href = '/kontakt.html';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D81C1C] mx-auto mb-4"></div>
        <p className="text-gray-600">Weiterleitung zur Kontakt-Seite...</p>
      </div>
    </div>
  );
};

// Redirect component for Home route
const HomeRedirect = () => {
  React.useEffect(() => {
    window.location.href = '/index_home.html';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D81C1C] mx-auto mb-4"></div>
        <p className="text-gray-600">Weiterleitung zur Home-Seite...</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schulung" element={<SchulungRedirect />} />
          <Route path="/services" element={<ServicesRedirect />} />
          <Route path="/about" element={<AboutRedirect />} />
          <Route path="/kontakt" element={<KontaktRedirect />} />
          <Route path="/danke" element={<Danke />} />
          <Route path="/danke-firmenklasse" element={<DankeFirmenklasse />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
        <Footer />
        <MobileStickyCTA />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
