import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

interface MotionLinkProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
}

export const MotionButton = ({ children, className, ...props }: MotionButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, transition: {duration: .2} }}
      whileTap={{ scale: 0.8, transition: {duration: .5} }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const MotionLink = ({ children, className, ...props }: MotionLinkProps) => {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
};
