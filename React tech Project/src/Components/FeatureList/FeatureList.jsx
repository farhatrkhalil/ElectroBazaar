/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./FeatureList.css";

function FeatureList() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const paymentMethods = [
    "/assets/Imgs/paymentMethods/stripe.png",
    "/assets/Imgs/paymentMethods/visa.png",
    "/assets/Imgs/paymentMethods/mastercard.png",
    "/assets/Imgs/paymentMethods/paypal.png",
    "/assets/Imgs/paymentMethods/applePay.png",
    "/assets/Imgs/paymentMethods/americanExpress.png",
    "/assets/Imgs/paymentMethods/discover.png",
  ];

  const features = [
    {
      imageSrc: "/assets/Imgs/Features/delivery.png",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      imageSrc: "/assets/Imgs/Features/customerService.png",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      imageSrc: "/assets/Imgs/Features/moneyBack.png",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? features.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div id="FeatureList-root" className="carousel-container">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`Feature ${index === currentSlide ? "show" : ""}`}
          >
            <img src={feature.imageSrc} alt="" />
            <div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <h4 className="transactionSlogan">
        Empower Your Transactions, Seamless Choices with Every Click!
      </h4>
      <div className="paymentMethodsSlideshow">
        {paymentMethods.map((method, index) => (
          <img
            key={index}
            src={method}
            alt=""
            className={`slide ${index === currentSlide ? "show" : ""}`}
          />
        ))}
      </div>
    
    </div>
  );
}

export default FeatureList;
