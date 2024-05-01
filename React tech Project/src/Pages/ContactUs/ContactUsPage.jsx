import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import FeatureList from "../../Components/FeatureList/FeatureList";
import Contact from "../../Components/Contact/Contact";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";

function ContactUsPage({user,handleSignOut}) {
  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut}/>
      <div className="padding-container">
        <ScrollToTopButton />
        <Contact />
        <FeatureList />
      </div>
      <Footer
        facebook=""
        instagram=""
        tiktok=""
        twitter=""
        googlestore=""
        appstore=""
      />
    </div>
  );
}

export default ContactUsPage;
