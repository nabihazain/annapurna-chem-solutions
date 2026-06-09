import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const products = [
  {
    id: 'flocculant',
    name: 'Flocculant',
    category: 'Water Treatment',
    description: 'High-performance flocculants used for water clarification, sludge dewatering, and solid-liquid separation in industrial processes. Available in cationic and anionic variants for diverse applications.',
    applications: [
      'Water and wastewater treatment',
      'Mineral processing',
      'Pulp and paper industry',
      'Sludge dewatering'
    ],
    features: [
      'High molecular weight',
      'Excellent settling performance',
      'Wide pH compatibility',
      'Cost-effective dosing'
    ],
    image: 'https://images.pexels.com/photos/8108249/pexels-photo-8108249.jpeg'
  },
  {
    id: 'cationic-flocculation',
    name: 'Cationic Flocculation',
    category: 'Polyacrylamide',
    description: 'Cationic polyacrylamide flocculant designed for sludge dewatering and treatment of negatively charged colloidal suspensions. Effective in municipal and industrial wastewater applications.',
    applications: [
      'Sludge dewatering',
      'Municipal wastewater treatment',
      'Paper retention aid',
      'Oil-water separation'
    ],
    features: [
      'High charge density',
      'Rapid flocculation',
      'Strong floc formation',
      'Reduced sludge volume'
    ],
    image: 'https://images.pexels.com/photos/9381053/pexels-photo-9381053.jpeg'
  },
  {
    id: 'anionic-flocculation',
    name: 'Anionic Flocculation (APAM)',
    category: 'Polyacrylamide',
    description: 'Anionic Polyacrylamide (APAM) for mineral processing, mining, and water clarification. Highly effective in treating suspensions with positively charged particles.',
    applications: [
      'Mining and mineral processing',
      'Coal washing',
      'Iron ore beneficiation',
      'Drinking water clarification'
    ],
    features: [
      'High molecular weight',
      'Excellent solubility',
      'Strong adsorption',
      'Effective at low dosage'
    ],
    image: 'https://images.unsplash.com/photo-1608797179015-0f64ad48744b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1pbmVyYWwlMjBwb3dkZXJ8ZW58MHx8fHwxNzgwNDI4Mzk4fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'organic-coagulant',
    name: 'Organic Coagulant',
    category: 'Water Treatment',
    description: 'Polymer-based organic coagulant for primary treatment of industrial wastewater. Effective in reducing turbidity, color, and dissolved organic compounds.',
    applications: [
      'Industrial wastewater treatment',
      'Textile effluent treatment',
      'Drinking water purification',
      'Paper mill effluents'
    ],
    features: [
      'Low sludge generation',
      'Effective over wide pH range',
      'Reduces chemical consumption',
      'Environmentally friendly'
    ],
    image: 'https://images.pexels.com/photos/8108249/pexels-photo-8108249.jpeg'
  }
];

const organicBinders = [
  {
    id: 'ae101',
    name: 'AE101',
    description: 'Premium grade organic binder for iron ore pelletization. Provides excellent green and dry pellet strength.',
    features: ['High binding efficiency', 'Superior pellet strength', 'Low ash content']
  },
  {
    id: 'ae002',
    name: 'AE002',
    description: 'Cost-effective organic binder for industrial pelletization processes. Balanced performance across multiple applications.',
    features: ['Versatile usage', 'Consistent quality', 'Economical solution']
  },
  {
    id: 'ae009',
    name: 'AE009',
    description: 'High-performance organic binder with enhanced binding properties for premium pellet production.',
    features: ['Enhanced strength', 'Improved drop number', 'Reduced fines generation']
  }
];

const Products = () => {
  const location = useLocation();
  const [bindersExpanded, setBindersExpanded] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      if (id === 'organic-binders' || id.startsWith('ae')) {
        setBindersExpanded(true);
      }
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div data-testid="products-page" className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">Our Catalog</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-black mb-6" data-testid="products-title">
              Industrial Chemical Products
            </h1>
            <p className="text-lg text-slate-200 max-w-3xl">
              Explore our range of premium chemical solutions designed for industrial applications.
              All products meet stringent quality standards and industry certifications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-20 z-30" data-testid="product-nav">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-wrap gap-2">
            {products.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(p.id);
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                data-testid={`nav-product-${p.id}`}
                className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-sm text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                {p.name}
              </a>
            ))}
            <a
              href="#organic-binders"
              onClick={(e) => {
                e.preventDefault();
                setBindersExpanded(true);
                const el = document.getElementById('organic-binders');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              data-testid="nav-product-organic-binders"
              className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-sm text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              Organic Binders
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="space-y-20">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                id={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                data-testid={`product-${product.id}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center scroll-mt-32"
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="h-96 overflow-hidden rounded-sm border border-slate-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                    {product.category}
                  </p>
                  <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary mb-4">
                    {product.name}
                  </h2>
                  <p className="text-base leading-relaxed text-slate-700 mb-6">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-primary mb-3">Applications:</h3>
                    <ul className="space-y-2">
                      {product.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-accent mt-1">•</span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-primary mb-3">Key Features:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-accent mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/order"
                    state={{ selectedProduct: product.name }}
                    data-testid={`order-${product.id}-btn`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-sm hover:bg-slate-800 transition-colors duration-200"
                  >
                    Order This Product
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Organic Binders - Expandable Category */}
            <motion.div
              id="organic-binders"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              data-testid="product-organic-binders"
              className="scroll-mt-32"
            >
              <button
                onClick={() => setBindersExpanded(!bindersExpanded)}
                data-testid="toggle-organic-binders"
                className="w-full bg-primary text-white p-8 rounded-sm flex items-center justify-between hover:bg-slate-800 transition-colors duration-200"
              >
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-2">Category</p>
                  <h2 className="text-3xl sm:text-4xl tracking-tight font-bold">
                    Organic Binders
                  </h2>
                  <p className="text-sm text-slate-200 mt-2">
                    Premium organic binders for iron ore pelletization — Available in 3 grades
                  </p>
                </div>
                {bindersExpanded ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
              </button>

              <AnimatePresence initial={false}>
                {bindersExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      {organicBinders.map((binder, idx) => (
                        <motion.div
                          key={binder.id}
                          id={binder.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          data-testid={`binder-${binder.id}`}
                          className="bg-white border border-slate-200 rounded-sm p-6 hover:shadow-md transition-shadow scroll-mt-32"
                        >
                          <div className="bg-accent/10 w-16 h-16 rounded-sm flex items-center justify-center mb-4">
                            <span className="text-xl font-bold text-accent uppercase">{binder.name}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-primary mb-3">{binder.name}</h3>
                          <p className="text-sm text-slate-700 mb-4">{binder.description}</p>
                          <ul className="space-y-2 mb-6">
                            {binder.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="text-accent mt-1">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <Link
                            to="/order"
                            state={{ selectedProduct: `Organic Binder ${binder.name}` }}
                            data-testid={`order-binder-${binder.id}-btn`}
                            className="inline-flex items-center gap-2 text-accent font-medium hover:underline text-sm"
                          >
                            Order {binder.name}
                            <ArrowRight size={16} />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary mb-6" data-testid="products-cta-title">
              Need Help Choosing a Product?
            </h2>
            <p className="text-base leading-relaxed text-slate-700 mb-8 max-w-2xl mx-auto">
              Our team is here to assist you in selecting the right chemical solution for your specific needs.
            </p>
            <Link
              to="/contact"
              data-testid="products-contact-btn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-sm hover:bg-slate-800 transition-colors duration-200"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
