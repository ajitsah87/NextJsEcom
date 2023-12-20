import React from "react";
import Products from "./components/Products";

const Home = () => {

  return (
      <div className="">
        <div className="h-80 grid place-content-center bg-zinc-800 relative">
          <h1 className="text-5xl font-bold text-white relative text-center px-8">Please Buy Everything</h1>
        </div>
        <Products />
      </div>
  )
}

export default Home;
