import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Professional {
  id: number;
  name: string;
  role: 'trainer' | 'nutritionist';
  roleLabel: string;
  specialties: string[];
  location: string;
  rating: number;
  image: string;
  online: boolean;
}

interface ProfessionalsCatalogProps {
  initialProfessionals: Professional[];
  translations: {
    searchPlaceholder: string;
    filterAll: string;
    filterTrainers: string;
    filterNutritionists: string;
    cardSpecialties: string;
    cardContact: string;
    showMore: string;
    noResults: string;
  };
}

export const ProfessionalsCatalog: React.FC<ProfessionalsCatalogProps> = ({ 
  initialProfessionals, 
  translations 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'trainer' | 'nutritionist'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfessionals = useMemo(() => {
    return initialProfessionals.filter((pro) => {
      // 1. Filter by role
      if (activeFilter !== 'all' && pro.role !== activeFilter) {
        return false;
      }
      
      // 2. Filter by search query
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        pro.name.toLowerCase().includes(query) ||
        pro.roleLabel.toLowerCase().includes(query) ||
        pro.location.toLowerCase().includes(query) ||
        pro.specialties.some(s => s.toLowerCase().includes(query))
      );
    });
  }, [initialProfessionals, activeFilter, searchQuery]);

  return (
    <div>
      {/* Header Section with Search and Filters */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
               Catalog
            </span>
            {/* Title & Subtitle are passed as children or rendered in parent, 
                but for now we focus on the interactive parts 
            */}
            
            {/* Pass state up or handle internally? Since the whole page depends on this state, 
                it's better to keep search/filters inside this component OR render them here. 
                Let's render the inputs here to keep state local.
            */}
            
             {/* Search Bar */}
              <div className="mt-8 max-w-2xl mx-auto relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <svg className="h-6 w-6 text-gray-400 group-focus-within:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </div>
               <input 
                 type="text" 
                 placeholder={translations.searchPlaceholder} 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="block w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm text-lg"
               />
            </div>
            
            {/* Quick Filters */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300
                    ${activeFilter === 'all' 
                        ? 'bg-primary text-white shadow-md shadow-primary/20 hover:-translate-y-0.5' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                     }
                  `}
                >
                    {translations.filterAll}
                </button>
                <button 
                  onClick={() => setActiveFilter('trainer')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300
                    ${activeFilter === 'trainer' 
                        ? 'bg-primary text-white shadow-md shadow-primary/20 hover:-translate-y-0.5' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                     }
                  `}
                >
                    {translations.filterTrainers}
                </button>
                <button 
                  onClick={() => setActiveFilter('nutritionist')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300
                    ${activeFilter === 'nutritionist' 
                        ? 'bg-primary text-white shadow-md shadow-primary/20 hover:-translate-y-0.5' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                     }
                  `}
                >
                    {translations.filterNutritionists}
                </button>
            </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                <AnimatePresence mode='popLayout'>
                    {filteredProfessionals.map((pro) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={pro.id}
                            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="relative flex-shrink-0">
                                    <img src={pro.image} alt={pro.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                                    {pro.online && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{pro.name}</h3>
                                    <p className="text-sm font-medium text-gray-500 line-clamp-1">{pro.roleLabel}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <span className="text-xs font-bold text-gray-700">{pro.rating}</span>
                                        <span className="text-xs text-gray-400">• {pro.location}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-6 flex-grow">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{translations.cardSpecialties}</p>
                                <div className="flex flex-wrap gap-2">
                                    {pro.specialties.slice(0, 4).map(tag => (
                                        <span key={tag} className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full bg-gray-900 hover:bg-primary text-white py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-primary/30 mt-auto">
                                {translations.cardContact}
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {filteredProfessionals.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{translations.noResults}</h3>
                        <p className="text-gray-500">{translations.showMore}</p>
                    </div>
                )}
            </div>
        </div>
      </section>
    </div>
  );
};
