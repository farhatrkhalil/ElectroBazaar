import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import ManageMyAccountContent from "../../Components/Account/ManageMyAccount";

function ManageMyAccount({user,handleSignOut}) {
  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut}/>
      <ScrollToTopButton />
      <ManageMyAccountContent user={user}/>
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
export default ManageMyAccount;
