import { ProductType } from "@/interfaces/types";
import { createSlice } from "@reduxjs/toolkit/react";
import initialProducts from "@/app/cart/initialProducts";

const ifCartExists = typeof window !== 'undefined' ? localStorage.getItem("cart") : undefined;
const cartFromLocalStorage = ifCartExists ? JSON.parse(ifCartExists) : null;


type CartType = {
    product: ProductType;
    quantity: number;
}

const initialState: {cart: CartType[]} = {
    cart: cartFromLocalStorage || initialProducts
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const alreadyInCart = state.cart.some(item => item.product.id === action.payload.product.id)
            if(!alreadyInCart) {
                state.cart.push({product: action.payload.product, quantity: action.payload.productQuantity})
            }
        },
        removeFromCart: (state, action) => {
            const index = state.cart.findIndex(item => item.product.id === action.payload)
            if(index !== -1) state.cart.splice(index, 1)
        },
        incrementQuantity: (state, action) => {
            const index = state.cart.findIndex(item => item.product.id === action.payload)
            if(index !== -1) state.cart[index].quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const index = state.cart.findIndex(item => item.product.id === action.payload)
            if(index !== -1 && state.cart[index].quantity !== 1) state.cart[index].quantity -= 1;
        },
        clearCartItems: (state) => {
            state.cart = []
        }
    }
})

export default cartSlice.reducer
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCartItems,
} = cartSlice.actions;