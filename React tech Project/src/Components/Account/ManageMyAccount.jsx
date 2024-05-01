import "./ManageMyAccount.css";
import { db, collection, addDoc, getDocs, updateDoc, doc,query,where,getDoc,setDoc } from "../../firebase"; 
import { useState, useEffect } from "react";

function ManageMyAccount({ user }) {

  if (!user || !user.uid) {
      return;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileimg, setProfileImg] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [uid, setUid] = useState("");
  

  useEffect(() => {
    setName(user.displayName || "");
    setEmail(user.email || "");
    setProfileImg(user.photoURL || "");
    setUid(user.uid); 
  }, [user]);

  

  const handleSaveChanges = async () => {
    try {
      const userData = {
        Address: address,
        City: city,
        Country: country,
        Name: name,
        Phone: phone,
        profileurl: profileimg,
        uid: user.uid
      };
  
      const userQuerySnapshot = await getDocs(collection(db, "users"));
      const userDocs = userQuerySnapshot.docs;
      const userDoc = userDocs.find(doc => doc.data().uid === user.uid);
  
      if (userDoc) {
        await updateDoc(doc(db, "users", userDoc.id), userData);
        alert("User data updated successfully!");
  
   
        setName(userData.Name || "");
        setEmail(userData.Email || "");
        setProfileImg(userData.profileurl || "");
        setAddress(userData.Address || "");
        setCity(userData.City || "");
        setCountry(userData.Country || "");
        setPhone(userData.Phone || "");
      } else {
        await addDoc(collection(db, "users"), userData);
        alert("User data saved successfully!");
      }
    } catch (error) {
      console.error("Error saving user data: ", error);
      alert("Error saving user data. Please try again later.");
    }
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setName(userData.Name || "");
          setEmail(userData.Email || "");
          setProfileImg(userData.profileurl || "");
          setAddress(userData.Address || "");
          setCity(userData.City || "");
          setCountry(userData.Country || "");
          setPhone(userData.Phone || "");
          setUid(userData.uid || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);
  

  
 

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [keyFeatureInput, setKeyFeatureInput] = useState("");
  const [imgUrls, setImgUrls] = useState([]);
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [Rating, setRating] = useState([]);
  const [discount, setDiscount] = useState("0");
  console.log(user);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Brands"));
        const brandsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    if (
      productName.trim() === "" ||
      brand.trim() === "" ||
      selectedCategories.length === 0 ||
      productDescription.trim() === "" ||
      price.trim() === "" ||
      imgUrls.length === 0 ||
      keyFeatures.length === 0
    ) {
      alert(
        "Please fill in all required fields and add at least one image and one key feature."
      );
      return;
    }

    const discountValue = parseFloat(discount);

    try {
      await addDoc(collection(db, "Products"), {
        Bestseller: false,
        Brand: brand,
        Category: selectedCategories,
        Description: productDescription,
        Name: productName,
        Price: price,
        Quantity: quantity ? quantity : 1,
        Rating: Rating,
        discount: discountValue,
        imgurl: imgUrls,
        keyfeature: keyFeatures,
      });

      alert("Product added successfully!");

      setProductName("");
      setBrand("");
      setCategory("");
      setProductDescription("");
      setPrice("");
      setQuantity("");
      setRating("");
      setDiscount("");
      setImgUrls([]);
      setKeyFeatures([]);
      setSelectedCategories([]);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleAddImgUrl = () => {
    if (imgUrlInput.trim() !== "") {
      setImgUrls([...imgUrls, imgUrlInput.trim()]);
      setImgUrlInput("");
    }
  };

  const handleAddKeyFeature = () => {
    if (keyFeatureInput.trim() !== "") {
      setKeyFeatures([...keyFeatures, keyFeatureInput.trim()]);
      setKeyFeatureInput("");
    }
  };

  const handleImgUrlInputChange = (e) => {
    setImgUrlInput(e.target.value);
  };

  const handleKeyFeatureInputChange = (e) => {
    setKeyFeatureInput(e.target.value);
  };

  const handleImgUrlInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddImgUrl();
    }
  };

  const handleKeyFeatureInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddKeyFeature();
    }
  };

  const removeCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (cat) => cat !== categoryToRemove
    );
    setSelectedCategories(updatedCategories);
  };

  const removeKeyFeature = (keyFeatureToRemove) => {
    const updatedKeyFeatures = keyFeatures.filter(
      (feature) => feature !== keyFeatureToRemove
    );
    setKeyFeatures(updatedKeyFeatures);
  };

  const handleDiscountInputChange = (e) => {
  const value = e.target.value;
  if (!isNaN(value)) {
    setDiscount(parseFloat(value));
  } else {
    console.error("Invalid discount value");
  }
};

  const removeImageUrl = (urlToRemove) => {
    const updatedUrls = imgUrls.filter((url) => url !== urlToRemove);
    setImgUrls(updatedUrls);
  };

  const handleChangeProfileImage = async () => {
    try {
      const userData = {
        Address: address,
        City: city,
        Country: country,
        Name: name,
        Phone: phone,
        profileurl: profileimg,
        uid: user.uid
      };
  
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        await updateDoc(userDocRef, userData);
        alert("Profile image updated successfully!");
      } else {
        console.log("User document does not exist for this UID");
      }
    } catch (error) {
      console.error("Error updating profile image: ", error);
      alert("Error updating profile image. Please try again later.");
    }
  };
  
  
  
  
  
 
  

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="pt-1">
          <div>
            <h1 className="page-title">My Account</h1>
            <p style={{fontSize:"1.1rem"}}>Hello <b style={{color:"#DB4444"}}>{name}</b></p>
            <div>
              <label style={{margin:"0"}} htmlFor="">Profile Image Url</label>
            <input type="text"  value={profileimg} style={{margin:"0 0 20px"}} onChange={(e) => setProfileImg(e.target.value)}/>
            </div>
          </div>
          <div className="imgcontainer">
  <div
    className="profile-image"
    style={{
      backgroundImage: profileimg ? `url(${profileimg})` : 'none',
      backgroundColor: profileimg ? 'transparent' : '#ccc',
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover"
    }}
  >
    <p className="Firstlet">{!profileimg && name && name.charAt(0).toUpperCase()}</p>
  </div>
  <button onClick={handleChangeProfileImage} >Change Profile Image</button>
