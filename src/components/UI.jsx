import { motion } from "framer-motion";

export const UI = ({ currentScreen, onScreenChange, isAnimating }) => {
  // Animation variants for each screen
  const variants = {
    Start: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1.2,
      },
    },
    Middle: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1.2,
      },
    },
    End: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1.2,
      },
    },
  };

  // Enhanced button variants
  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  // Stagger animation for button groups
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.main
      className="fixed inset-9 z-10"
      animate={currentScreen}
      variants={variants}
    >
      {/* START SCREEN */}
      <section
        className={`absolute inset-0 flex flex-col items-end justify-center transition-opacity duration-1000 ${
          currentScreen === "Start"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <motion.img
          src="/images/Daves-Paint.jpg"
          alt="Paint Truck"
          className="h-40"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        />
        <h1 className="text-7xl text-cyan-400 drop-shadow-xl shadow-2xl opacity-90 font-extrabold text-right">
          River County
          <br />
          Painter
        </h1>

        <motion.div
          className="flex items-center gap-4 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate={currentScreen === "Start" ? "visible" : "hidden"}
        >
          <motion.button
            onClick={() => onScreenChange("Middle")}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-full text-white text-lg font-semibold shadow-lg border border-blue-500/30"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
            <span className="relative z-10">Read About Us</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: "9999px" }}
            />
          </motion.button>

          <motion.button
            onClick={() => onScreenChange("End")}
            className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-cyan-700 px-8 py-4 rounded-full text-white text-lg font-semibold shadow-lg border border-cyan-500/30"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
            <span className="relative z-10">Why Use Dave's</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: "9999px" }}
            />
          </motion.button>
        </motion.div>
      </section>

      {/* MIDDLE SCREEN */}
      <section
        className={`absolute inset-0 flex flex-col items-start justify-center p-10 transition-opacity duration-1000 ${
          currentScreen === "Middle"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="md:max-w-2xl">
          <motion.h1
            className="text-7xl text-white opacity-90 font-extrabold -ml-1"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "Middle" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 1.2 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-white mt-4 text-lg leading-relaxed"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "Middle" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            River County Painter has been serving the community with
            professional painting services for over a decade. Our experienced
            team delivers quality workmanship with attention to detail that
            transforms your vision into reality.
          </motion.p>

          <motion.button
            onClick={() => onScreenChange("Start")}
            className="relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-3 mt-6 rounded-full text-white font-semibold shadow-lg border border-gray-500/30 group"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "Middle" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to the entrance
            </span>
          </motion.button>
        </div>
      </section>

      {/* END SCREEN */}
      <section
        className={`absolute inset-0 flex flex-col items-end justify-center p-10 transition-opacity duration-1000 ${
          currentScreen === "End"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="md:max-w-2xl">
          <motion.h1
            className="text-7xl text-white opacity-90 font-extrabold -ml-1"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "End" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 1.2 }}
          >
            Why Use Dave's
          </motion.h1>

          <motion.div
            className="mt-4 space-y-3"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "End" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            <div className="flex items-center gap-3 text-white text-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Professional quality workmanship</span>
            </div>
            <div className="flex items-center gap-3 text-white text-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Licensed and fully insured</span>
            </div>
            <div className="flex items-center gap-3 text-white text-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Free estimates and consultations</span>
            </div>
            <div className="flex items-center gap-3 text-white text-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Satisfaction guaranteed</span>
            </div>
          </motion.div>

          <motion.button
            onClick={() => onScreenChange("Start")}
            className="relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-3 mt-6 rounded-full text-white font-semibold shadow-lg border border-gray-500/30 group"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "End" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to the entrance
            </span>
          </motion.button>
        </div>
      </section>
    </motion.main>
  );
};

export default UI;
