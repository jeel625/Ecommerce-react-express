import React,{ useState,useEffect } from "react";
import { createContext } from "react";



export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;   
    }
    return cart;
}

// We are using the ShopContextProvider because everytime we do not need to pass the props.
// And it is convinient to provide the data to all the filese.

const ShopConetextProvider = (props) => {

    const [all_product,setAll_products] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [getCustomerName,setCutomerName] = useState(" ");


    //Fetching all the data from the database
    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_products(data))
    },[])

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId] : prev[itemId]+1})) 
        
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId] : prev[itemId]-1})) 
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    }

    const getName = async () => {
        return getCustomerName;
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
 
        for(const item in cartItems)
        {
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;

        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,getName };


    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopConetextProvider;