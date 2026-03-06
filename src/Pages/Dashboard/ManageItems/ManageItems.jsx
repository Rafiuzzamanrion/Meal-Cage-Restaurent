import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseMenu from "../../../Hooks/UseMenu";
import ManageCard from "./ManageCard";
import Loader from "../../../Components/Shared/Loader";

const ManageItems = () => {
  const [menu] = UseMenu();

  if (!menu || menu.length === 0) {
    return <Loader />;
  }

  return (
    <div
      className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-16"
      data-aos="fade-in"
      data-aos-duration="800"
    >
      <Helmet>
        <title>MealCage | Manage Items</title>
      </Helmet>
      <SectionTitle
        heading={"Manage all items"}
        subHeading={"hurry up"}
      ></SectionTitle>

      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-serif text-light tracking-wide">
          Total Items: <span className="text-primary font-bold ml-2">{menu.length}</span>
        </h1>
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex flex-col gap-6">
          {menu.map((item) => (
            <ManageCard key={item._id} item={item}></ManageCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
