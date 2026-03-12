

const Restaurantcard=(props)=>{ 
    const {resData}=props; // it will also be object0
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData?.info;
    return (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 hover:shadow-xl transition-all duration-300 
              w-[95%] sm:w-[47%] md:w-[30%] lg:w-[23%] max-w-[290px] min-w-[250px]">
    <img
      src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/" + cloudinaryImageId}
      alt={name}
      className="w-full h-48 object-cover rounded-t-2xl" 
    />
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-1 truncate">{name}</h2>
      <p className="text-sm text-gray-500 truncate">{cuisines?.join(", ")}</p>

      <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
        <span>⭐ {avgRating}</span>
        <span>• {sla?.slaString}</span>
      </div>

      <div className="mt-1 text-sm text-gray-700">{costForTwo}</div>
    </div>
  </div>
);


}
export default Restaurantcard;