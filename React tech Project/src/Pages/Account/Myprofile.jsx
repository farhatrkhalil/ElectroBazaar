import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/header";
import EditProfile from "../../Components/EditProfile/EditProfile";

function Myprofile ({ user, handleSignOut })
{

return(
<div>

<Header user={user} handleSignOut={handleSignOut}/>
<div className="padding-container">
<EditProfile/>
</div>
<Footer/>
</div>)

}

export default Myprofile