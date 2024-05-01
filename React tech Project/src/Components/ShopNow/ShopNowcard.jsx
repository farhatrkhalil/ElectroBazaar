/* eslint-disable react/prop-types */
import "./ShopNowCard.css";

function ShopNowCard({ img, title, description, link }) {
  return (
    <div id="ShopNowcard" style={{ backgroundImage: `url(${img})` }}>
      <span></span>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link}>Shop Now</a>
      </div>
    </div>
  );
}

export default ShopNowCard;
