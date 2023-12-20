"use client";

import { motion } from "framer-motion";

const AnimateComp = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .5 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateComp;
