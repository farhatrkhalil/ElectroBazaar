import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import PrivacyPolicyComponent from "../../Components/PrivacyPolicy/PrivacyPolicy";

function PrivacyPolicy({user,handleSignOut}) {
  return (
    <div>
      <Header  user={user} handleSignOut={handleSignOut}/>
        <ScrollToTopButton />
        <PrivacyPolicyComponent />

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
export default PrivacyPolicy;
