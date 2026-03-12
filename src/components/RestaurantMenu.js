// import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useState,useEffect}  from 'react';
import usemenuInfo from './usemenuInfo';
import RestaurantCategory from './RestaurantCategory';
import data10892 from '../../public/mockEachResMenu/10892.json';
import data17301 from '../../public/mockEachResMenu/17301.json';
import data77949 from '../../public/mockEachResMenu/77949.json';

import data364221 from '../../public/mockEachResMenu/364221.json';
import data426730 from '../../public/mockEachResMenu/426730.json';
import data435405 from '../../public/mockEachResMenu/435405.json';
import data457522 from '../../public/mockEachResMenu/457522.json';
import data822315 from '../../public/mockEachResMenu/822315.json';
const dataMap = {
  10892: data10892,
  17301: data17301,
  77949: data77949,
  364221: data364221,
  426730: data426730,
  435405: data435405,
  457522: data457522,
  822315: data822315
};

const RestaurantMenu = ()=>{
    
    // const menuInfo=usemenuInfo(resId);

    const { resId } = useParams();
    const [menuInfo, setmenuInfo] = useState(null);
    const [showIndex, setshowIndex] = useState(null);

    useEffect(() => {
      const data = dataMap[+resId];
      if (data) {
        setmenuInfo(data);

      } else {
        console.error(`No data found for resId ${resId}`);
      }
    }, [resId]);

  // Safely extract restaurantInfo and menu
    const restaurantInfo = menuInfo?.data?.cards?.[2]?.card?.card?.info;
    const menu = menuInfo?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card;





    if (!menuInfo?.data || !restaurantInfo || !menu) return <h1>Loading...</h1>;


            const categories = menuInfo?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
            (c) => {
              const type = c.card?.card?.["@type"];
              return (
                type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
                type === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
              );
            }
          );
            return (
                <div className="text-center">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                            {restaurantInfo?.name}
                        </h1>

                        <p className="text-lg text-gray-600 font-medium mb-1">
                            {restaurantInfo?.cuisines?.join(", ")}
                        </p>


                    <div className="flex justify-center gap-6 mt-2 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                        ⭐ <span className="font-semibold">{restaurantInfo?.avgRating}</span>
                        </div>
                        <div>|</div>
                        <div className="flex items-center gap-1">
                        ⏱️ <span>{restaurantInfo?.sla?.slaString}</span>
                        </div>
                        <div>|</div>
                        <div className="flex items-center gap-1">
                        💰 <span>{restaurantInfo?.costForTwoMessage}</span>
                        </div>
                    </div>
                    </div>


                    {categories.map((category, index) => (
                        <RestaurantCategory key={index} data={category.card.card} showItems={index==showIndex?true:false} setshowIndex={()=>setshowIndex(index === showIndex ? null : index)}/>
                    ))}
                </div>

    )
}
export default RestaurantMenu;