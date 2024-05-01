/* eslint-disable react/no-unescaped-entities */
import "./TermsOfUse.css";

function TermsOfUse() {
  return (
    <div>
      <div className="left-image-container">
        <img src="/assets/Imgs/PrivacyPolicy/squares.png" alt="Left Image" />
        <br />
        <br />
        <img src="/assets/Imgs/PrivacyPolicy/squares.png" alt="Left Image" />
      </div>
      <div className="left-image-container2">
        <img src="/assets/Imgs/PrivacyPolicy/squares.png" alt="Left Image" />
        <img src="/assets/Imgs/PrivacyPolicy/squares.png" alt="Left Image" />
      </div>
      <div className="card-container">
        <div className="PrivacyBanner">
          <div className="privacy_title_container">
            <h1>
              <b>ElectroBazaar</b>
              <br />
              <br />
              <i>
                <u>
                  <b>Terms Of Use</b>
                </u>
              </i>
              <br />
              <br />
              <h6>
                Navigate responsibly with our <b>Terms Of Use</b>.
              </h6>
            </h1>
          </div>
          <div className="privacy_image_container">
            <img src="/assets/Imgs/TermsOfUse/termsOfUse.png" alt="" />
          </div>
        </div>
        <br />
        <div>
          <b>Legal Information</b>
          <br />
          <br />
          Welcome to <b>ElectroBazaar</b>! These <u>Terms of Use</u> outline
          your use of our platform. By accessing or using ElectroBazaar, you
          agree to comply with these terms. If you disagree, please refrain from
          using our website.
          <br />
          <br />
          <u>1. Account Registration:</u>
          <br />
          When registering an account, you agree to provide accurate and
          complete information. You are responsible for maintaining the
          confidentiality of your account credentials.
          <br />
          <br />
          <u>2. User Conduct:</u>
          <br />
          <b>2.1. Prohibited Activities:</b> You agree not to engage in
          activities that violate any laws, infringe on others' rights, or
          disrupt the functionality of ElectroBazaar.
          <br />
          <b>2.2. Content Submission:</b> By submitting content, you grant
          ElectroBazaar the right to use, modify, and distribute it. You are
          responsible for the content you submit.
          <br />
          <br />
          <u>3. Intellectual Property:</u>
          <br />
          <b>3.1. Trademarks:</b> ElectroBazaar's trademarks and logos are
          proprietary. Unauthorized use is strictly prohibited.
          <br />
          <b>3.2. Copyright:</b> All content on ElectroBazaar is protected by
          copyright. Reproduction without permission is prohibited.
          <br />
          <br />
          <u>4. Termination:</u>
          <br />
          ElectroBazaar reserves the right to terminate or suspend your account
          if you violate these Terms of Use. You may terminate your account at
          any time.
          <br />
          <br />
          <u>5. Governing Law:</u>
          <br />
          These Terms of Use are subject to Lebanese law. Disputes shall be
          resolved through arbitration.
          <br />
          <br />
          <u>6. Contact Us:</u>
          <br />
          If you have questions or concerns about these <u>Terms of Use</u>,
          please contact us at:
          <br />
          <br />
          <b>ElectroBazaar</b>
          <br />
          <b>Location:</b> 12 Main Street, Beirut, Lebanon
          <br />
          <b>Email:</b>{" "}
          <a href="mailto:support@electrobazaar.com">
            support@electrobazaar.com
          </a>
          <br />
          <b>Phone:</b> (+961) 1 234 567
          <br />
          <br />
          Thank you for using <b>ElectroBazaar</b>!
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;
