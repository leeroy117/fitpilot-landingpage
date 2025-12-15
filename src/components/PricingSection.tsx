import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Plan {
  title: string;
  description: string;
  priceMXN: number; // Integer price
  priceUSD: number; // Integer price
  features: string[];
  isPopular?: boolean;
}

interface PricingProps {
  title: string;
  subtitle: string;
  plans: Plan[];
  translations: {
    monthly: string; // "/mo" or "/mes"
    startTrial: string;
    getStarted: string;
    popular: string;
  };
}

export const PricingSection: React.FC<PricingProps> = ({ title, subtitle, plans, translations }) => {
  const [currency, setCurrency] = useState<'MXN' | 'USD'>('MXN');

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden">
        {/* Background blobs for flair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-green-50 to-blue-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-display font-bold text-center mb-4 text-gray-900 tracking-tight">{title}</h2>
        <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">{subtitle}</p>

        {/* Elegant Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-100 p-1.5 rounded-full flex items-center shadow-inner relative cursor-pointer" onClick={() => setCurrency(currency === 'MXN' ? 'USD' : 'MXN')}>
             <motion.div
               layout
               className="absolute bg-white rounded-full shadow-sm border border-gray-200"
               initial={false}
               animate={{ 
                   x: currency === 'MXN' ? 0 : '100%',
                }}
               transition={{ type: "spring", stiffness: 400, damping: 30 }}
               style={{ 
                   width: '50%', 
                   height: 'calc(100% - 12px)', 
                   top: 6,
                   left: 0 
                }}
             />
             {/* We use a separate layout for the slider to avoid complex width calculations, 
                 using a simple two-button approach with a sliding background.
             */}
             <button
                onClick={(e) => { e.stopPropagation(); setCurrency('MXN'); }}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 ${currency === 'MXN' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
             >
                MXN ($)
             </button>
             <button
                onClick={(e) => { e.stopPropagation(); setCurrency('USD'); }}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 ${currency === 'USD' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
             >
                USD ($)
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
             const currentPrice = currency === 'MXN' ? plan.priceMXN : plan.priceUSD;
             
             return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                    relative p-8 rounded-3xl border transition-all duration-300
                    ${plan.isPopular 
                        ? 'bg-white border-green-200 shadow-xl scale-105 z-10' 
                        : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-lg hover:border-green-100'
                    }
                `}
              >
                {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">
                        {translations.popular}
                    </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                <p className="text-gray-500 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                
                <div className="flex items-baseline mb-8">
                    <span className="text-2xl font-bold text-gray-900">$</span>
                    <AnimatePresence mode="wait">
                        <motion.span 
                            key={currentPrice}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="text-5xl font-bold tracking-tight text-gray-900"
                        >
                            {currentPrice}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-gray-500 ml-1 font-medium">{translations.monthly}</span>
                </div>

                <ul className="space-y-4 mb-8 text-sm text-gray-600">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                            <CheckIcon /> {feature}
                        </li>
                    ))}
                </ul>

                <button className={`
                    w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg
                    ${plan.isPopular
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
                        : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                    }
                `}>
                    {plan.isPopular ? translations.getStarted : translations.startTrial}
                </button>
              </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};
