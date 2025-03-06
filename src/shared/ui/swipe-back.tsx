import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SwipeBack = () => {
  const navigate = useNavigate();
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setTouchEndX(e.changedTouches[0].clientX);

      // Check if the swipe is from left to right
      if (touchStartX - touchEndX > 50) {
        console.log("Swipe Right → Left (Ignored)");
      } else if (touchEndX - touchStartX > 50) {
        console.log("Swipe Left → Right (Go Back)");
        navigate(-1); // Go back
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartX, touchEndX, navigate]);

  return null;
};

export default SwipeBack;
