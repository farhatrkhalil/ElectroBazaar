
import "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import "./ProductDetails.css";
import StarSystem from "../StarSystem/StarSystem";
import LandPageSection from "../LandPageSections/ListSection";
import Line from "../Line";
import { FaHeart } from "react-icons/fa";
import Counter from "../Counter/Counter";
import {
  db,
  collection,
  addDoc,
  where,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
} from "../../firebase";
import { useLocation } from "react-router-dom";

function ProductDetails({ user, updateCounter }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [productActionHeight, setProductActionHeight] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const productActionRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity2, setQuantity] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(
          collection(db, "Products"),
          where("__name__", "==", id)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          setProduct(productData);
          setLoading(false);
        } else {
          console.error("No product found with name:", id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (productActionRef.current) {
      setProductActionHeight(productActionRef.current.clientHeight - 10);
    }
  }, [productActionRef, product]);

  useEffect(() => {
    if (!hasScrolled) {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      scrollToTop();
      setHasScrolled(true);
    }
  }, [hasScrolled]);

  function toggleLike() {
    setLiked((prevLiked) => !prevLiked);
  }

  const [displayimage, setdisplayimage] = useState("");

  function handleImageClick(imageSrc, index) {
    setdisplayimage(imageSrc);
    setSelectedImageIndex(index);
  }

  useEffect(() => {
    if (product && product.imgurl && product.imgurl.length > 0) {
      setdisplayimage(product.imgurl[selectedImageIndex]);
    }
  }, [product, selectedImageIndex]);

  if (loading) {
    return <div style={{height:"50dvh",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"1.2rem",fontWeight:"bolder"}}>Loading...</div>;
  }

  const handleHeartClick = async () => {
    updateCounter();

    if (user) {
      const favoritesCollection = collection(db, "Favorites");
      const favoritesQuery = query(
        favoritesCollection,
        where("user", "==", user.uid),
        where("ProductID", "==", id)
      );

      if (!isFavorite) {
        try {
          await addDoc(favoritesCollection, { user: user.uid, ProductID: id });
          setIsFavorite(true);
          setLiked(true);
        } catch (error) {
          console.error("Error adding product to favorites:", error);
        }
      } else {
        const querySnapshot = await getDocs(favoritesQuery);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setIsFavorite(false);
        setLiked(false);
        console.log("Removing product from favorites");
      }
    }
  };

  const handlecartClick = async (e, quantity) => {
    e.preventDefault();
    updateCounter();

    if (user) {
      const cartCollection = collection(db, "Cart");
      const cartQuery = query(
        cartCollection,
        where("user", "==", user.uid),
        where("productID", "==", id)
      );

      try {
        const querySnapshot = await getDocs(cartQuery);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, { quantity: quantity2 });
          });
          console.log("Product quantity updated in the cart");
        } else {
          await addDoc(cartCollection, {
            productID: id,
            quantity: quantity2,
            user: user.uid,
          });
          console.log("Product added to the cart");
        }
      } catch (error) {
        console.error("Error adding product to the cart:", error);
      }
    }
  };

  return (
    <div style={{ overflow: "visible" }}>
      <div id="ProductDetails">
        <div
          className="ProductImages"
          style={{ maxHeight: productActionHeight }}
        >
          {product.imgurl &&
            product.imgurl.map((imageUrl, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(imageUrl, index)}
                style={{
                  cursor: "pointer",
                  border:
                    index === selectedImageIndex
                      ? "2px solid rgb(220, 118, 118)"
                      : "2px solid transparent",
                }} // Apply border based on selected index
              >
                <img src={imageUrl} alt="" />
              </div>
            ))}
        </div>

        <div className={`ImageDisplay`}>
          {product.imgurl && <img src={displayimage} alt="" />}
        </div>

        <div className="ProductAction" ref={productActionRef}>
          <div className="ProductDetails">
            <h2>{product.Name}</h2>
            <StarSystem rating={product.Rating} />
            {product.Quantity > 0 ? (
              <p className="inStock Stock">In Stock</p>
            ) : (
              <p className="outStock Stock">Out of Stock</p>
            )}
            {product.discount ? (
              <p style={{ fontSize: "1.2rem", overflow: "visible" }}>
                <span style={{ textDecoration: "line-through", color: "grey" }}>
                  ${product.Price}
                </span>{" "}
                <span style={{ fontWeight: "bold", color: "#DB4444" }}>
                  $
                  {(
                    product.Price -
                    (product.Price * product.discount) / 100
                  ).toFixed(2)}
                </span>
                <span className="discount">{product.discount}%</span>
              </p>
            ) : (
              <p style={{ fontSize: "1.2rem", fontWeight: "bold"}}>${product.Price}</p>
            )}
            <p style={{ fontSize: "1rem" }}>{product.Description}</p>
          </div>
          {product.Quantity > 0 ? (
            <div className="ProductBuy">
              <Counter
                className="counter"
                quantity={product.Quantity}
                onQuantityChange={setQuantity}
              />
              <div className="BuyOption">
                <a
                  href={`/Checkout?id=${id}&q=${quantity2}`}
                  className="BuyNow"
                >
                  Buy Now
                </a>
                <a href="" className="BuyNow2" onClick={handlecartClick}>
                  Add To Cart
                </a>
              </div>
              <img
                src={
                  liked
                    ? "/assets/Imgs/HeaderImages/heartred.png"
                    : "/assets/Imgs/HeaderImages/heart.png"
                }
                className={"heart-icon"}
                onClick={() => (toggleLike(), handleHeartClick())}
                style={{ overflow: "visible" }}
              />
            </div>
          ) : null}

          <Line />
          <div className="Productfeatures">
            <h3>Product Key Features</h3>
            <ul>
              {product.keyfeature && product.keyfeature.length > 0 ? (
                product.keyfeature.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))
              ) : (
                <li>No key features available</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <LandPageSection
        sectiontitle="Related Items"
        related={true}
        category={product.Category[0]}
        brand={product.Brand}
        user={user}
        product={id}
        updateCounter={updateCounter}
      />
    </div>
  );
}

export default ProductDetails;
