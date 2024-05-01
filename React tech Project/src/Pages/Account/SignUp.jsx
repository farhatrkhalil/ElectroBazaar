import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import SignUpComponent from "../../Components/Account/signUp";

function SignUp({ user, handleSignOut }) {
  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut} />
      <SignUpComponent />

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
export default SignUp;
