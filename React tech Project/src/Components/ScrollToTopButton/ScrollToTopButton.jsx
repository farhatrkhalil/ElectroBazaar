import { useState, useEffect } from "react";
import "./ScrollToTopButton.css";
import upArrowIcon from "/assets/Imgs/ScrollToTopButton/up-arrow-icon.png"; 

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    setIsVisible(scrolled > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <img
        src={upArrowIcon}
        alt="Scroll to Top"
        className="scroll-to-top-icon"
      />
    </button>
  );
};

export default ScrollToTopButton;
