import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Award size={32} />,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards of quality in all our chemical products, ensuring consistent performance and reliability.'
    },
    {
      icon: <Target size={32} />,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations with every order.'
    },
    {
      icon: <Users size={32} />,
      title: 'Industry Expertise',
      description: 'With years of experience in the chemical industry, we understand the unique needs of our clients.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Trust & Integrity',
      description: 'We build lasting relationships through honest business practices and transparent communication.'
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="about-page">
      {/* Header Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">About Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-black mb-6" data-testid="about-title">
              Annapurna Chem Solutions
            </h1>
            <p className="text-lg text-slate-200 max-w-3xl">
              Your trusted partner in industrial chemical supply across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-96 overflow-hidden rounded-sm border border-slate-200">
                <img
                  src="https://images.pexels.com/photos/32845698/pexels-photo-32845698.jpeg"
                  alt="Industrial worker"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Our Story</p>
              <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary mb-6" data-testid="our-story-title">
                Building Industrial Excellence
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-700">
                <p>
                  Annapurna Chem Solutions has established itself as a reliable supplier of
                  industrial chemicals, serving diverse sectors including iron ore pelletization,
                  fuel processing, and coal treatment.
                </p>
                <p>
                  We specialize in providing high-quality chemical products that meet stringent
                  industry standards. Our commitment to quality and customer service has made us
                  a preferred choice for industrial clients across India.
                </p>
                <p>
                  With a deep understanding of industrial processes and chemical applications,
                  we work closely with our clients to provide tailored solutions that enhance
                  their operational efficiency and product quality.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 sm:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Our Values</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary" data-testid="values-title">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`value-card-${index}`}
                className="bg-white p-8 border border-slate-200 rounded-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-accent mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-base leading-relaxed text-slate-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Our Expertise</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary mb-6" data-testid="expertise-title">
              Specialized Chemical Solutions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">01</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Organic Binder</h3>
              <p className="text-base text-slate-700">
                Premium organic binder (OB-AE101) for iron ore pelletization processes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">02</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Furnace Oil</h3>
              <p className="text-base text-slate-700">
                High-quality furnace oil for industrial heating and fuel applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">03</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Magnetite Powder</h3>
              <p className="text-base text-slate-700">
                Industrial-grade magnetite powder for coal moisture removal applications.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mb-6" data-testid="about-cta-title">
              Let's Work Together
            </h2>
            <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
              Contact us to learn more about our products and how we can support your industrial needs.
            </p>
            <a
              href="/contact"
              data-testid="about-contact-btn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-sm hover:bg-slate-100 transition-colors duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
