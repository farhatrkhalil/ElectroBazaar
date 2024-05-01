/* eslint-disable react/prop-types */
import "./Card.css";
import heart from "/assets/Imgs/HeaderImages/heart.png";
import redheart from "/assets/Imgs/HeaderImages/heartred.png";
import StarSystem from "../StarSystem/StarSystem";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, collection, addDoc, where, query, getDocs, deleteDoc, updateDoc } from '../../firebase';



function Card({
  isBestSeller,
  discountPercentage,
  price,
  rating,
  productName,
  imgsrc,
  id,
  user,
  quantity,
  updatecounter
}) {
  


  const MAX_NAME_LENGTH = 21;
  const hasDiscount =
    discountPercentage !== null &&
    discountPercentage !== undefined &&
    discountPercentage !== 0;
  const discountedPrice = hasDiscount
    ? price * (1 - discountPercentage / 100)
    : null;
  const truncatedProductName =
    productName.length > MAX_NAME_LENGTH
      ? productName.substring(0, MAX_NAME_LENGTH) + "..."
      : productName;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favoritesCollection = collection(db, 'Favorites');
        const favoritesQuery = query(favoritesCollection, where('user', '==', user.uid), where('ProductID', '==', id));

        try {
          const querySnapshot = await getDocs(favoritesQuery);
          setIsFavorite(!querySnapshot.empty);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [user, id]);

  const handleHeartClick = async (e) => {
    e.preventDefault();
    updatecounter();
    

    if (user) {
      const favoritesCollection = collection(db, 'Favorites');
      const favoritesQuery = query(favoritesCollection, where('user', '==', user.uid), where('ProductID', '==', id));

      if (!isFavorite) {
        try {
          await addDoc(favoritesCollection, { user: user.uid, ProductID: id });
          setIsFavorite(true);
        } catch (error) {
          console.error('Error adding product to favorites:', error);
        }
      } else {
        const querySnapshot = await getDocs(favoritesQuery);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setIsFavorite(false);
        console.log('Removing product from favorites');
      }
    }
  };

  const handleCartClick = async (e) => {
    e.preventDefault();
    updatecounter();
    if (user) {
      const cartCollection = collection(db, 'Cart');
      const cartQuery = query(cartCollection, where('user', '==', user.uid), where('productID', '==', id));

      try {
        const querySnapshot = await getDocs(cartQuery);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            const currentQuantity = doc.data().quantity || 1;
            await updateDoc(doc.ref, { quantity: currentQuantity + 1 });
          });
          console.log('Product quantity incremented in the cart');
        } else {
          await addDoc(cartCollection, { productID: id, quantity: 1, user: user.uid });
          console.log('Product added to the cart');
        }
      } catch (error) {
        console.error('Error adding product to the cart:', error);
      }
    }
  };

  return (
    <Link
      to={`/product?id=${id}&productName=${encodeURIComponent(
        truncatedProductName
      )}`}
      style={{ overflowX: "visible", display: "flex" }}
    >
      <div id="card-root">
        <div className="cardImage">
          <div className="cardFeature">
            {isBestSeller && (
              <div style={{ backgroundColor: "gold" }}>
                <p>Best Seller</p>
              </div>
            )}
            {hasDiscount && (
              <div>
                <p>-{discountPercentage}%</p>
              </div>
            )}
          </div>
          <div className="imgcontainer">
            <img src={imgsrc} alt="" />
          </div>
          <div className="cardAction">
            <img
              className={isFavorite ? "favorite-heart" : "normal-heart"}
              onClick={handleHeartClick}
              src={isFavorite ? redheart : heart}
              alt="heart"
            />
          </div>
        </div>
        <div className="cardContentContainer" onClick={scrollToTop}>
          <div className="cardContent">
            <p style={{ color: "#000"}}>{truncatedProductName}</p>
            <p className="productCard" style={{ color: "red" }}>
              {hasDiscount ? `$${discountedPrice.toFixed(2)}` : `$${price}`}
              {hasDiscount && (
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "4px",
                    color: "gray",
                  }}
                >
                  ${price}
                </span>
              )}
            </p>
            <StarSystem rating={rating} />
          </div>
        </div>

        {quantity <= 0 ? (
          <button>Out Of Stock</button>
        ) : (
          <button onClick={handleCartClick} className="addtocart" >Add to Cart</button>
        )}
      </div>
    </Link>
  );
}

export default Card;
