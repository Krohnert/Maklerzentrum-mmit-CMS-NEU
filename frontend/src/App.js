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

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schulung" element={<Schulung />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/kontakt" element={<Kontakt />} />
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
  );
}

export default App;
