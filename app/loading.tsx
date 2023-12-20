import AnimateComp from "./AnimateComp";

const loading = () => {
  return (
    <AnimateComp>
      <div className="h-screen grid place-content-center">
        <div className="lds-spinner mx-auto">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>Loading..</h1>
      </div>
    </AnimateComp>
  )
}

export default loading;
