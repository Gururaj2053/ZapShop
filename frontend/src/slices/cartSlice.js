import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {caritems: []};

const addDecimal = (num) => {
    return (Math.round(num*100 / 100).toFixed(2));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                state.cartItems  = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // Calcualte Item Price
            state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item)=> acc + item.price *  item.qty, 0));

            // Calcualte Item Shipping Price (If order over $100 then free else $10 shipping)
            state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

            // Calcualte Item Tax Price (15% tax)
            state.taxPrice = addDecimal(Number((state.itemsPrice*0.15).toFixed(2)));

            // Calcualte total Price
            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) + 
                Number(state.taxPrice) 
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
    }, 
});


export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;