import { useState, useLayoutEffect, type RefObject } from "react";

const useScrollPosition = (ref: RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const updatePosition = () => {
      const element = ref.current!;
      setScrollPosition(element.scrollTop);
    };

    const element = ref.current;
    element.addEventListener("scroll", updatePosition);
    // Initial position
    updatePosition();

    // Handle window resize as it might affect scroll dimensions
    window.addEventListener("resize", updatePosition);

    return () => {
      element.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [ref]); // Only re-run if ref changes

  return scrollPosition;
};

export default useScrollPosition;
