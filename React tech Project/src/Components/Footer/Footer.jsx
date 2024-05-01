/* eslint-disable react/prop-types */
import "./Footer.css";
import Line from "../Line";
import Copyright from "./Copyright";
import footerData from "./footerData";
import FooterComp1 from "./FooterComp1";

function Footer(props) {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <div className="Footer-root">
        <div className="Footer-section">
          <p className="Footer-head">Exclusive</p>
          <div>
            <p>Subscribe</p>
            <p style={{ fontWeight: "200" }}>Get 10% off your first order</p>
            <form action="" method="Post">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.91199 11.9998H3.99999L2.02299 4.1348C2.01033 4.0891 2.00262 4.04216 1.99999 3.9948C1.97799 3.2738 2.77199 2.7738 3.45999 3.1038L22 11.9998L3.45999 20.8958C2.77999 21.2228 1.99599 20.7368 1.99999 20.0288C2.00201 19.9655 2.01313 19.9029 2.03299 19.8428L3.49999 14.9998"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className="emailInput"
                type="text"
                placeholder="Enter Your Email"
                name="email"
              />
            </form>
          </div>
        </div>
        <div className="Footer-section">
          <p className="Footer-head">Support</p>
          <div>
            <p>12 Main Street, Beirut, Lebanon.</p>
            <a
              href="mailto:support@electrobazaar.com"
              onClick={() =>
                alert("Clicking this link will open your email client.")
              }
            >
              support@electrobazaar.com
            </a>
            <p>(+961) 1 234 567</p>
          </div>
        </div>
        {footerData.map((item) => (
          <FooterComp1 key={item.head} head={item.head} footerNav={item.data} />
        ))}

        <div className="Footer-section" id="Footer-Social">
          <p className="Footer-head">Download App</p>
          <div className="App-link">
            <img
              src="/assets/Imgs/SocialMedia/QRcode.png"
              alt=""
              style={{ height: "auto", width: "100px", borderRadius: "6px" }}
            />
            <div>
              <a href={props.appstore}>
                <img
                  className="Footer-store"
                  src="/assets/Imgs/SocialMedia/AppStore.png"
                  alt=""
                />
              </a>
              <a href={props.googlestore}>
                <img
                  className="Footer-store"
                  src={"/assets/Imgs/SocialMedia/GoogleStore.png"}
                  alt=""
                />
              </a>
            </div>
          </div>

          <div className="Social-Media">
            <a href={props.facebook}>
              <img src="/assets/Imgs/SocialMedia/facebook.png" alt="" />
            </a>
            <a href={props.instagram}>
              <img src="/assets/Imgs/SocialMedia/instagram.png" alt="" />
            </a>
            <a href={props.twitter}>
              <img src="/assets/Imgs/SocialMedia/twitter.png" alt="" />
            </a>
            <a href={props.tiktok}>
              <img
                src="/assets/Imgs/SocialMedia/Tiktok.png"
                alt=""
                style={{ width: "26px" }}
              />
            </a>
          </div>
        </div>
      </div>
      <Line />

      <Copyright name="Abdallah Hijazi-Khalil Farhat" year={currentYear} />
    </div>
  );
}

export default Footer;
