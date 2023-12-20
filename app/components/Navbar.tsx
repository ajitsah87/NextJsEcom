"use client";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useAppSelector } from "../redux/hooks";
import { MotionSpan } from "../MotionElement";
import Link from "next/link";
import {useState, useEffect} from 'react'

const Navbar = () => {
  const [isClient, setIsClient] = useState(false)
  const productCount = useAppSelector((store) => store.cartReducer.cart.length);

  useEffect(() => setIsClient(true), [])

  return (
      <div className="fixed top-0 right-0 z-50 bg-white shadow-md">
        <div className="flex justify-between items-center py-3 px-5">
          <button className="relative">
            <Link href="/cart">
              <PiShoppingCartSimple className="text-3xl" />
              {isClient && productCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 aspect-square rounded-full bg-red-500 text-white font-medium grid place-content-center text-sm">
                  <MotionSpan
                    key={productCount}
                    initial={{ opacity: 0.5, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {productCount}
                  </MotionSpan>
                </div>
              )}
            </Link>
          </button>
        </div>
      </div>
  )
}

export default Navbar;
