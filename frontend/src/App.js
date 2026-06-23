import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import PlaceOrder from '@/pages/PlaceOrder';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AdminDashboard from '@/pages/AdminDashboard';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
