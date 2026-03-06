import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate, Link } from "react-router-dom";
import UseCart from "../../Hooks/UseCart";
import { toast } from "react-toastify";

import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const FoodCard = ({ item }) => {
  const { name, image, recipe, price, _id, category } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation();
  const [, refetch] = UseCart();
  const [axiosSecure] = UseAxiosSecure();

  const handleAddToCart = item => {
    if (user && user.email) {
      const cartItem = { foodId: _id, name, image, price, email: user.email, category: category }
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          if (res.data._id || res.data.insertedId) {
            refetch();
            toast.success("Added to cart!", { theme: "dark" });
          }
        })
    }
    else {
      Swal.fire({
        title: 'Please log in first to order !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d4af37',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log in now'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } })
        }
      })
    }

  }
  return (
    <div className="h-full"
      data-aos="zoom-in"
      data-aos-easing="linear"
      data-aos-duration="600">
      <div className="flex flex-col h-full bg-dark-800 border border-white/5 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden group hover:border-white/10 transition-colors duration-300">
        <Link to={`/food/${_id}`} className="relative h-64 overflow-hidden block">
          <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={image} alt={name} />
          <div className="absolute top-4 right-4 bg-dark-900/90 text-primary px-4 py-2 rounded-full font-sans font-bold tracking-widest backdrop-blur-md shadow-lg border border-primary/20">
            ${price}
          </div>
        </Link>

        <div className="flex flex-col flex-grow p-6 md:p-8">
          <Link to={`/food/${_id}`}>
            <h2 className="text-2xl font-serif text-light mb-3 group-hover:text-primary transition-colors hover:underline">{name}</h2>
          </Link>
          <p className="font-sans text-light/60 text-sm leading-relaxed tracking-wide flex-grow mb-8">{recipe}</p>

          <div className="mt-auto">
            <button onClick={() => handleAddToCart(item)} className="w-full btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest font-bold uppercase transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;