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
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Our Story</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-primary mb-8" data-testid="our-story-title">
              Building Industrial Excellence
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-slate-700">
              <p>
                With over a decade of excellence, Our Company has established itself as a trusted name
                in the trading, sourcing, and supply of premium-quality chemicals and natural resources.
                Built on a foundation of integrity, reliability, and customer satisfaction, we have
                consistently delivered high-quality products and tailored solutions to industries
                across diverse sectors.
              </p>
              <p>
                Our expertise spans the procurement and distribution of industrial chemicals, specialty
                in chemical binders, water treatment, magnetite, Furnace Oil and others. By partnering
                with reputed manufacturers and global suppliers, we ensure that every product meets
                stringent quality standards while maintaining competitive pricing and upright delivery
                schedules.
              </p>
              <p>
                Over the years, we have earned the confidence of our clients through transparent
                business practices, ethical operations, and an unwavering commitment to excellence.
                Our experienced team understands the dynamic needs of modern industries and works
                closely with customers to provide customized sourcing solutions that maximize
                efficiency and create long-term value.
              </p>
              <p>
                Innovation, sustainability, and responsible resource management remain at the core
                of our business philosophy. We continuously strive to optimize our supply chain,
                adopt environmentally responsible practices, and contribute positively to the
                industries and communities we serve.
              </p>
              <p>
                Today, our strong market presence, extensive supplier network, and customer-centric
                approach have positioned us as a preferred partner for businesses seeking quality,
                consistency, and reliability.
              </p>
              <p className="text-primary font-medium italic border-l-4 border-accent pl-4">
                At Annapurna Chem Sol, we don't just supply products—we build lasting partnerships,
                deliver dependable solutions, and drive sustainable growth for our clients worldwide.
              </p>
            </div>
          </motion.div>
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
