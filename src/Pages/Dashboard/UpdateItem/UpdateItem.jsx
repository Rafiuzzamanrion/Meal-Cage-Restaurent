import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import modernSwal from "../../../api/swalConfig";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";
import Loader from "../../../Components/Shared/Loader";

const img_hosting_token = import.meta.env.VITE_ImageUploadToken;

const UpdateItem = () => {
    const item = useLoaderData();
    const { name, price, category, recipe, _id } = item;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const [axiosSecure] = UseAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const formData = new FormData();
        const hasNewImage = data.image && data.image[0];

        if (hasNewImage) {
            formData.append("image", data.image[0]);
        }

        modernSwal.fire({
            title: "Update this item?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update!",
        }).then((result) => {
            if (result.isConfirmed) {
                if (hasNewImage) {
                    fetch(img_hosting_url, {
                        method: "POST",
                        body: formData,
                    })
                        .then((res) => res.json())
                        .then((imgResponse) => {
                            if (imgResponse.success) {
                                const imgURL = imgResponse.data.display_url;
                                const { name, price, category, recipe } = data;
                                const updatedItem = {
                                    name,
                                    price: parseFloat(price),
                                    category,
                                    recipe,
                                    image: imgURL,
                                };

                                axiosSecure.patch(`/menu/${_id}`, updatedItem).then((res) => {
                                    if (res.data.modifiedCount > 0 || res.data._id) {
                                        toast.success(`${name} updated successfully!`, { theme: "dark" });
                                        navigate('/dashboard/manageItems');
                                    }
                                });
                            }
                        });
                } else {
                    const { name, price, category, recipe } = data;
                    const updatedItem = {
                        name,
                        price: parseFloat(price),
                        category,
                        recipe,
                    };
                    axiosSecure.patch(`/menu/${_id}`, updatedItem).then((res) => {
                        if (res.data.modifiedCount > 0 || res.data._id) {
                            toast.success(`${name} updated successfully!`, { theme: "dark" });
                            navigate('/dashboard/manageItems');
                        }
                    });
                }
            }
        });
    };

    if (!item) return <Loader />;

    return (
        <div
            className="w-full max-w-4xl mx-auto px-4 lg:px-8 pb-16"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="600"
        >
            <Helmet>
                <title>MealCage | Update Item</title>
            </Helmet>

            <h1 className="text-3xl font-serif text-light tracking-widest text-center mt-12 mb-10 uppercase">
                Update Item
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
                                defaultValue={name}
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
                                defaultValue={price}
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
                                defaultValue={category}
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
                            defaultValue={recipe}
                            className="textarea bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-none h-24 w-full"
                            placeholder="About item..."
                        ></textarea>
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text text-light/80 font-sans tracking-wide uppercase text-xs font-bold">Item Image (Optional)</span>
                        </label>
                        <input
                            {...register("image", { required: false, maxLength: 120 })}
                            type="file"
                            className="file-input bg-dark-900/50 border-white/10 text-light/80 file:bg-primary/20 file:text-primary file:border-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-none w-full md:max-w-xs"
                        />
                    </div>

                    <div className="flex justify-center mt-8 gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="btn btn-outline rounded-none border-white/20 text-light/60 hover:bg-white/10 hover:text-light font-sans tracking-widest transition-all duration-300 px-12 uppercase"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-12 uppercase"
                            type="submit"
                        >
                            Update Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
