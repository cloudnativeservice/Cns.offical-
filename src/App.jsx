import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Features from './pages/Features';
import Setup from './pages/Setup';
import Compare from './pages/Compare';
import Download from './pages/Download';
import Changelog from './pages/Changelog';
import Roadmap from './pages/Roadmap';
import Documentation from './pages/Documentation';
import ApiReference from './pages/ApiReference';
import Github from './pages/Github';
import Community from './pages/Community';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import License from './pages/License';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="setup" element={<Setup />} />
          <Route path="compare" element={<Compare />} />
          <Route path="download" element={<Download />} />
          
          <Route path="changelog" element={<Changelog />} />
          <Route path="roadmap" element={<Roadmap />} />
          
          <Route path="documentation" element={<Documentation />} />
          <Route path="apireference" element={<ApiReference />} />
          <Route path="github" element={<Github />} />
          <Route path="community" element={<Community />} />
          
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termsofservice" element={<TermsOfService />} />
          <Route path="license" element={<License />} />
          <Route path="contactus" element={<ContactUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
