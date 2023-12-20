"use client";

import { ProductType } from "@/interfaces/types";
import { useGetAllProductsQuery } from "../redux/services/productsApi";
import ProductCard from "./ProductCard";
import AnimateComp from "../AnimateComp";
import Skeleton from "../Skeleton";

const Products = () => {
  const { data, isLoading, error } = useGetAllProductsQuery(null);

  if (isLoading) return (
    <div className="flex gap-10 justify-center flex-wrap w-[min(1300px,100%-2rem)] mx-auto mt-10">
    {Array.from({length: 20}).map((_,i) => <Skeleton key={i} />)}  
    </div>
  ) 

  if (error) return <pre className="text-center mt-10 font-semibold">{JSON.stringify(error)}</pre>

  return (
    <AnimateComp>
      <div className="flex gap-10 justify-center flex-wrap w-[min(1300px,100%-2rem)] mx-auto my-10">
        {data &&
          data.map((product: ProductType, index: number) => (
            <ProductCard key={index} id={product.id} product={product} />
          ))}
      </div>
    </AnimateComp>
  )
}

export default Products;
