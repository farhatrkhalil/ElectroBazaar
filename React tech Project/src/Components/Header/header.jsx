/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./TopHeader.css";
import Line from '../Line';
import { Link, useNavigate } from "react-router-dom";
import Mycart from "../MyCart/Mycart";
import guestLogo from "/assets/Imgs/HeaderImages/guest.png";
import { db, collection, where, query, getDocs } from "../../firebase";

const categoriesData = [
  {
    name: "Mobiles",
    images: [
      "https://www.iconpacks.net/icons/1/free-smartphone-icon-695-thumb.png",
    ],
  },
  {
    name: "Laptops",
    images: [
      "https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-laptop-icon-png-image_6606927.png",
    ],
  },
  {
    name: "Tablets",
    images: [
      "https://www.iconpacks.net/icons/1/free-tablet-icon-698-thumb.png",
    ],
  },
  {
    name: "Consoles",
    images: ["https://cdn-icons-png.freepik.com/512/7708/7708371.png"],
  },
  {
    name: "Cameras",
    images: ["https://cdn-icons-png.flaticon.com/512/2956/2956744.png"],
  },
  {
    name: "Televisions",
    images: ["https://cdn-icons-png.flaticon.com/512/3139/3139766.png"],
  },
  {
    name: "Accessories",
    images: ["https://cdn-icons-png.flaticon.com/512/3566/3566427.png"],
  },
];

