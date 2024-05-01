/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./Mycart.css";
import { Link } from "react-router-dom";
import Line from "../Line";
import {
  db,
  collection,
  where,
  query,
  getDocs,
  deleteDoc,
  getDoc,
  getFirestore,
} from "../../firebase";
import { doc as firestoreDoc } from "firebase/firestore";

function Mycart({ user, cart }) {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!user || !user.uid) {
          console.error("User object or UID is null or undefined");
          return;
        }
        const q = query(collection(db, "Cart"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedCartItems = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const cartItemData = doc.data();
            const productId = cartItemData.productID;
            const productRef = firestoreDoc(db, "Products", productId);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
              const productData = productDoc.data();
              return { id: doc.id, ...cartItemData, ...productData };
            } else {
              console.error("Product document not found for ID:", productId);
              return null;
            }
          })
        );

        const filteredCartItems = fetchedCartItems.filter(
          (item) => item !== null
        );
        setCartItems(filteredCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        if (!user || !user.uid) {
          console.error("User object or UID is null or undefined");
          return;
        }
        const q = query(
          collection(db, "Favorites"),
          where("user", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedFavorites = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const favItemData = doc.data();
            const productId = favItemData.ProductID;
            const productRef = firestoreDoc(db, "Products", productId);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
              const productData = productDoc.data();
              return { id: doc.id, ...favItemData, ...productData };
            } else {
              console.error("Product document not found for ID:", productId);
              return null;
            }
          })
        );

        const filteredFavorites = fetchedFavorites.filter(
          (item) => item !== null
        );
        setFavorites(filteredFavorites);
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
    fetchFavorites();
  }, [user]);

  const removeItem = async (collectionName, productId) => {
    try {
      let q;
      if (collectionName === "Cart") {
        q = query(
          collection(db, collectionName),
          where("user", "==", user.uid),
          where("productID", "==", productId)
        );
      } else if (collectionName === "Favorites") {
        q = query(
          collection(db, collectionName),
          where("user", "==", user.uid),
          where("ProductID", "==", productId)
        );
      }

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      if (collectionName === "Cart") {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productID !== productId)
        );
      } else if (collectionName === "Favorites") {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.ProductID !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const total = (cart ? cartItems : favorites).reduce((acc, item) => {
    const itemQuantity = cart ? item.quantity : 1;
    const itemTotal = item.Price * itemQuantity;
    return acc + itemTotal;
  }, 0);

  const removeAllFavorites = async () => {
    try {
      const q = query(
        collection(db, "Favorites"),
        where("user", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setFavorites([]);
    } catch (error) {
      console.error("Error removing all items from favorites:", error);
    }
  };

  return (
    <div id="CartContainer">
      <h1>{cart ? "Shopping Cart" : "My Favorites"}</h1>
      <Line />
      {loading ? (
        <div>Loading...</div>
      ) : (cart ? cartItems : favorites).length === 0 ? (
        <div>No items in {cart ? "cart" : "favorites"}</div>
      ) : (
        (cart ? cartItems : favorites).map((item, index) => (
          <div className="Cartitem" key={item.id}>
            <img
              className="removecart"
              src="/assets/Imgs/HeaderImages/close.png"
              alt=""
              onClick={() =>
                removeItem(
                  cart ? "Cart" : "Favorites",
                  item[cart ? "productID" : "ProductID"]
                )
              }
            />

            <div className="Cartitemhead">
              <div className="imgcontainer">
                <img src={item.imgurl[0]} alt="" />
              </div>
              <div className="my_product_info">
                <p style={{ flex: "2" }}>
                  {item.Name && item.Name.slice(0, 30)}
                  {item.Name && item.Name.length > 30 && "..."}
                </p>

                <div className="cartremove">
                  {cart && (
                    <p>
                      {item.quantity} <sup style={{ fontSize: "small" }}>x</sup>{" "}
                    </p>
                  )}
                  <p>${item.Price}</p>
                </div>
              </div>
            </div>
            {index < (cart ? cartItems : favorites).length - 1 ? (
              <Line />
            ) : null}
          </div>
        ))
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          margin: "60px 0 0",
        }}
      >
        <Line />
        <div className="subtotoalcart">
          <p>Subtotal:</p>
          <p>${total}</p>
        </div>
        <Line />
        {!cart && favorites.length !== 0 ? (
  <button
    style={{
      margin: "40px 0",
      backgroundColor: "crimson",
      color: "#fff",
      borderColor: "crimson",
    }}
    className="Proceedbtn"
    onClick={removeAllFavorites}
  >
    Remove All
  </button>
) : cart  && cartItems.length !==0 ? (
  <Link
    to="/Checkout"
    style={{
      minWidth: "100%",
      margin: "40px 0",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <button className="Proceedbtn">Proceed to Checkout</button>
  </Link>
) : null}

      </div>
    </div>
  );
}

export default Mycart;