</div>

        </div>

        <div className="settings-section">
          <h2 className="settings-title">General Information</h2>
          <div className="generalInfo-section">
            <div>
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" placeholder="Name:" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input id="email" type="text" placeholder="Email:" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
              <label htmlFor="phone">Phone:</label>
              <input id="phone" type="text" placeholder="Phone:" onChange={(e) => setPhone(e.target.value)} value={phone}/>
            </div>

            <div>
              <label htmlFor="address">Address:</label>
              <input id="address" type="text" placeholder="Address:" onChange={(e) => setAddress(e.target.value)} value={address}/>
            </div>

            <div>
              <label htmlFor="city">City:</label>
              <input id="city" type="text" placeholder="City:" onChange={(e) => setCity(e.target.value)} value={city}/>
            </div>

            <div>
              <label htmlFor="country">Country:</label>
              <input id="country" type="text" placeholder="Country:" onChange={(e) => setCountry(e.target.value)} value={country}/>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-title">Change Password</h2>
          <div className="generalInfo-section">
            <div>
              <label htmlFor="Oldpass">Old Pass:</label>
              <input
                name="currentPassword"
                placeholder="Old Password"
                type="password"
                className="form-control"
                id="Oldpass"
              />
            </div>

            <div>
              <label htmlFor="Newpass">New Password:</label>
              <input
                name="password"
                placeholder="New Password"
                type="password"
                className="form-control"
                id="Newpass"
              />
            </div>
          </div>
          <button className="Changepass" style={{ margin: "20px 0 0" }}>
            Change Password
          </button>
          <button className="Changepass" onClick={handleSaveChanges} >Save Changes</button>
        </div>
        {uid == "25yB3rHXA4appzw7WhHdjX8MNa62" ? (
          <div>
            <div className="settings-section">
              <h2 className="settings-title">Admin</h2>
              <h3 className="page-title">Add Products</h3>
              <div className="generalInfo-section">
                <div className="Productfield">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Product Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Product Rating"
                    value={Rating}
                    onChange={(e) => setRating(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Product Discount"
                    value={discount}
                    onChange={handleDiscountInputChange}
                  />

                  <div className="Productfield">
                    <input
                      type="text"
                      placeholder="Product Keyfeature"
                      value={keyFeatureInput}
                      onChange={handleKeyFeatureInputChange}
                      onKeyPress={handleKeyFeatureInputKeyPress}
                    />
                    <button
                      className="addProduct"
                      onClick={handleAddKeyFeature}
                    >
                      Add Key Feature
                    </button>
                  </div>
                  <div className="Productfield">
                    <input
                      type="text"
                      placeholder="Product Image"
                      value={imgUrlInput}
                      onChange={handleImgUrlInputChange}
                      onKeyPress={handleImgUrlInputKeyPress}
                    />
                    <button className="addProduct" onClick={handleAddImgUrl}>
                      Add Image URL
                    </button>
                    <button
                      className="addProduct"
                      onClick={handleAddProduct}
                      style={{ backgroundColor: "crimson" }}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
                <div className="Productfield">
                  <select
                    name="Brands"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select a Brand
                    </option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.Name}>
                        {brand.Name}
                      </option>
                    ))}
                  </select>

                  <select
                    name="Categories"
                    value={""}
                    onChange={(e) => {
                      const selectedCategory = e.target.value;
                      if (!selectedCategories.includes(selectedCategory)) {
                        setSelectedCategories([
                          ...selectedCategories,
                          selectedCategory,
                        ]);
                      }
                      if (!selectedCategories.includes("All products")) {
                        setSelectedCategories((prevCategories) => [
                          ...prevCategories,
                          "All products",
                        ]);
                      }
                    }}
                  >
                    <option value="" disabled hidden>
                      Select a Category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.Name}>
                        {category.Name}
                      </option>
                    ))}
                  </select>

                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></textarea>
                  <div className="selctedcat">
                    <h3>Selected Categories</h3>
                    {selectedCategories.length === 0 ? (
                      <p>No Selected Categories</p>
                    ) : (
                      selectedCategories.map((cat, index) => (
                        <p key={index}>
                          {cat}{" "}
                          <img
                            className="close"
                            src="/assets/Imgs/HeaderImages/close.png"
                            alt=""
                            onClick={() => removeCategory(cat)}
                          />
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="viewadded">
              <h3 style={{ fontWeight: "500" }}>Key Features:</h3>
              <div className="keycatselect">
                {keyFeatures.length == 0 ? (
                  <div>
                    <p>No Added Keyfeatures</p>
                  </div>
                ) : (
                  keyFeatures.map((feature, index) => (
                    <div>
                      <p key={index}>{feature}</p>
                      <img
                        className="close"
                        src="/assets/Imgs/HeaderImages/close.png"
                        alt=""
                        onClick={() => removeKeyFeature(feature)}
                      />
                    </div>
                  ))
                )}
              </div>

              <h3 style={{ fontWeight: "500" }}>Images Added:</h3>
              <div className="keycatselect">
                {imgUrls.length == 0 ? (
                  <div>
                    <p>No Added Images</p>
                  </div>
                ) : (
                  imgUrls.map((url, index) => (
                    <div>
                      <img
                        key={index}
                        src={url}
                        alt={`Image ${index}`}
                        style={{
                          maxWidth: "100%",
                          height: "70px",
                          borderRadius: "5px",
                        }}
                      />
                      <img
                        className="close"
                        src="/assets/Imgs/HeaderImages/close.png"
                        alt=""
                        onClick={() => removeImageUrl(url)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ManageMyAccount;
