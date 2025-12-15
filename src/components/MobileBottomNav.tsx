import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileBottomNavProps {
  label: string;
  links: {
    trainers: { label: string; url: string };
    nutritionists: { label: string; url: string };
  };
}

export const MobileBottomNav = ({ label, links }: MobileBottomNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and past 100px threshold, hide
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false); // also close if open
      } else {
        // If scrolling up or at top, show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div 
      className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div ref={navRef} className="pointer-events-auto relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-[#0B1121]/95 backdrop-blur-md border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col p-1.5 space-y-1">
                <a
                  href={links.trainers.url}
                  className="px-4 py-3.5 text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-white rounded-xl transition-all flex items-center justify-center group"
                  onClick={() => setIsOpen(false)}
                >
                  {links.trainers.label}
                </a>
                <div className="h-px bg-white/5 mx-2" />
                <a
                  href={links.nutritionists.url}
                  className="px-4 py-3.5 text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-white rounded-xl transition-all flex items-center justify-center group"
                  onClick={() => setIsOpen(false)}
                >
                  {links.nutritionists.label}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          className="bg-[#0B1121]/90 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5 flex items-center justify-center gap-2 hover:bg-[#0B1121] transition-colors min-w-[200px]"
        >
          <span className="text-sm font-semibold tracking-wide">{label}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
