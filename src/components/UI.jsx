import { motion } from "framer-motion";

export const UI = ({ currentScreen, onScreenChange }) => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
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
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {/* Start Screen */}
      <motion.section
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "40px",
          pointerEvents: currentScreen === "Start" ? "auto" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={currentScreen === "Start" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{ textAlign: "right" }}
          variants={containerVariants}
          initial="hidden"
          animate={currentScreen === "Start" ? "visible" : "hidden"}
        >
          <motion.h1
            style={{
              fontSize: "56px",
              color: "#22d3ee",
              fontWeight: "900",
              marginBottom: "20px",
              textShadow: "0 20px 25px rgba(0,0,0,0.5)",
            }}
            variants={itemVariants}
          >
            River County
            <br />
            Painter
          </motion.h1>

          <motion.div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
            }}
            variants={containerVariants}
          >
            <motion.button
              onClick={() => onScreenChange("Middle")}
              style={{
                padding: "16px 32px",
                borderRadius: "9999px",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                backgroundColor: "#2563eb",
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read About Us
            </motion.button>

            <motion.button
              onClick={() => onScreenChange("End")}
              style={{
                padding: "16px 32px",
                borderRadius: "9999px",
                border: "1px solid rgba(34, 211, 238, 0.3)",
                backgroundColor: "#0891b2",
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Why Use Dave's
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Middle Screen - About Us */}
      <motion.section
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "40px",
          pointerEvents: currentScreen === "Middle" ? "auto" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={currentScreen === "Middle" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{ maxWidth: "700px" }}
          variants={containerVariants}
          initial="hidden"
          animate={currentScreen === "Middle" ? "visible" : "hidden"}
        >
          <motion.h1
            style={{
              fontSize: "56px",
              color: "white",
              fontWeight: "900",
              marginBottom: "20px",
              opacity: 0.9,
            }}
            variants={itemVariants}
          >
            About Us
          </motion.h1>

          <motion.p
            style={{
              color: "white",
              fontSize: "18px",
              lineHeight: "1.5",
              marginBottom: "30px",
            }}
            variants={itemVariants}
          >
            River County Painter has been serving the community with
            professional painting services for over a decade. Our experienced
            team delivers quality workmanship with attention to detail.
          </motion.p>

          <motion.button
            onClick={() => onScreenChange("Start")}
            style={{
              padding: "12px 24px",
              borderRadius: "9999px",
              border: "1px solid rgba(107, 114, 128, 0.3)",
              backgroundColor: "#4b5563",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to entrance
          </motion.button>
        </motion.div>
      </motion.section>

      {/* End Screen - Why Use Dave's */}
      <motion.section
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "40px",
          pointerEvents: currentScreen === "End" ? "auto" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={currentScreen === "End" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{ maxWidth: "700px", textAlign: "right" }}
          variants={containerVariants}
          initial="hidden"
          animate={currentScreen === "End" ? "visible" : "hidden"}
        >
          <motion.h1
            style={{
              fontSize: "56px",
              color: "white",
              fontWeight: "900",
              marginBottom: "20px",
              opacity: 0.9,
            }}
            variants={itemVariants}
          >
            Why Use Dave's
          </motion.h1>

          <motion.div style={{ marginBottom: "30px" }}>
            {[
              "Professional quality workmanship",
              "Licensed and fully insured",
              "Free estimates and consultations",
              "Satisfaction guaranteed",
            ].map((item, i) => (
              <motion.div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "white",
                  fontSize: "18px",
                  marginBottom: "12px",
                  justifyContent: "flex-end",
                }}
                variants={itemVariants}
              >
                <span>{item}</span>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#22d3ee",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            onClick={() => onScreenChange("Start")}
            style={{
              padding: "12px 24px",
              borderRadius: "9999px",
              border: "1px solid rgba(107, 114, 128, 0.3)",
              backgroundColor: "#4b5563",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: "auto",
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to entrance
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};
