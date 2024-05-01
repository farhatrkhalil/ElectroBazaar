import { useState } from "react";
import { db, collection, addDoc } from "../../firebase";
import Line from "../Line";
import "./Contact.css";

const imgurl = "assets/Imgs/";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactMessagesRef = collection(db, "messages");
      const messageData = {
        formData,
        date: Date.now(),
      };
      await addDoc(contactMessagesRef, messageData);

      alert("Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        message: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div id="Contact-container">
      <div className="ContactInfo">
        <div className="Contact-info">
          <div>
            <img src={imgurl + "logos/phoneicon.png"} alt="" />
            <h4>Call Us</h4>
          </div>
          <p>We are available 24/7.</p>
          <p>
            <b>Phone:</b> (+961) 1 234 567
          </p>
        </div>
        <Line />
        <div className="Contact-info">
          <div>
            <img src={imgurl + "logos/emailicon.png"} alt="" />
            <h4>Email Us</h4>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>
            <b>Email:</b>
            <span style={{ cursor: "pointer" }}>
              &nbsp;
              <a
                href="mailto:support@electrobazaar.com"
                onClick={(e) => {
                  e.preventDefault(); 
                  alert("Clicking this link will open your email client.");
                }}
                style={{ textDecoration: "underline", color: "inherit" }}
              >
                support@electrobazaar.com
              </a>
            </span>
          </p>
        </div>
      </div>

      <div className="SendMessage">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="message-input"
        ></textarea>
        <button onClick={handleSubmit}>Send Message</button>
      </div>
    </div>
  );
}

export default Contact;
