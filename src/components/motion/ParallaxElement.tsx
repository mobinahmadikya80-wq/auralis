import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // negative moves slower, positive moves faster
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  className = '',
  speed = 0.2
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
