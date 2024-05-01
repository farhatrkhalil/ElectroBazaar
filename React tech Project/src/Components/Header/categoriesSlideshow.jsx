import React, { useState, useEffect } from "react";
import "./TopHeader.css";
import { Link } from "react-router-dom";

const categoriesData = [
  {
    name: "Mobiles",
    images: [
      "https://www.iconpacks.net/icons/1/free-smartphone-icon-695-thumb.png",
    ],
  },
  {
    name: "Laptops",
    images: [
      "https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-laptop-icon-png-image_6606927.png",
    ],
  },
  {
    name: "Tablets",
    images: [
      "https://www.iconpacks.net/icons/1/free-tablet-icon-698-thumb.png",
    ],
  },
  {
    name: "Consoles",
    images: ["https://cdn-icons-png.freepik.com/512/7708/7708371.png"],
  },
  {
    name: "Cameras",
    images: ["https://cdn-icons-png.flaticon.com/512/2956/2956744.png"],
  },
  {
    name: "Televisions",
    images: ["https://cdn-icons-png.flaticon.com/512/3139/3139766.png"],
  },
  {
    name: "Accessories",
    images: ["https://cdn-icons-png.flaticon.com/512/3566/3566427.png"],
  },
];

const slideshowData = [
  {
    title: "Accessories",
    image: "/assets/Imgs/HeaderSlideshowImgs/accessories.jpeg",
  },
  {
    title: "Televisions",
    image: "/assets/Imgs/HeaderSlideshowImgs/television.jpeg",
  },
  {
    title: "Mobiles",
    image: "/assets/Imgs/HeaderSlideshowImgs/mobilesBanner.avif",
  },
  {
    title: "Laptops",
    image: "/assets/Imgs/HeaderSlideshowImgs/laptopsBanner.jpeg",
  },
  {
    title: "Tablets",
    image: "/assets/Imgs/HeaderSlideshowImgs/tablets.png",
  },
  {
    title: "Consoles",
    image: "/assets/Imgs/HeaderSlideshowImgs/consolesBanner.png",
  },
  {
    title: "Cameras",
    image: "/assets/Imgs/HeaderSlideshowImgs/cameraBanner.jpeg",
  },
];

function CategoriesSlideshow() {
  const [slideIndex, setSlideIndex] = useState(
    slideshowData.findIndex((category) => category.title === "Mobiles")
  );
  const slides = document.getElementsByClassName("mySlides");

  const showSlides = () => {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex > slides.length) {
        newIndex = 1;
      }
      slides[newIndex - 1].style.display = "block";
      return newIndex;
    });
  };

  const plusSlides = (n) => {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex > slides.length) {
        newIndex = 1;
      } else if (newIndex < 1) {
        newIndex = slides.length;
      }
      slides[newIndex - 1].style.display = "block";
      return newIndex;
    });
  };

  useEffect(() => {
    showSlides();

    const timer = setInterval(() => {
      showSlides();
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="categories-slideshow-container">
        <div className="categories">
          {categoriesData.map((category, index) => (
            <div key={index} className="category-item">
              <Link
                to={`/cat?name=${category.name}`}
                style={{ overflow: "visible", flex: "1" }}
                onClick={scrollToTop}
              >
                {category.name}
              </Link>
              <div className="category-images">
                {category.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${category.name} Image ${imgIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slideshow-container">
          {slideshowData.map((category, index) => (
            <Link
              to={`/cat?name=${category.title}`}
              key={index}
              className={`mySlides fade ${slideIndex === index ? "show" : ""}`}
              onClick={scrollToTop}
              style={{backgroundImage: `url(${category.image})`}}
            >
            </Link>
          ))}
          <a className="prev" onClick={() => plusSlides(-1)}>
            ❮
          </a>
          <a className="next" onClick={() => plusSlides(1)}>
            ❯
          </a>
        </div>
      </div>
    </>
  );
}

export default CategoriesSlideshow;
