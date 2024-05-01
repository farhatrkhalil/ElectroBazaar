
import { useState, useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import FlashSaleCount from '../FlashSaleCount/FlashSaleCount';
import Card from '../Card/Card';
import './ListSection.css';
import Line from '../Line';
import Viewallbtn from '../Viewallbtn/Viewallbtn';
import { db, collection, query, where, getDocs } from '../../firebase';

function ListSection(props) {
    const { user } = props;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
     

 
    const cardListRef = useRef(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let q;
                if (props.bestseller) {
                    q = query(collection(db, 'Products'), where('Bestseller', '==', true));
                } else if (props.sale) {
                    q = query(collection(db, 'Products'), where('Bestseller', '!=', '0'));
                } else if (props.related) {
                    const displayedProductIds = products.map(product => product.id);
                    
                    q = query(
                        collection(db, 'Products'),
                        where('Brand', '==', props.brand),
                        where('__name__', '!=', props.product), 
                        where('Category', 'array-contains', 'Accessories')
                    );
                }

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setProducts(productsData);
                    setLoading(false);
                } else {
                    console.log('No products found');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [props]);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (cardListRef.current) {
            cardListRef.current.scrollTo({
                left: currentIndex * cardListRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

   

    if (loading) {
        return <div>Loading...</div>;
    }

    const { viewallbtn } = props;

    

    return (
        <div id='ListSection-root'>
            <SectionTitle SectionTitle={props.sectiontitle} />
            <FlashSaleCount 
              SectionAbout={props.About} 
              showCountdown={props.discount} 
              showArrows={props.showArrow} 
              handlePrev={handlePrev} 
              handleNext={handleNext} 
              size={products.length}
            />
            <div className='CardList' ref={cardListRef}>
                {products.map((card) => (
                    <Card key={card.id} price={card.Price} rating={card.Rating} isBestSeller={card.Bestseller} discountPercentage={card.discount} productName={card.Name} imgsrc={card.imgurl[0]} id={card.id} user={user} quantity={card.Quantity} updatecounter={props.updateCounter} />
                ))}
            </div>
            {viewallbtn ? <Viewallbtn /> : null}
            <Line />
        </div>
    );
}

export default ListSection;
