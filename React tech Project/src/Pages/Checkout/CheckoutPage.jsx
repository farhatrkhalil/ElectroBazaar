import Checkout from "../../Components/Checkout/Checkout";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import FeatureList from "../../Components/FeatureList/FeatureList";

function CheckoutPage({user,handleSignOut})
{
    return(
        <div>
     <Header user={user} handleSignOut={handleSignOut}/>
    <div className="padding-container">
     <Checkout user={user}/>
     <FeatureList/>
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

    )
}
export default CheckoutPage