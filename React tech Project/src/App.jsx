import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Account/SignUp";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import ViewDetailsPage from "./Pages/ViewDetails/ViewDetailsPage";
import Myprofile from "./Pages/Account/Myprofile";
import ContactUsPage from "./Pages/ContactUs/ContactUsPage";
import ProductListPage from "./Pages/ProductList/ProductListPage";
import Login from "./Pages/Account/Login";
import About from "./Pages/About/About";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./Pages/TermsOfUse/TermsOfUse";
import FAQ from "./Pages/FAQ/FAQ";
import ManageMyAccount from "./Pages/ManageMyAccount/ManageMyAccount";
import "./App.css";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Routes>
      <Route path="*" element={<Home user={user} handleSignOut={handleSignOut} />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Checkout" element={<CheckoutPage user={user} handleSignOut={handleSignOut} />} />
      <Route path="/product" element={<ViewDetailsPage user={user} handleSignOut={handleSignOut} />} />
      <Route path="/MyAccount" element={<Myprofile user={user} handleSignOut={handleSignOut} />}  />
      <Route path="/ContactUs" element={<ContactUsPage user={user} handleSignOut={handleSignOut} />} />
      <Route path="/cat" element={<ProductListPage user={user} handleSignOut={handleSignOut} />} />
      <Route path="/brand" element={<ProductListPage user={user} handleSignOut={handleSignOut} />} />
      <Route path="/search" element={<ProductListPage user={user} handleSignOut={handleSignOut} />} />
      <Route path="/AboutUs" element={<About user={user} handleSignOut={handleSignOut} />} />
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy user={user} handleSignOut={handleSignOut} />} />
      <Route path="/TermsOfUse" element={<TermsOfUse user={user} handleSignOut={handleSignOut} />} />
      <Route path="/FAQ" element={<FAQ user={user} handleSignOut={handleSignOut} />} />
      <Route
        path="/ManageMyAccount"
        element={<ManageMyAccount user={user} handleSignOut={handleSignOut}/>}
      />
    </Routes>
  );

}

export default App;
