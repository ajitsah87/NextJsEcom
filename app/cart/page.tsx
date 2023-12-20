'use client'

import { useAppSelector } from "../redux/hooks";
import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "../redux/hooks";
import { clearCartItems, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/features/cartSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Image from 'next/image'
import {FaMinus, FaPlus} from 'react-icons/fa6'
import Link from 'next/link'
import { LuMoveLeft } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import AnimateComp from "../AnimateComp";
import { MotionDiv } from "../MotionElement";
import emptyCartLogo from '@/public/cart.svg'

const CartPage = () => {

    const totalProducts = useAppSelector(store => store.cartReducer.cart)
    const dispatch = useAppDispatch()
    const {setValue} = useLocalStorage('cart')

    const handleClearCart = () => {
        dispatch(clearCartItems())
        setValue([]) // also updating local storage
    }


     // handling product quantity
  const handleQuantityBtn = ({action, id}: {action: string, id: number}) => {
      if (action === "increment")
        dispatch(incrementQuantity(id))
      else dispatch(decrementQuantity(id))

      // updating localstorage for data retrieving on reload
      setValue((prev: any) => {
        const updatedCart = prev.map((item: any) => {
          if (item.product.id === id) {
            return {...item, quantity: action === "increment" ? item.quantity + 1
                  : item.quantity !== 1
                  ? item.quantity - 1
                  : 1
            }
          }
          return item;
        })
        return updatedCart
      })
  }

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id))

    // updating local storage
    setValue((prev: any) => {
        const updatedCart = prev.filter((item: any) => item.product.id !== id);
        return updatedCart;
      })
  }

  const parentVariants = {
    hidden: {},
    show: {transition: {staggerChildren: .05}}
  }

  const childrenVariants = {
    hidden: {opacity: 0, y: -30},
    show: {opacity: 1, y: 0}
  }


  return (
    <AnimateComp>
      <div className="min-h-[500px] flex flex-col w-[min(1300px,100%-2rem)] mx-auto rounded-3xl lg:p-8 p-4 bg-zinc-200 my-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2 items-center">
            <h2 className="text-3xl font-semibold">Cart</h2>
            <p className="mt-1.5">
              ({totalProducts.length}{" "}
              {totalProducts.length <= 1 ? "product" : "products"})
            </p>
          </div>
          <button
            style={{ display: totalProducts.length === 0 ? "none" : "initial" }}
            onClick={handleClearCart}
            className="py-1 pb-1.5 px-3 rounded-md outline-1 hover:bg-red-400 group transition-colors"
          >
            <span className="text-red-500 group-hover:text-white transition-colors">
              <IoClose className="inline-block" /> clear cart
            </span>
          </button>
        </div>
        <div>
          {totalProducts.length > 0 ? (
            <MotionDiv
              variants={parentVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {totalProducts.map((item) => (
                <MotionDiv
                  variants={childrenVariants}
                  className="flex justify-between items-center flex-wrap gap-5 p-3 rounded-2xl bg-white"
                  key={item.product.id}
                >
                  <Link href={`/product/${item.product.id}`}>
                    <div className="flex items-center lg:w-[500px] w-full gap-3">
                      <div className="w-28 min-w-[112px] aspect-square relative">
                        <Image
                          src={item.product.image}
                          fill
                          alt="product"
                          className="object-contain"
                        />
                      </div>
                      <div className="font-semibold">
                        <p className="text-xl line-clamp-1">
                          {item.product.title}
                        </p>
                        <p className="mt-1 hidden lg:block">
                          <span className="text-sm">
                            <FaStar className="inline-block mb-[5px] text-yellow-400" />{" "}
                            {item.product.rating.rate} /{" "}
                            {item.product.rating.count}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center w-72 text-lg">
                    <button
                      onClick={() =>
                        handleQuantityBtn({
                          action: "decrement",
                          id: item.product.id,
                        })
                      }
                      className="w-12 aspect-square rounded-full grid place-content-center bg-zinc-100 group"
                    >
                      <FaMinus className="text-xs group-hover:scale-125 transition-transform" />
                    </button>
                    <span className="w-12 aspect-square rounded-full grid place-content-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityBtn({
                          action: "increment",
                          id: item.product.id,
                        })
                      }
                      className="w-12 aspect-square rounded-full grid place-content-center outline outline-1 outline-zinc-500 -outline-offset-2 group"
                    >
                      <FaPlus className="text-xs group-hover:scale-125 transition-transform" />
                    </button>
                  </div>
                  <div className="flex items-center w-72">
                    <p className="text-lg font-semibold min-w-[50%] pl-5 lg:pl-0">
                      ${item.product.price}
                    </p>
                    <button
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      className="p-1 rounded-lg hover:bg-zinc-100 transition-colors hover:text-red-600"
                    >
                      <IoClose className="text-lg" />
                    </button>
                  </div>
                </MotionDiv>
              ))}

              <div
                style={{ marginTop: "2.5rem" }}
                className="flex justify-between lg:px-5 px-2"
              >
                <Link
                  href="/"
                  className="py-2 px-4 border-b border-black text-bg-slate-800 font-medium group flex gap-2 items-center"
                >
                  <LuMoveLeft className="group-hover:-translate-x-1 transition-transform mt-[1px]" />{" "}
                  Continue Shopping
                </Link>
                <Link href="/payment-success" className="py-2 px-4 bg-slate-800 text-white font-medium">
                  Proceed to Checkout
                </Link>
              </div>
            </MotionDiv>
          ) : (
            <div className="text-center">
              <div className="w-56 h-56 relative mx-auto">
                <Image src={emptyCartLogo} fill alt="empty-cart" className="object-cover" />
              </div>
              <p className="font-semibold text-3xl">your cart is empty</p>
              <Link className="inline-block mt-8 py-3 px-6 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium" href="/">Continue Shopping</Link>
            </div>
          )}
        </div>
      </div>
    </AnimateComp>
  )
}

export default CartPage;
