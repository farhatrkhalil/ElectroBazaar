import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import ListSection from "../../Components/LandPageSections/ListSection";
import Brand from "../../Components/BrandSection/Brand";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";
import FeatureList from "../../Components/FeatureList/FeatureList";
import ShopNowList from "../../Components/ShopNow/ShopNowList";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import Checkout from "../../Components/Checkout/Checkout";
import CategoriesSlideshow from "../../Components/Header/categoriesSlideshow";
import "./Home.css";

const HomeContent = ({ user, updateCounter }) => {
  return (
    <div>
      <div className="paddingforsections">
        <ListSection
          sectiontitle="Todays"
          About="Flash Sale"
          discount={true}
          showArrow
          sale={true}
          user={user}
          updateCounter={updateCounter}
        />
        <Brand showArrow />
        <ListSection
          sectiontitle="This Month"
          About="Best Selling Products"
          discount={false}
          showArrow
          viewallbtn
          bestseller={true}
          user={user}
          updateCounter={updateCounter}
        />
        <ShopNowList />
      </div>
    </div>
  );
};

const Home = ({ user, handleSignOut }) => {
  const navigate = useNavigate();
  const [updatecounter, setUpdateCounter] = useState(false);

  const updateCounter = () => {
    setUpdateCounter(!updatecounter);
  };

  useEffect(() => {
    navigate("/Home", { replace: true });
    history.scrollRestoration = "manual";
  }, [navigate]);

  console.log("User in Home:", user);

  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut} updatecounter={updatecounter} />
      <CategoriesSlideshow />
      <Routes>
        <Route path="/Home" element={<HomeContent user={user} updateCounter={updateCounter} />} />
        <Route
          path="/ViewDetails"
          element={
            <div className="paddingforsections">
              <ProductDetails user={user} />
            </div>
          }
        />
        <Route
          path="/Checkpoint"
          element={
            <div className="paddingforsections">
              <Checkout user={user} />
            </div>
          }
        />
      </Routes>

      <FeatureList />
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
};

export default Home;
