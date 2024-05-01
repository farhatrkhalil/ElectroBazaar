
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import FeatureList from "../../Components/FeatureList/FeatureList";
import ProductList from "../../Components/ProductList/ProductList";
import { useLocation} from 'react-router-dom';
import { useState } from "react";


function ProductListPage({user,handleSignOut})
{

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get('name');
  const brand= queryParams.get("b");
  const search =queryParams.get("s");

  const [updatecounter, setUpdateCounter] = useState(false);

  const updateCounter = () => {
    setUpdateCounter(!updatecounter);
  };
  
    return(
        <div>
     <Header user={user} handleSignOut={handleSignOut} updatecounter={updatecounter}/>
    <div className="padding-container">
      <h2 style={{margin:"20px 30px"}}>{cat!== null ? cat: brand!==null ? brand +" Products" :'Search For "'+search+'"'}</h2>
      
     <ProductList user={user}  updateCounter={updateCounter}/>
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
export default ProductListPage