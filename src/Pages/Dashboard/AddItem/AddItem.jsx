import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_ImageUploadToken;

const AddItem = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const [axiosSecure] = UseAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    Swal.fire({
      title: "Add this item to menu?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add to menu!",
      background: '#1a1a1a',
      color: '#f5f5f5'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgResponse) => {
            if (imgResponse.success) {
              const imgURL = imgResponse.data.display_url;
              const { name, price, category, recipe } = data;
              const newItem = {
                name,
                productId: Math.random().toString(16).slice(2, 16),
                price: parseFloat(price),
                category,
                recipe,
                image: imgURL,
              };
              console.log(newItem);

              axiosSecure.post("/menu", newItem).then((data) => {
                if (data.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Added!!",
                    text: `${name} has been added to menu successfully`,
                    icon: "success",
                    background: '#1a1a1a',
                    color: '#f5f5f5'
                  });
                }
              });
            }
          });
      }
    });
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto px-4 lg:px-8 pb-16"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="600"
    >
      <Helmet>
        <title>MealCage | Add Item</title>
      </Helmet>

      <h1 className="text-3xl font-serif text-light tracking-widest text-center mt-12 mb-10 uppercase">
        Add New Item
      </h1>

      <div className="bg-dark-800 border border-white/5 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden group hover:border-white/10 transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-light/80 font-sans tracking-wide uppercase text-xs font-bold">Recipe Name</span>
              </label>
              <input
                {...register("name", { required: true, maxLength: 120 })}
                type="text"
                placeholder="Recipe name"
                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-none w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-light/80 font-sans tracking-wide uppercase text-xs font-bold">Price</span>
              </label>
              <input
                {...register("price", { required: true, maxLength: 120 })}
                type="number"
                step="0.01"
                placeholder="Price"
                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-none w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-light/80 font-sans tracking-wide uppercase text-xs font-bold">Category</span>
              </label>
              <select
                {...register("category", { required: true, maxLength: 120 })}
                defaultValue={"Pick One"}
                className="select bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-none w-full"
              >
                <option disabled>Pick One</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="salad">Salad</option>
                <option value="drinks">Drinks</option>
                <option value="dessert">Dessert</option>
                <option value="desi">Desi</option>
              </select>
            </div>
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text text-light/80 font-sans tracking-wide uppercase text-xs font-bold">Description</span>
            </label>
            <textarea
              {...register("recipe", { required: true, maxLength: 120 })}
              className="textarea bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-none h-24 w-full"
              placeholder="About item..."
            ></textarea>
          </div>

          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text text-light/80 font-sans tracking-wide uppercase text-xs font-bold">Item Image</span>
            </label>
            <input
              {...register("image", { required: true, maxLength: 120 })}
              type="file"
              className="file-input bg-dark-900/50 border-white/10 text-light/80 file:bg-primary/20 file:text-primary file:border-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-none w-full md:max-w-xs"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-12 uppercase"
              type="submit"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
