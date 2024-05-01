
import { useState, useEffect } from "react";
import "./ProductList.css";
import Card from "../Card/Card";
import Line from "../Line";
import { db, collection, query, where, getDocs } from "../../firebase";
import { useLocation } from "react-router-dom";

function ProductList({ user,updateCounter }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get("name");
  const brand = queryParams.get("b");
  const search = queryParams.get("s");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let q = collection(db, "Products");

        if (cat !== null) {
          q = query(q, where("Category", "array-contains", cat));
        } else if (brand !== null) {
          q = query(q, where("Brand", "==", brand));
        }

        if (search !== null) {
          const searchWords = search.split(/\s+/).filter(Boolean);
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
          setProducts(filteredProducts);
        } else {
          const querySnapshot = await getDocs(q);
          const productsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [cat, brand, search]);

  

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div
        style={{
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Loading Products...</h3>
      </div>
    );
  }

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];
  
    if (option === "highToLow") {
      sortedProducts.sort((a, b) => {
        const discountedPriceA = a.Price * (1 - ((a.discount || 0) / 100));
        const discountedPriceB = b.Price * (1 - ((b.discount || 0) / 100));
        return discountedPriceB - discountedPriceA;
      });
    } else if (option === "lowToHigh") {
      sortedProducts.sort((a, b) => {
        const discountedPriceA = a.Price * (1 - ((a.discount || 0) / 100));
        const discountedPriceB = b.Price * (1 - ((b.discount || 0) / 100));
        return discountedPriceA - discountedPriceB;
      });
    }
  
    setProducts(sortedProducts);
};

let sortedProducts = [...products];


if (sortOption === "highToLow") {
  sortedProducts.sort((a, b) => {
    const discountedPriceA = a.Price * (1 - ((a.discount || 0) / 100));
    const discountedPriceB = b.Price * (1 - ((b.discount || 0) / 100));
    return discountedPriceB - discountedPriceA;
  });
} else if (sortOption === "lowToHigh") {
  sortedProducts.sort((a, b) => {
    const discountedPriceA = a.Price * (1 - ((a.discount || 0) / 100));
    const discountedPriceB = b.Price * (1 - ((b.discount || 0) / 100));
    return discountedPriceA - discountedPriceB;
  });
}

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <div id="ProductList">
        <div className="sort-dropdown">
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="default">Sort by Default</option>
            <option value="highToLow">Sort By Price: High to Low</option>
            <option value="lowToHigh">Sort By Price: Low to High</option>
          </select>
        </div>

        {currentProducts.length === 0 ? (
          <div
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {search && (
              <h2>
                Sorry, we couldn't find any products matching your search for "
                {search}".
              </h2>
            )}
            {!search && cat && (
              <h2>
                Sorry, we couldn't find any products in the <i>"{cat}"</i>{" "}
                category.
              </h2>
            )}
            {!search && brand && (
              <h2>
                Sorry, we couldn't find any products for the <i>"{brand}"</i>{" "}
                brand.
              </h2>
            )}
            {!search && !cat && !brand && (
              <h2>
                Sorry, we couldn't find any products. What are you looking for?
              </h2>
            )}
          </div>
        ) : (
          <>
            {currentProducts.map((product) => (
              <Card
                key={product.id}
                price={product.Price}
                rating={product.Rating}
                isBestSeller={product.Bestseller}
                discountPercentage={product.discount}
                productName={product.Name}
                imgsrc={product.imgurl[0]}
                id={product.id}
                user={user}
                quantity={product.Quantity}
                updatecounter={updateCounter}
              />
            ))}
          </>
        )}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <span
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => paginate(number)}
          >
            {number}
          </span>
        ))}
      </div>
      <Line />
    </div>
  );
}

export default ProductList;
