import { RiDeleteBin6Line } from "react-icons/ri";
import UseMenu from "../../../Hooks/UseMenu";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ManageCard = ({ item }) => {
  const { name, image, price, _id } = item;
  const [, refetch] = UseMenu();
  const [axiosSecure] = UseAxiosSecure();

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: '#1a1a1a',
      color: '#f5f5f5'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${_id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${name} has been deleted successfully`,
              icon: "success",
              background: '#1a1a1a',
              color: '#f5f5f5'
            });
          }
        });
      }
    });
  };

  return (
    <div
      className="w-full"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="600"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between bg-dark-900 border border-white/5 p-4 rounded-2xl shadow-xl hover:border-white/10 transition-colors gap-6 group">

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto text-center sm:text-left">
          <figure className="shrink-0">
            <img
              className="w-24 h-24 object-cover rounded-xl ring-1 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300"
              src={image}
              alt={name}
            />
          </figure>
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-light tracking-wide mb-1">{name}</h2>
            <p className="font-bold text-primary tracking-widest text-lg">${price}</p>
          </div>
        </div>

        <div className="shrink-0 mt-4 sm:mt-0">
          <button
            onClick={() => handleDelete(_id)}
            title="Delete Item"
            className="btn btn-circle btn-outline border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-md"
          >
            <RiDeleteBin6Line size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCard;
