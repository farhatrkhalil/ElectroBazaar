import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import TermsOfUseContent from "../../Components/TermsOfUse/TermsOfUse";

function TermsOfUse({user,handleSignOut}) {
  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut}/>
      <TermsOfUseContent />
      <ScrollToTopButton />

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
export default TermsOfUse;
