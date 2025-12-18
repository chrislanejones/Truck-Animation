import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loading = ({ progress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    const targetProgress = Math.max(0, Math.min(100, progress));

    if (targetProgress < 20) {
      setLoadingText("Loading 3D models...");
    } else if (targetProgress < 40) {
      setLoadingText("Loading character...");
    } else if (targetProgress < 60) {
      setLoadingText("Loading animations...");
    } else if (targetProgress < 80) {
      setLoadingText("Loading textures...");
    } else if (targetProgress < 100) {
      setLoadingText("Almost ready...");
    } else {
      setLoadingText("Ready to paint!");
    }

    const duration = 300;
    const startTime = Date.now();
    const startProgress = displayProgress;
    const progressDiff = targetProgress - startProgress;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const newProgress = startProgress + progressDiff * easeOut;

      setDisplayProgress(newProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    if (targetProgress > displayProgress) {
      requestAnimationFrame(animate);
    }
  }, [progress, displayProgress]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      {/* Background gradient orbs */}
      <motion.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
          top: "-50px",
          right: "-100px",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-50px",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{
          textAlign: "center",
          zIndex: 10,
          width: "90%",
          maxWidth: "800px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Title */}
        <motion.div variants={itemVariants} style={{ marginBottom: "40px" }}>
          <motion.h1
            style={{
              fontSize: "48px",
              color: "#22d3ee",
              fontWeight: "900",
              margin: "0 0 10px 0",
              textShadow: "0 10px 30px rgba(34, 211, 238, 0.2)",
            }}
            animate={{
              textShadow: [
                "0 10px 30px rgba(34, 211, 238, 0.2)",
                "0 10px 40px rgba(34, 211, 238, 0.4)",
                "0 10px 30px rgba(34, 211, 238, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            River County Painter
          </motion.h1>
          <p
            style={{
              color: "#999",
              fontSize: "14px",
              margin: 0,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Loading Experience
          </p>
        </motion.div>

        {/* Progress bar container */}
        <motion.div
          variants={itemVariants}
          style={{
            width: "100%",
            height: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "40px",
            border: "1px solid rgba(34, 211, 238, 0.2)",
          }}
        >
          {/* Progress fill */}
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #22d3ee 0%, #0891b2 100%)",
              width: `${displayProgress}%`,
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
            }}
            transition={{ ease: "linear" }}
          />
        </motion.div>

        {/* Percentage text */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <span
            style={{
              color: "#666",
              fontSize: "12px",
            }}
          >
            {loadingText}
          </span>
          <span
            style={{
              color: "#22d3ee",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {Math.round(displayProgress)}%
          </span>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#22d3ee",
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Tip text */}
        <motion.p
          variants={itemVariants}
          style={{
            marginTop: "40px",
            color: "#555",
            fontSize: "12px",
            maxWidth: "100%",
            lineHeight: "1.6",
          }}
        >
          Preparing your interactive 3D experience
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
