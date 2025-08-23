// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.3 },
        y: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
        filter: { duration: 0.35 }
      }}
      className="min-h-screen w-full bg-gradient-to-r from-[#0f172a] to-[#334155] text-slate-200"
    >
      {children}
    </motion.div>
  );
}
