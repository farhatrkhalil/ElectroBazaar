import './Checkout.css';
import Line from '../Line';
import { db, collection, where, query, getDocs, addDoc, getDoc,deleteDoc,updateDoc } from '../../firebase';
import { doc as firestoreDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function Checkout({ user }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const buynowid = queryParams.get("id");
    const buynowqParam = queryParams.get("q");
    const buynowq = buynowqParam ? parseInt(buynowqParam) : 1;
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderid,setorderid]=useState("");
    
   

    const [cartItems, setCartItems] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        city: '',
        phoneNumber: '',
        email: '',
        paymentMethod: ''
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (!user || !user.uid) {
                    return;
                }
    
                let fetchedCartItems = [];
    
                if (buynowid) {
                    const productRef = firestoreDoc(db, 'Products', buynowid);
                    const productDoc = await getDoc(productRef);
    
                    if (productDoc.exists()) {
                        const productData = productDoc.data();
                       
                        productData.quantity = buynowq;
                        const cartItem = { id: productDoc.id, ...productData };
                        fetchedCartItems.push(cartItem);
                    } else {
                        console.error('Product document not found for ID:', buynowid);
                    }
                } else {
                   
                    const q = query(collection(db, 'Cart'), where('user', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    fetchedCartItems = await Promise.all(querySnapshot.docs.map(async (doc) => {
                        const cartItemData = doc.data();
                        const productId = cartItemData.productID;
                        const productRef = firestoreDoc(db, 'Products', productId);
                        const productDoc = await getDoc(productRef);
    
                        if (productDoc.exists()) {
                            const productData = productDoc.data();
                            return { id: doc.id, ...cartItemData, ...productData };
                        } else {
                            console.error('Product document not found for ID:', productId);
                            return null;
                        }
                    }));
                }
    
                const filteredCartItems = fetchedCartItems.filter(item => item !== null);
                setCartItems(filteredCartItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCartItems();
    }, [user, buynowid]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({ ...billingDetails, [name]: value });
    };

    const handlePlaceOrder = async () => {
        try {
           
            if (!billingDetails.firstName || !billingDetails.streetAddress || !billingDetails.city || !billingDetails.phoneNumber || !billingDetails.email || !billingDetails.paymentMethod) {
                console.error('Required fields are not filled');
                setError(true);
                return;
            }
    
            
            const order = {
                Fname: billingDetails.firstName,
                CompanyName: billingDetails.companyName || null,
                Email: billingDetails.email,
                MyOrder: cartItems,
                PaymentMethod: billingDetails.paymentMethod,
                Phone: billingDetails.phoneNumber,
                StAdress: billingDetails.streetAddress,
                SubTotal: calculateSubtotal(),
                Total: calculateTotal(),
                TownCity: billingDetails.city,
                Apartment: billingDetails.apartment || null
            };
    
           
            const docRef = await addDoc(collection(db, 'Orders'), order);
            setorderid(docRef.id);
            console.log('Order placed with ID:', docRef.id);
    
            if(!buynowid){
            for (const cartItem of cartItems) {
                const productRef = firestoreDoc(db, 'Products', cartItem.id);
                const productDoc = await getDoc(productRef);
    
                if (productDoc.exists()) {
                    const productData = productDoc.data();
                    const updatedQuantity = productData.Quantity - cartItem.quantity;
    
                    if (updatedQuantity >= 0) {
                        await updateDoc(productRef, { Quantity: updatedQuantity });
                        console.log('Product quantity updated in the Products collection');
                    } else {
                        console.error('Invalid quantity after decrement');
                    }
                } else {
                    console.error('Product document not found for ID:', cartItem.id);
                }
            }
            }
    
           
            if (buynowid) {
                const productRef = firestoreDoc(db, 'Products', buynowid);
                const productDoc = await getDoc(productRef);
    
                if (productDoc.exists()) {
                    const productData = productDoc.data();
                    const updatedQuantity = productData.Quantity - buynowq;
    
                    if (updatedQuantity >= 0) {
                        await updateDoc(productRef, { Quantity: updatedQuantity });
                        console.log('Product quantity updated in the Products collection');
                    } else {
                        console.error('Invalid quantity after decrement');
                    }
                } else {
                    console.error('Product document not found for ID:', buynowid);
                }
            }
    
      
            await deleteCartItems();
    
      
            setOrderSuccess(true);
            setError(false);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };
    
    

    const deleteCartItems = async () => {
        try {
            if (!user || !user.uid) {
                console.error('User object or UID is null or undefined');
                return;
            }

            const q = query(collection(db, 'Cart'), where('user', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const deletePromises = querySnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
            });

            await Promise.all(deletePromises);

            console.log('Cart items deleted successfully');
        } catch (error) {
            console.error('Error deleting cart items:', error);
        }
    };

    
    
    const calculateSubtotal = () => {
        if (cartItems.length === 0) {
            return 0;
        }
    
        return cartItems.reduce((acc, item) => {
            const itemPrice = parseFloat(item.Price);
            const itemQuantity = parseInt(item.quantity);
    
            if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                return acc + (itemPrice * itemQuantity);
            } else {
                console.error('Invalid item price or quantity:', item);
                return acc;
            }
        }, 0);
    };
    
    const calculateTotal = () => {
        let subtotal = calculateSubtotal();
    
        if (buynowid && cartItems.length === 1) {
            const itemPrice = parseFloat(cartItems[0].Price);
            const itemQuantity = parseInt(cartItems[0].quantity);
    
            if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                subtotal = itemPrice * itemQuantity;
            } else {
                console.error('Invalid item price or quantity:', cartItems[0]);
                subtotal = 0;
            }
        }
    
        if (!isNaN(subtotal)) {
            const taxRate = 0.05;
            const tax = parseFloat((subtotal * taxRate).toFixed(2));
            return parseFloat((subtotal + tax).toFixed(2));
        } else {
            console.error('Invalid subtotal value:', subtotal);
            return 0;
        }
    };
    
    

    

    return (
        <div id="checkout-container">
            <div className='checkout-forms'>
                <h1>Billing Details</h1>
                <label htmlFor="firstName">First Name <span>*</span></label>
                <input type="text" id="firstName" name="firstName" value={billingDetails.firstName} onChange={handleInputChange} required />
                <label htmlFor="companyName">Company name</label>
                <input type="text" id="companyName" name="companyName" value={billingDetails.companyName} onChange={handleInputChange} />
                <label htmlFor="streetAddress">Street Address <span>*</span></label>
                <input type="text" id="streetAddress" name="streetAddress" value={billingDetails.streetAddress} onChange={handleInputChange} required />
                <label htmlFor="apartment">Apartment, floor, etc.<span>*</span></label>
                <input type="text" id="apartment" name="apartment" value={billingDetails.apartment} onChange={handleInputChange} required />
                <label htmlFor="city">Town/City <span>*</span></label>
                <input type="text" id="city" name="city" value={billingDetails.city} onChange={handleInputChange} required />
                <label htmlFor="phoneNumber">Phone Number <span>*</span></label>
                <input type="number" id="phoneNumber" name="phoneNumber" value={billingDetails.phoneNumber} onChange={handleInputChange} required />
                <label htmlFor="email">Email Address <span>*</span></label>
                <input type="email" id="email" name="email" value={billingDetails.email} onChange={handleInputChange} required />
            </div>

            <div className='Checkout-items'>
                <div className='my-items'>
                    {cartItems.map(item => (
                        <div className='myitem' key={item.id}>
                            <div><img src={item.imgurl[0]} alt="" /></div>
                            <p style={{ flex: "2" }}>{item.Name}</p>
                            <p>${item.Price}</p>
                            <p>{item.quantity}x</p>
                        </div>
                    ))}
                </div>

                <div className='cart-price'>
                    <div><p>Subtotal:</p><p>${calculateSubtotal()}</p></div>
                    <Line />
                    <div><p>Tax 5%:</p><p>${(calculateTotal() - calculateSubtotal()).toFixed(2)}</p></div>
                    <Line />
                    <div><p>Total:</p><p>${calculateTotal()}</p></div>
                </div>

                <div className='Payment-method'>
                    <div>
                        <input type="radio" id="bycard" name="paymentMethod" value="By Card" onChange={handleInputChange} required />
                        <label htmlFor="bycard">Payment by Card</label>
                    </div>
                    <div>
                        <input type="radio" id="cash" name="paymentMethod" value="Cash on Delivery" onChange={handleInputChange} required />
                        <label htmlFor="cash">Cash on delivery</label>
                        {error ? <div className='Error' style={{ color: "crimson" }}>Please fill all the required fields<span>*</span></div> : null}
                    </div>
                </div>
                <button onClick={handlePlaceOrder}>Place Order</button>
                {orderSuccess?<div className='ordersuccess'>
                    <img src="../../../public/assets/Imgs/logos/success.png" alt="" />
                    <div className='successmess'>
                    <p>Woohoo!</p>
                    <p>Your order has been Placed!</p>
                    <p>Pull up a chair, sit back and relax as your order ison its way to you! </p>
                    </div>
                    <div className='actionsucess'>
                    <a href={`/MyOrder?order=${orderid}`}>View My Order</a>
                    <a href="/">Continue Shopping</a>
                    </div>
                   
                </div>:null}
                {orderSuccess && <div className="overlay"></div>}
            </div>
            <Line />
        </div>
    );
}


export default Checkout;
