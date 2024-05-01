import "./About.css";

function About() {
  return (
    <div>
      <div className="about-container">
        <div className="text-container">
          <h2>Our Story</h2>
          <br />
          <p>
            Launched in 2018, Exclusive to Middle East marketplace with an
            active presence in Lebanon. Supported by wide range of tailored
            products. ElectroBazaar has 10,500 sellers and 300 brands and serves
            3 million customers across the region.
          </p>
          <br />
          <p>
            ElectroBazaar has more than 1 Million products to offer, growing at
            a very fast rate. We are constantly working to expand our product
            base to offer a wider range of products to our customers.
          </p>
        </div>
        <div className="about-image-container">
          <img src="/assets/Imgs/About/about.jpeg" alt="" />
        </div>
      </div>
      <div className="statistics-container">
        <div>
          <img src="/assets/Imgs/logos/Sellers.png" alt="" />
          <h2>10.5k</h2>
          <p>Sellers active on our site</p>
        </div>
        <div className="sales">
          <img src="/assets/Imgs/logos/Sales.png" alt="" />
          <h2>33k</h2>
          <p>Monthly Product Sale</p>
        </div>
        <div>
          <img src="/assets/Imgs/logos/Customers.png" alt="" />
          <h2>45.5k</h2>
          <p>Customer active in our site</p>
        </div>
        <div>
          <img src="/assets/Imgs/logos/grossSales.png" alt="" />
          <h2>25k</h2>
          <p>Annual gross sale in our site</p>
        </div>
      </div>
    </div>
  );
}

export default About;
