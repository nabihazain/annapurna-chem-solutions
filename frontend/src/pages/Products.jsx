import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 'organic-binder',
      name: 'Organic Binder (OB-AE101)',
      category: 'Pelletization',
      description: 'High-quality organic binder specifically formulated for iron ore pelletization processes. Our OB-AE101 ensures excellent binding properties and optimal pellet strength.',
      applications: [
        'Iron ore pelletization',
        'Mineral processing',
        'Pellet manufacturing'
      ],
      features: [
        'High binding efficiency',
        'Consistent quality',
        'Cost-effective solution',
        'Environmentally compliant'
      ],
      image: 'https://images.pexels.com/photos/8108249/pexels-photo-8108249.jpeg'
    },
    {
      id: 'furnace-oil',
      name: 'Furnace Oil',
      category: 'Fuel Additives',
      description: 'Premium quality furnace oil designed for industrial heating applications. Our furnace oil provides efficient combustion and consistent heat generation.',
      applications: [
        'Industrial furnaces',
        'Boiler fuel',
        'Heat generation',
        'Manufacturing processes'
      ],
      features: [
        'High calorific value',
        'Clean burning',
        'Stable composition',
        'Industrial grade quality'
      ],
      image: 'https://images.pexels.com/photos/9381053/pexels-photo-9381053.jpeg'
    },
    {
      id: 'magnetite-powder',
      name: 'Magnetite Powder',
      category: 'Industrial Minerals',
      description: 'Industrial-grade magnetite powder used for water and moisture removal from coal. Our magnetite powder offers excellent magnetic properties and purity.',
      applications: [
        'Coal drying processes',
        'Water separation',
        'Moisture control',
        'Industrial filtration'
      ],
      features: [
        'High magnetic susceptibility',
        'Superior purity',
        'Consistent particle size',
        'Enhanced efficiency'
      ],
      image: 'https://images.unsplash.com/photo-1608797179015-0f64ad48744b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1pbmVyYWwlMjBwb3dkZXJ8ZW58MHx8fHwxNzgwNDI4Mzk4fDA&ixlib=rb-4.1.0&q=85'
    }
  ];

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
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
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
