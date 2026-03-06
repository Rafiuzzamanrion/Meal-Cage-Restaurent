import FoodCard from "../../../Components/Card/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import NoData from "../../../Components/Shared/NoData";


const OrderTab = ({ items }) => {
    if (!items || items.length === 0) {
        return <NoData heading="Nothing here yet" text="Check back soon for delicious new items in this category!" />;
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {
                    items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default OrderTab;