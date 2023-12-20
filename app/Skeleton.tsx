
const Skeleton = () => {
  return (
    <div className="w-52 space-y-2">
        <div className="w-full aspect-square bg-zinc-300 animate-pulse" />
        <div className="w-full rounded-xl h-5 bg-zinc-200 animate-pulse"  />
        <div className="w-10/12 h-5 rounded-xl bg-zinc-200 animate-pulse" />
    </div>
  )
}

export default Skeleton
