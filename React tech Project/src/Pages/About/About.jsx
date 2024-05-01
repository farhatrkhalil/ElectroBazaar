import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import FeatureList from "../../Components/FeatureList/FeatureList";
import AboutContent from "../../Components/About/About";

function About({user,handleSignOut}) {
  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut}/>
      <AboutContent />
      <ScrollToTopButton />
      <FeatureList />

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
export default About;
