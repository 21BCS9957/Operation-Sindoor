import { motion } from 'framer-motion';

const MotionWrapper = ({ children, initial, animate, exit, transition, ...rest }) => (
  <motion.div
    initial={initial || { opacity: 0, y: 20 }}
    animate={animate || { opacity: 1, y: 0 }}
    exit={exit || { opacity: 0, y: -20 }}
    transition={transition || { duration: 0.6 }}
    {...rest}
  >
    {children}
  </motion.div>
);

export default MotionWrapper; 