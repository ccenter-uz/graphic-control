import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SwipeHandlerProps {
  children: ReactNode;
}

const THRESHOLD = 70; // Minimum swipe distance
const SWIPEABLE_AREA = window.innerWidth / 3; // Swipeable area

const SwipeHandler = ({ children }: SwipeHandlerProps) => {
  const [startX, setStartX] = useState(0);
  const [swipeX, setSwipeX] = useState<number | null>(null); // Store current swipe position
  const [showIndicator, setShowIndicator] = useState(false); // Show/hide circle
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      setStartX(event.touches[0].clientX);
      setSwipeX(event.touches[0].clientX); // Initial position
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (pathname !== "/") {
        if (event.touches[0].clientX < SWIPEABLE_AREA) {
          setSwipeX(event.touches[0].clientX); // Update swipe position
          if (event.touches[0].clientX > THRESHOLD) {
            setShowIndicator(true); // Show the circle
          }
        }
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0].clientX;
      const swipeDistance = endX - startX;
      setShowIndicator(false); // Hide indicator after swipe

      if (startX < SWIPEABLE_AREA) {
        if (swipeDistance > THRESHOLD) {
          if (pathname !== "/") {
            navigate(-1); // Go back on left swipe
          }
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startX, navigate, pathname]);

  return (
    <>
      {/* Animated swipe indicator */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: 1,
              x: swipeX ? swipeX - 50 : 0, // Move based on swipe position
            }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "20px",
              width: "50px",
              height: "50px",
              backgroundColor: "rgba(240 247 254 / 0.8)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgb(0 122 255)",
              color: "rgb(0 122 255)",
              fontSize: "24px",
              zIndex: 1000,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
};

export default SwipeHandler;
