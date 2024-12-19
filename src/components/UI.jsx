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

  return (
    <motion.main
      className="fixed inset-9 z-10"
      animate={currentScreen}
      variants={variants}
    >
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
          className="flex items-right gap-3 mt-2"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          <button
            onClick={() => onScreenChange("Middle")}
            className="bg-black bg-opacity-80 p-3 rounded-full text-white text-lg hover:bg-opacity-90 transition-colors"
          >
            Read About Us
          </button>
          <button
            onClick={() => onScreenChange("End")}
            className="bg-black bg-opacity-80 p-3 rounded-full text-white text-lg hover:bg-opacity-90 transition-colors"
          >
            Why Use Dave's
          </button>
        </motion.div>
      </section>

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
            className="text-white mt-2"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "Middle" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae voluptatum, quia, quibusdam, voluptates voluptate quos quod
            voluptatibus quas doloribus quidem.
          </motion.p>
          <motion.button
            onClick={() => onScreenChange("Start")}
            className="bg-gray-400 bg-opacity-50 p-3 mt-3 rounded-full text-white font-medium hover:bg-opacity-60 transition-colors"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "Middle" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1.2 }}
          >
            Back to the entrance
          </motion.button>
        </div>
      </section>

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
          <motion.p
            className="text-white mt-2"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "End" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae voluptatum, quia, quibusdam, voluptates voluptate quos quod
            voluptatibus quas doloribus quidem.
          </motion.p>
          <motion.button
            onClick={() => onScreenChange("Start")}
            className="bg-gray-400 bg-opacity-50 p-3 mt-3 rounded-full text-white font-medium hover:bg-opacity-60 transition-colors"
            initial={{ y: 80, opacity: 0 }}
            animate={currentScreen === "End" ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1.2 }}
          >
            Back to the entrance
          </motion.button>
        </div>
      </section>
    </motion.main>
  );
};

export default UI;
