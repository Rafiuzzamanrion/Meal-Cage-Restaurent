import { RiDeleteBin6Line } from "react-icons/ri";
import UseCart from "../../../Hooks/UseCart";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyCartItem = ({ item }) => {
  const { name, image, price, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = UseCart();

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you want to delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: '#1a1a1a',
      color: '#f5f5f5'
    }).then((result) => {
      if (result.isConfirmed) {
        if (user && user.email) {
          axios.delete(`${import.meta.env.VITE_API_BASE_URL}/carts/${_id}`)
            .then((data) => {
              if (data.data.deletedCount > 0) {
                refetch();
                toast.success("Item removed from cart!", { theme: "dark" });
              }
            });
        } else {
          const guestCart = JSON.parse(localStorage.getItem('guest-cart') || '[]');
          const updatedCart = guestCart.filter(item => item._id !== _id);
          localStorage.setItem('guest-cart', JSON.stringify(updatedCart));
          refetch();
          toast.success("Item removed from cart!", { theme: "dark" });
        }
      }
    });
  };

  return (
    <div className="card card-side bg-dark-800 border border-white/5 shadow-xl rounded-2xl overflow-hidden group hover:border-white/10 transition-colors duration-300"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="600">
      <figure className="shrink-0 p-4">
        <img
          style={{ borderRadius: "0 200px 200px 200px" }}
          className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 ml-2"
          src={image}
          alt={name}
        />
      </figure>
      <div className="card-body flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-8">
        <div className="grow">
          <h2 className="text-2xl font-serif text-light tracking-wide mb-2 group-hover:text-primary transition-colors">{name}</h2>
          <p className="font-sans font-bold text-primary tracking-widest text-xl">${price}</p>
        </div>
        <div className="mt-4 sm:mt-0 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-circle btn-outline border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
            title="Delete item"
          >
            <RiDeleteBin6Line size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCartItem;
