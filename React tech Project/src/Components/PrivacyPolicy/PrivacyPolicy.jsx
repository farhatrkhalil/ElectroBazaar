import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();

  return (
    <div id="privacy">
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
              <i>
                <br />
                <u>
                  <b>Privacy Policy</b>
                </u>
                <br />
              </i>
              <br />
            </h1>
            <br />
            <u>
              <h2>We Value Your Privacy</h2>
            </u>
          </div>
          <div className="privacy_image_container">
            <img src="/assets/Imgs/PrivacyPolicy/amico.png" alt="" />
          </div>
        </div>
        <br />
        <div>
          <h2>Legal Information</h2>
          <br />
          Last updated: {formatDate(currentDate)}
          <br />
          Effective Date: {formatDate(currentDate)}
          <br />
          <br />
          Welcome to <b>ElectroBazaar</b>! This <b>Privacy Policy</b> outlines
          the types of personal information we collect, how it is used, and the
          choices you have regarding your data. Please read this{" "}
          <b>Privacy Policy</b> carefully to understand our practices.
          <br />
          <br />
          <u>1. Information We Collect:</u>
          <br />
          <br />
          <u>1.1. Personal Information:</u>
          <br />
          When you register an account or make a purchase, we may collect
          personal information such as your name, email address, shipping
          address, and phone number.
          <br />
          <u>1.2. Transaction Information:</u>
          <br />
          We collect information about your transactions on our platform,
          including the products you purchase, payment details, and delivery
          information.
          <br />
          <u>1.3. Website Usage Information:</u>
          <br />
          We gather data about how you navigate and interact with our website,
          including your IP address, browser type, and device information.
          <br />
          <br />
          <u>2. How We Use Your Information:</u>
          <br />
          <br />
          <u>2.1. Order Processing:</u>
          <br />
          We use your personal information to process orders, provide customer
          support, and ensure the smooth delivery of products.
          <br />
          <u>2.2. Improving Our Services:</u>
          <br />
          Analyzing website usage information helps us enhance our platform,
          optimize user experience, and tailor our product offerings.
          <br />
          <u>2.3. Marketing and Communication:</u>
          <br />
          With your consent, we may send promotional emails or newsletters. You
          can opt-out at any time.
          <br />
          <br />
          <u>3. Sharing Your Information:</u>
          <br />
          <br />
          <u>3.1. Third-Party Service Providers:</u>
          <br />
          We may share your information with trusted third-party service
          providers to fulfill orders, process payments, and improve our
          services.
          <br />
          <u>3.2. Legal Compliance:</u>
          <br />
          We may disclose your information to comply with applicable laws or
          respond to legal requests.
          <br />
          <br />
          <u>4. Your Choices:</u>
          <br />
          <br />
          <u>4.1. Account Information:</u>
          <br />
          You can review and update your account information at any time by
          logging in.
          <br />
          <u>4.2. Marketing Communications:</u>
          <br />
          You can opt-out of marketing communications by following the
          unsubscribe instructions in the emails we send.
          <br />
          <br />
          <u>5. Security:</u>
          <br />
          <br />
          We prioritize the security of your information. We employ
          industry-standard measures to protect against unauthorized access,
          disclosure, or alteration.
          <br />
          <br />
          <u>6. Changes to this Privacy Policy:</u>
          <br />
          <br />
          We may update this <b>Privacy Policy</b> periodically. It is your
          responsibility to check for any changes. Significant updates will be
          communicated through our website or other means.
          <br />
          <br />
          <u>7. Contact Us:</u>
          <br />
          <br />
          If you have questions or concerns about this <b>Privacy Policy</b>,
          please contact us at:
          <br />
          <br />
          <u>
            <b>ElectroBazaar</b>
          </u>
          <br />
          <b>Location:</b> 12 Main Street, Beirut, Lebanon
          <br />
          <b>Email:</b>
          {" support@electrobazaar.com"}
          <a href="mailto:support@electrobazaar.com">
            support@electrobazaar.com
          </a>
          <br />
          <b>Phone:</b> (+961) 1 234 567
          <br />
          <br />
          Thank you for choosing <b>ElectroBazaar</b>!
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
