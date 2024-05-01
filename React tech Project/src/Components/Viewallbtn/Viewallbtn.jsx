import { useNavigate } from "react-router-dom";
import "./Viewallbtn.css";

function Viewallbtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cat?name=All products");
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <div id="Viewallbtn">
      <button onClick={handleClick}>View All Products</button>
    </div>
  );
}

export default Viewallbtn;
