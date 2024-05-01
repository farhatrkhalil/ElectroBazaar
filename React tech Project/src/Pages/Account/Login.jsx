import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import LoginComponent from "../../Components/Account/Login";

function Login({ user, handleSignOut }) {
  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut}/>
      <LoginComponent />

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
export default Login;
