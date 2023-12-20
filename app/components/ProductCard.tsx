import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { ProductType } from "@/interfaces/types";
import { MotionDiv } from "../MotionElement";

type PropsType = {
  id: number
  product: ProductType
}

const ProductCard = ({ id, product }: PropsType) => {
  return (
    <div className="w-52">
      <Link href={`/product/${id}`}>
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", duration: .2, stiffness: 100 }}
          whileTap={{ scale: 1, transition: {duration: .1} }}
          className="w-full aspect-square relative bg-white"
        >
          <Image src={product.image} fill alt="" className="object-contain" />
        </MotionDiv>
      </Link>
      <div>
        <p className="line-clamp-1">{product.title}</p>
        <div className="flex gap-3 items-center">
          <p className="text-lg font-semibold">
            <span className="text-green-500">$</span>
            {product.price}
          </p>
          <span className="text-sm font-medium">
            <FaStar className="inline-block mb-[5px] text-yellow-400" />{" "}
            {product.rating.rate} / {product.rating.count}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
