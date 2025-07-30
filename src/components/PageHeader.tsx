import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative mb-12">
      <div className={`absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-90 rounded-2xl`}>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 rounded-2xl"
          />
        )}
      </div>
      
      <div className="relative py-16 px-8 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl max-w-2xl opacity-90"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;