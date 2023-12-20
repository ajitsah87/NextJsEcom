"use client";

import { useGetAllProductsQuery } from "@/app/redux/services/productsApi";
import Image from "next/image";
import { MotionButton, MotionDiv, MotionP } from "@/app/MotionElement";
import { LuMoveLeft } from "react-icons/lu";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimateComp from "@/app/AnimateComp";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {addToCart, decrementQuantity, incrementQuantity} from '@/app/redux/features/cartSlice'
import { ProductType } from "@/interfaces/types";
import {useState, useEffect} from 'react';
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

const Page = ({ params }: { params: { id: string } }) => {

  const [alreadyInCart, setAlreadyOnCart] = useState<Boolean>(false)
  const {value, setValue} = useLocalStorage('cart')
  const [productQuantity, setProductQuantity] = useState<number>(() => {
    const localCart = value as {product: ProductType, quantity: number}[];
    const storedProduct = localCart.find(item => item.product.id === Number(params.id))
    return storedProduct ? storedProduct.quantity : 1
  })

  const { data } = useGetAllProductsQuery(null);

  const {cart} = useAppSelector(store => store.cartReducer)
  const dispatch = useAppDispatch()

  const router = useRouter()


  // retrieving selected product to display
  const findProduct = (id: number) => {
    return data?.find((product) => product.id === id);
  }
  const product = findProduct(Number(params.id));



  // handling product quantity
  const handleQuantityBtn = (action: string) => {
    if (alreadyInCart) {
      if (action === "increment")
        dispatch(incrementQuantity(Number(params.id)));
      else dispatch(decrementQuantity(Number(params.id)));

      // updating localstorage for data retrieving on reload
      setValue((prev: any) => {
        const updatedCart = prev.map((item: any) => {
          if (item.product.id === Number(params.id)) {
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

    if (action === "increment") {
      setProductQuantity((prev) => prev + 1);
    } else {
      setProductQuantity((prev) => (prev !== 1 ? prev - 1 : prev));
    }
  }

  // adding product to cart
  const handleAddToCart = (product:ProductType) => {
    dispatch(addToCart({product, productQuantity}))

    // updating localstorage for data retrieving on reload
    setValue((prev:any) => [...prev, {product, quantity: productQuantity}])
  } 


  // animationVariants
  const animationVariants = {
    hidden: {opacity: 0, y: 50},
    show: {opacity: 1, y: 0, transition: {
      staggerChildren: .05
    }}
  }

  const childrenVariants = {
    hidden: {opacity: 0, y: 30},
    show: {opacity: 1, y: 0}
  }


  // updating variable if item already exists on cart 
  // to conditionally render button
  useEffect(()=> {
    const ifExits = cart.some(item => item.product.id === Number(params.id))
    if(ifExits) setAlreadyOnCart(true)
    else setAlreadyOnCart(false)
  }, [cart, params.id])


  return (
    <AnimateComp>
      {product ? (
        <div className="flex lg:flex-row flex-col overflow-hidden lg:h-screen">
          <div className="flex-1 grid place-content-center p-5">
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-96 aspect-square relative"
            >
              <Image
                className="object-contain"
                src={product.image}
                fill
                alt={`product ${product.id}`}
              />
            </MotionDiv>
          </div>
          <MotionDiv
            variants={animationVariants}
            initial="hidden"
            animate="show"
            className="flex-1 grid place-content-center bg-zinc-200 p-5 px-8"
          >
            <div className="w-96 max-[420px]:w-auto space-y-8">
              <MotionDiv
                className="hidden lg:block"
                variants={childrenVariants}
              >
                <button onClick={() => router.back()}
                  className="bg-zinc-300 py-2 px-6 rounded-md font-medium w-fit flex gap-2 items-center group text-sm"
                >
                  <LuMoveLeft className="group-hover:-translate-x-1 transition-transform mt-[1px]" />{" "}
                  Go Back
                </button>
              </MotionDiv>
              <div className="space-y-5">
                <MotionP
                  variants={childrenVariants}
                  className="text-2xl font-bold line-clamp-2"
                >
                  {product.title}
                </MotionP>
                <MotionP variants={childrenVariants} className="line-clamp-4">
                  {product.description}
                </MotionP>
              </div>
              <MotionDiv
                variants={childrenVariants}
                className="flex justify-between items-center gap-4"
              >
                <div className="flex text-lg">
                  <button onClick={() => handleQuantityBtn('decrement')} className="w-12 aspect-square rounded-full grid place-content-center bg-zinc-100 group">
                    <FaMinus className="text-xs group-hover:scale-125 transition-transform" />
                  </button>
                  <span className="w-12 aspect-square rounded-full grid place-content-center font-medium">
                    {productQuantity}
                  </span>
                  <button onClick={() => handleQuantityBtn('increment')} className="w-12 aspect-square rounded-full grid place-content-center outline outline-1 outline-zinc-500 -outline-offset-2 group">
                    <FaPlus className="text-xs group-hover:scale-125 transition-transform" />
                  </button>
                </div>
                <p className="font-bold text-xl mr-5 flex gap-4 flex-wrap items-center justify-center">
                  <span>${product.price}</span>
                  <span className="text-sm font-medium">
                    <FaStar className="inline-block mb-[5px] text-yellow-400" />{" "}
                    {product.rating.rate} / {product.rating.count}
                  </span>
                </p>
              </MotionDiv>
              <AnimatePresence mode="wait">
                {!alreadyInCart ? (
                  <MotionButton
                    onClick={() => handleAddToCart(product)}
                    variants={childrenVariants}
                    className="py-3 px-6 font-medium text-xs bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                  >
                    ADD TO CART
                  </MotionButton>
                ) : (
                  <MotionButton
                    variants={childrenVariants}
                    className="font-medium text-xs bg-rose-600 hover:bg-rose-700 rounded-md text-white"
                  >
                    <Link className="inline-block py-3 px-6" href="/cart">GO TO CART</Link>
                  </MotionButton>
                )}
              </AnimatePresence>
            </div>
          </MotionDiv>
        </div>
      ) : (
        <div className="h-screen grid place-content-center font-medium">Product not found!</div>
      )}
    </AnimateComp>
  );
}

export default Page;
