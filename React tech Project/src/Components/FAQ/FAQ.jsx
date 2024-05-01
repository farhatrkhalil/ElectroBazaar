import FaPlusImage from "/assets/Imgs/FAQ/FaPlus.png";
import FaMinusImage from "/assets/Imgs/FAQ/FaMinus.png";
import { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "What products does ElectroBazaar offer?",
    answer:
      "ElectroBazaar is your go-to tech gadget store, offering a wide range of cutting-edge products. From smartphones and laptops to smart home devices and accessories, we've got your tech needs covered.",
  },
  {
    question: "How can I create an account on ElectroBazaar?",
    answer:
      "To create an account on ElectroBazaar, simply visit our website and follow the registration process. Provide accurate details to ensure a seamless experience. Your account information is kept secure.",
  },
  {
    question: "Are there any restrictions on user activities?",
    answer:
      "Yes, ElectroBazaar prohibits activities that violate laws, infringe on others' rights, or disrupt the platform's functionality. Users are expected to engage in responsible and ethical conduct.",
  },
  {
    question: "How is my personal information handled?",
    answer:
      "When you register or make a purchase, we collect essential personal information for order processing and customer support. Rest assured, your data is handled with care and used solely for these purposes.",
  },
  {
    question: "What tech brands are available on ElectroBazaar?",
    answer:
      "ElectroBazaar features a curated selection of top tech brands. Explore products from renowned brands in smartphones, laptops, audio devices, and more. We strive to bring you the latest and best in tech innovation.",
  },
  {
    question: "What should I do if I encounter issues with my order?",
    answer:
      "If you experience any issues with your order or have questions about our products, our customer support team is here to help. Reach out to us using the provided contact details, and we'll assist you promptly.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq">
      <h1>FAQ (Frequently Asked Questions)</h1>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              <span className="question-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="question-text">{item.question}</span>
              <span className="icon">
                {openIndex === index ? (
                  <img
                    className="MinusIcon"
                    src={FaMinusImage}
                    alt="Minus Icon"
                  />
                ) : (
                  <img src={FaPlusImage} alt="Plus Icon" />
                )}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