function Header({ user, handleSignOut, updatecounter}) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ishamOpen, setIshamOpen] = useState(false);
  const [color, setcolor] = useState("#000");
  const [showBanner, setShowBanner] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [favcounter, setfavcounter] = useState(0);
  const [cartcounter, setcartcounter] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profileimg, setProfileImg] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.uid) {
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setName(userData.Name || "");
            setProfileImg(userData.profileurl || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    setName(user?.displayName || "");
    setProfileImg(user?.photoURL || "");
  }, [user]);

  const fetchSearchResults = async (query) => {
    try {
      setIsLoading(true);

      if (query.trim() !== "") {
        const searchWords = query.split(/\s+/).filter(Boolean);
        let q = collection(db, "Products");
        const querySnapshot = await getDocs(q);
        const filteredProducts = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => {
            const searchRegex = new RegExp(searchWords.join("|"), "i");
            return (
              searchRegex.test(product.Name) ||
              searchRegex.test(product.keyfeature) ||
              searchRegex.test(product.Brand) ||
              searchRegex.test(product.Description)
            );
          });
        setSearchResults(filteredProducts);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const favQuery = query(
          collection(db, "Favorites"),
          where("user", "==", user.uid)
        );
        const favSnapshot = await getDocs(favQuery);
        const favCount = favSnapshot.size;
        setfavcounter(favCount);

        const cartQuery = query(
          collection(db, "Cart"),
          where("user", "==", user.uid)
        );
        const cartSnapshot = await getDocs(cartQuery);
        const cartCount = cartSnapshot.size;
        setcartcounter(cartCount);
      }
    };

    fetchUserData();
  }, [user,updatecounter]);

  const dropdownRef = useRef(null);

  const handleClick = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handlesearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    fetchSearchResults(value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOptionsVisible(false);
    }
    
    const searchResultsElement = document.querySelector(".searchresults");
    if (searchResultsElement && !searchResultsElement.contains(event.target)) {
      setSearch("");
    }
  };
  

  const handleSearchSubmit = () => {
    navigate(`/search?s=${encodeURIComponent(search)}`);
  };

  const toggleDropdown = () => {
    console.log("Dropdown toggled");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hamburgerhandle = () => {
    setIshamOpen(!ishamOpen);
  };

  const handleScroll = () => {
    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollTop = window.scrollY;
    const percentage = (scrollTop / documentHeight) * 100;

    setIsSticky(scrollTop > 0);

    setShowBanner(
      prevScrollPos > scrollTop || scrollTop < documentHeight * 0.8
    );

    setPrevScrollPos(scrollTop);

    const progressBarFill = document.getElementById("progress-bar-fill");
    if (progressBarFill) {
      progressBarFill.style.width = `${percentage}%`;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowBanner(true);
    }, 50);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showCart, setShowCart] = useState(false);
  const [showFav, setShowFav] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
    setShowFav(false);
    if (!showFav) {
      document.body.classList.add("show-fav");
    } else {
      document.body.classList.remove("show-fav");
    }
  };

  const toggleFav = () => {
    setShowFav(!showFav);
    setShowCart(false);
  };

  const handleSearchResultClick = () => {
    setSearch("");
  };



  return (
    <div style={{ overflow: "visible" }}>
      {showCart && <div className="transparent-layer"></div>}

      {showCart && (
        <div className={`togglecartfav ${showCart ? "show" : ""}`}>
          <img
            src="/assets/Imgs/HeaderImages/close.png"
            alt="Close Icon"
            style={{
              height: "auto",
              width: "20px",
              position: "absolute",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={toggleCart}
          />

          <Mycart cart user={user} />
        </div>
      )}
      {showFav && <div className="transparent-layer"></div>}

      {showFav && (
        <div className={`togglecartfav ${showFav ? "show" : ""}`}>
          <img
            src="/assets/Imgs/HeaderImages/close.png"
            alt="Close Icon"
            style={{
              height: "auto",
              width: "20px",
              position: "absolute",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={toggleFav}
          />

          <Mycart user={user} />
        </div>
      )}

      

      {showBanner && (
        <div className={`headerBanner`}>
          <h5>
            Huge Sale For All The Products And Free Express Delivery -OFF 50%
            <span>
              &nbsp;&nbsp;<a href="/cat?name=All%20products">Shop Now</a>
            </span>
          </h5>

          <span className="languageDropdown">
            <div className="dropdownToggle" onClick={toggleDropdown}></div>
            <select id="languageSelect">
              <option value="en">English 🇺🇸</option>
              <option value="ar">العربية 🇸🇦</option>
              <option value="es">Español 🇪🇸</option>
              <option value="fr">Français 🇫🇷</option>
            </select>
          </span>
        </div>
      )}

      <div className={`headerContainer ${isSticky ? "sticky show" : ""}`}>
        <div className="bottomHeader">
          <Link to="/">
            <img
              src="/assets/Imgs/logos/electrobazaarlogo.png"
              alt=""
              id="companyLogo"
              onClick={scrollToTop}
            />
          </Link>

          <div className="nav-links">
            <Link to="/" onClick={scrollToTop}>
              Home
            </Link>
          
            <Link to="/ContactUs" onClick={scrollToTop}>
              Contact
            </Link>
            <Link to="/AboutUs" onClick={scrollToTop}>
              About
            </Link>
            <Link to={user ? "/ManageMyAccount" : "/Login"}>Account</Link>
          </div>
          <div className="search-bar-container">
            <input
              className="search-bar"
              type="text"
              placeholder="What are you looking for?"
              onFocus={() => setcolor("rgb(28, 132, 132)")}
              style={{ borderColor: color }}
              onChange={handlesearch}
              value={search}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
            />
            <button
              type="submit"
              className="search-button"
              style={{ borderColor: color }}
            >
              <img
                src="/assets/Imgs/HeaderImages/search.png"
                alt="Search"
                className="search-icon"
                style={{ cursor: "pointer" }}
              />
            </button>
            {search && (
              <div className="searchresults">
                {isLoading ? (
                  <div>
                    <p>Searching...</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div>No results found</div>
                ) : (
                  searchResults.map((result) => (
                    <Link
                      to={`/product?id=${result.id}`}
                      key={result.id}
                      onClick={handleSearchResultClick}
                    >
                      <div className="searchresult">
                        <div>
                          <img src={result.imgurl[0]} alt={result.Name} />
                        </div>
                        <p>{result.Name}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="icons">
            <div style={{ position: "relative", overflow: "visible" }}>
              <img
                src="/assets/Imgs/HeaderImages/heart.png"
                alt=""
                onClick={toggleFav}
              />
              <div className="itemcounter">{favcounter}</div>
            </div>

            <div style={{ position: "relative", overflow: "visible" }}>
              <img
                src="/assets/Imgs/HeaderImages/cart.png"
                alt=""
                onClick={toggleCart}
              />
              <div className="itemcounter">{cartcounter}</div>
            </div>

            <div
              className="guest-logo-container"
              onClick={handleClick}
              style={{
                width: "25px",
                height: "25px",
                backgroundImage: profileimg
                  ? `url(${profileimg})`
                  : `url(${guestLogo})`,
                backgroundColor: profileimg ? "transparent" : "#ccc",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                cursor: "pointer",
              }}
            >
              <p className="Firstlet">
                {!profileimg && name && name.charAt(0).toUpperCase()}
              </p>

              <div
                ref={dropdownRef}
                className={
                  isOptionsVisible
                    ? "useroptions useroptionschange"
                    : "useroptions"
                }
              >
                {user ? (
                  <a href="/ManageMyAccount">
                    <img
                      className="userimgoption "
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      alt=""
                    />
                    Manage My Account
                  </a>
                ) : (
                  <a href="/SignUp">
                    <img
                      className="userimgoption "
                      src="/assets/Imgs/HeaderImages/guest.png"
                      alt=""
                    />{" "}
                    Sign In / Up
                  </a>
                )}
                <a href="">
                  <img
                    className="userimgoption "
                    src="https://icons.veryicon.com/png/o/miscellaneous/icondian/icon-order-1.png"
                    alt=""
                  />
                  My Order
                </a>
                {user ? (
                  <a href="/" onClick={handleSignOut}>
                    <img
                      className="userimgoption "
                      src="https://img.icons8.com/fluency-systems-regular/48/exit--v1.png"
                      alt=""
                    />{" "}
                    Logout
                  </a>
                ) : null}
              </div>
            </div>

            <div className="hamburger" onClick={hamburgerhandle}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <hr className="grey-line" />
        <div id="progress-bar">
          <div id="progress-bar-fill"></div>
        </div>
      </div>

      <div className={`hamburger-menu ${ishamOpen ? "open" : ""}`}>
        <div className="close-button" onClick={hamburgerhandle}>
          <img
            src="/assets/Imgs/HeaderImages/close.png"
            alt="Close Icon"
            style={{ height: "auto", width: "20px" }}
          />
        </div>

        <img
          style={{
            height: "auto",
            width: "100px",
            justifySelf: "flex-start",
           
          }}
          src="/assets/Imgs/logos/electrobazaarlogo.png"
          alt=""
        />
        <Line />
        <div
          onClick={toggleMenu}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: isMenuOpen ? "30px" : "0",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              overflow: "visible",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                overflow: "visible",
              }}
            >
              Products{" "}
              <img
                src="/assets/Imgs/HeaderImages/expand-arrow.png"
                alt="Angle Down Icon"
                style={{
                  transition: "transform .5s ease",
                  transform: `rotate(${isMenuOpen ? "180deg" : "0deg"})`,
                  height: "14px",
                  width: "auto",
                }}
              />
            </span>
          </div>

          <div className={`hamburger-categories ${isMenuOpen ? "open" : ""}`}>
            {categoriesData.map((category) => (
              <Link to={`/cat?name=${category.name}`} key={category.name}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <Line/>
        <Link to="/">Home</Link>
        <Line/>
        <Link to="/ContactUs">Contact</Link>
        <Line/>
        <Link to="/About">About</Link>
        <Line/>
        <Link to={user ? "/ManageMyAccount" : "/Login"}>Account</Link>
        <Line/>
      </div>
    </div>
  );
}

export default Header;
