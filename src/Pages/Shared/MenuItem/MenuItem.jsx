import { Link } from "react-router-dom";

const MenuItem = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  return (
    <Link
      to={`/food/${_id}`}
      className="flex flex-col sm:flex-row gap-4 bg-transparent p-4 rounded-lg group hover:bg-dark-800/50 transition-colors duration-300 border border-transparent hover:border-white/5 cursor-pointer"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="600"
    >
      <figure className="shrink-0 flex justify-center sm:justify-start">
        <img
          style={{ borderRadius: "0 200px 200px 200px" }}
          className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300"
          src={image}
          alt={name}
        />
      </figure>
      <div className="flex flex-col flex-grow justify-center text-center sm:text-left">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 gap-2 sm:gap-0">
          <h2 className="text-xl font-serif text-light group-hover:text-primary transition-colors tracking-wide uppercase hover:underline">{name} <span className="hidden sm:inline-block text-white/20 mx-2 tracking-tighter">------------------</span></h2>
          <p className="text-primary font-bold tracking-widest text-lg">${price}</p>
        </div>
        <p className="text-light/60 font-sans text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
          {recipe.length < 80 ? <>{recipe}</> : <>{recipe.slice(0, 80)}...</>}
        </p>
      </div>
    </Link>
  );
};

export default MenuItem;
