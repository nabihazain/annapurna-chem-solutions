import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';

const Home = () => {
  const products = [
    {
      name: 'Flocculants',
      description: 'High-performance flocculants including cationic & anionic polyacrylamide for water treatment and mineral processing.',
      image: 'https://customer-assets.emergentagent.com/job_chem-supply-hub-3/artifacts/4fjrr4rx_flocculant.jpeg',
      link: '/products#flocculant'
    },
    {
      name: 'Organic Coagulant',
      description: 'Effective organic coagulant for water clarification, sludge dewatering, and industrial wastewater treatment.',
      image: 'https://customer-assets.emergentagent.com/job_chem-supply-hub-3/artifacts/j5gaok5h_coagulant.jpeg',
      link: '/products#organic-coagulant'
    },
    {
      name: 'Magnetite Powder',
      description: 'Industrial-grade magnetite powder for water and moisture removal from coal and dense media separation.',
      image: 'https://images.unsplash.com/photo-1608797179015-0f64ad48744b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1pbmVyYWwlMjBwb3dkZXJ8ZW58MHx8fHwxNzgwNDI4Mzk4fDA&ixlib=rb-4.1.0&q=85',
      link: '/products#magnetite-powder'
    },
    {
      name: 'Furnace Oil',
      description: 'Premium quality furnace oil designed for industrial heating, boilers, and combustion applications.',
      image: 'https://images.pexels.com/photos/9381053/pexels-photo-9381053.jpeg',
      link: '/products#furnace-oil'
    },
    {
      name: 'Organic Binders',
      description: 'Premium organic binders (AE101, AE002, AE009) for iron ore pelletization and mineral processing.',
      image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg',
      link: '/products#organic-binders'
    },
    {
      name: 'APAM',
      description: 'Anionic Polyacrylamide for mining, mineral processing, and water clarification applications.',
      image: 'https://customer-assets.emergentagent.com/job_chem-supply-hub-3/artifacts/eof981d2_Anionic%20flocculant%20%28Apam%29.jpeg',
      link: '/products#anionic-flocculation'
    }
  ];

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Quality Assured',
      description: 'All products meet stringent industry standards and quality certifications.'
    },
    {
      icon: <Truck size={32} />,
      title: 'Reliable Delivery',
      description: 'Timely delivery across India with proper packaging and handling.'
    },
    {
      icon: <Award size={32} />,
      title: 'Industry Expertise',
      description: 'Years of experience in chemical supply and industrial solutions.'
    }
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/10490664/pexels-photo-10490664.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 text-center text-white"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-black mb-6" data-testid="hero-title">
            Premium Chemical Solutions
            <br />
            for Industrial Excellence
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 mb-8 max-w-2xl mx-auto" data-testid="hero-subtitle">
            Trusted supplier of high-quality chemicals for water treatment,
            mineral processing, and industrial applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              data-testid="hero-cta-products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-sm hover:bg-slate-100 transition-colors duration-200"
            >
              View Products
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/order"
              data-testid="hero-cta-order"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Place Order
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Products Preview Section - Moved BEFORE Why Choose Us */}
      <section className="py-20 sm:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Our Products</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary mb-4" data-testid="products-preview-title">
              Industrial Chemical Solutions
            </h2>
            <p className="text-base leading-relaxed text-slate-700 max-w-2xl mx-auto">
              We supply premium chemicals for various industrial applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`product-preview-${index}`}
                className="bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">{product.name}</h3>
                  <p className="text-sm text-slate-700 mb-4">{product.description}</p>
                  <Link
                    to={product.link}
                    data-testid={`product-preview-link-${index}`}
                    className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              data-testid="view-all-products-btn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-sm hover:bg-slate-800 transition-colors duration-200"
            >
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Moved AFTER Products */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary" data-testid="features-title">
              Committed to Quality & Service
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`feature-card-${index}`}
                className="p-8 border border-slate-200 rounded-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-accent mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-base leading-relaxed text-slate-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mb-6" data-testid="cta-title">
              Ready to Place Your Order?
            </h2>
            <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
              Get in touch with us today for all your chemical supply needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order"
                data-testid="cta-place-order-btn"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-sm hover:bg-slate-100 transition-colors duration-200"
              >
                Place an Order
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                data-testid="cta-contact-btn"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
