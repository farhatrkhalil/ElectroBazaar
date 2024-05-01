import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import FeatureList from "../../Components/FeatureList/FeatureList";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import "../../Components/ScrollToTopButton/ScrollToTopButton.css";
import { useState } from "react";

function ViewDetailsPage({user,handleSignOut}) {

  const [updatecounter, setUpdateCounter] = useState(false);

  const updateCounter = () => {
    setUpdateCounter(!updatecounter);
  };
  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut} updatecounter={updatecounter}/>
      <div className="padding-container">
        <ScrollToTopButton />
        <ProductDetails user={user} updateCounter={updateCounter}/>
        <FeatureList updateCounter={updateCounter}/>
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
export default ViewDetailsPage;
