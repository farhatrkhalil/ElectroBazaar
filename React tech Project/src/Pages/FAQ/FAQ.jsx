import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import FaqContent from "../../Components/FAQ/FAQ";

function Faq({user,handleSignOut}) {
  return (
    <div>
      <Header  user={user} handleSignOut={handleSignOut}/>
      <ScrollToTopButton />
      <FaqContent />

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
export default Faq;
