/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import FlashSaleCount from '../FlashSaleCount/FlashSaleCount';
import Line from '../Line';
import './Brand.css';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase'; 

function Brand(props) {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [scrollOffset, setScrollOffset] = useState(0);
    const brandsContainerRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'Brands'));
                const querySnapshot = await getDocs(q);
                const brandData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBrands(brandData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); 

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    
  

    const handlePrev = () => {
      setCurrentIndex(prevIndex => (prevIndex === 0 ? brands.length - 1 : prevIndex - 1));
      setScrollOffset(-50); 
  };
  
  const handleNext = () => {
      setCurrentIndex(prevIndex => (prevIndex === brands.length - 1 ? 0 : prevIndex + 1));
      setScrollOffset(50); 
  };
  
  useEffect(() => {
      if (brandsContainerRef.current) {
          const containerWidth = brandsContainerRef.current.offsetWidth;
          const maxScrollOffset = containerWidth/2; 
          brandsContainerRef.current.scrollTo({
              left: (currentIndex * containerWidth) + Math.min(scrollOffset, maxScrollOffset),
              behavior: 'smooth'
          });
      }
  }, [currentIndex, scrollOffset]);
  


    return (
      <div>
        <SectionTitle SectionTitle="Brands" />

        <FlashSaleCount
          SectionAbout="Browse By Brands"
          showCountdown={false}
          showArrows={props.showArrow}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        <div className="categories-container" ref={brandsContainerRef}>
          {brands.map((brand) => (
            <Link
              to={`/brand?b=${brand.Name}`}
              key={brand.Name}
              onClick={scrollToTop}
            >
              <div className="Brandcard">
                <img src={brand.imgurl} alt={brand.brandname} />
              </div>
            </Link>
          ))}
        </div>

        <Line />
      </div>
    );
}

export default Brand;
