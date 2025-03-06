import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SwipeBack = () => {
  const navigate = useNavigate();
  const [touchStartX, setTouchStartX] = useState(0);
  // const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // setTouchEndX(e.changedTouches[0].clientX);

      // Check if the swipe is from left to right
      console.log("touchStartX", touchStartX);
      console.log("touchEndX", e.changedTouches[0].clientX);

      if (touchStartX - e.changedTouches[0].clientX > 50) {
        console.log("Swipe Right → Left (Ignored)");
      } else if (e.changedTouches[0].clientX - touchStartX > 50) {
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
  }, [touchStartX]);

  return null;
};

export default SwipeBack;
