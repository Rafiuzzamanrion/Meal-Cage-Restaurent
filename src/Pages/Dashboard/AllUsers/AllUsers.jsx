import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FaUserShield } from "react-icons/fa";

import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Shared/Loader";

const AllUsers = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (user) => {
    Swal.fire({
      title: `Delete ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      background: '#1a1a1a',
      color: '#f5f5f5'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then((data) => {
            if (data.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${user.name} has been deleted successfully`,
                icon: "success",
                background: '#1a1a1a',
                color: '#f5f5f5'
              });
            }
          });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Grant Admin Privileges?",
      text: `Make ${user.name} an Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
      background: '#1a1a1a',
      color: '#f5f5f5'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`)
          .then((data) => {
            if (data.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: `${user.name} is now an Admin`,
                icon: "success",
                background: '#1a1a1a',
                color: '#f5f5f5'
              });
            }
          });
      }
    });
  };

  const handleAdmin = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = "admin";
    const admin = { name, email, role };

    Swal.fire({
      title: "Grant Admin Privileges?",
      text: `Make ${name} an Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
      background: '#1a1a1a',
      color: '#f5f5f5'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/new-admin", admin)
          .then((data) => {
            if (data.data.insertedId) {
              refetch();
              form.reset();
              Swal.fire({
                title: "Added!",
                text: `${name} is now an Admin`,
                icon: "success",
                background: '#1a1a1a',
                color: '#f5f5f5'
              });
            } else {
              Swal.fire({
                position: "top",
                icon: "error",
                title: `${name} is already an Admin`,
                showConfirmButton: false,
                timer: 1500,
                background: '#1a1a1a',
                color: '#f5f5f5'
              });
            }
          });
      }
    });
  };
  if (users.length === 0) {
    return <Loader />;
  }
  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-16">
      <Helmet>
        <title>MealCage | Manage Users</title>
      </Helmet>

      <div>
        <h1 className="text-3xl font-serif text-light tracking-widest text-center mt-12 mb-2 uppercase" data-aos="fade-down" data-aos-duration="600">
          Manage Users
        </h1>
        <p className="text-center font-sans text-light/60 tracking-wider mb-10" data-aos="fade-down" data-aos-duration="800">
          Total Users: <span className="text-primary font-bold">{users.length}</span>
        </p>

        <form
          onSubmit={handleAdmin}
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="800"
        >
          <div className="flex justify-center mb-16">
            <div className="w-full max-w-md bg-dark-800 border border-white/5 rounded-2xl shadow-2xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-xl font-serif text-light tracking-wide mb-6 border-b border-white/10 pb-4 text-center">Add New Admin</h3>
              <div className="form-control w-full mb-4 relative z-10">
                <label className="label">
                  <span className="label-text text-light/80 font-sans tracking-wide">Name</span>
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="Admin Name"
                  className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans w-full"
                />
              </div>
              <div className="form-control w-full mb-6 relative z-10">
                <label className="label">
                  <span className="label-text text-light/80 font-sans tracking-wide">Email</span>
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans w-full"
                />
              </div>
              <div className="flex justify-center relative z-10">
                <input
                  className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-12 uppercase w-full cursor-pointer"
                  type="submit"
                  value="Grant Access"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-2xl shadow-2xl p-6 md:p-8" data-aos="fade-up" data-aos-duration="1000">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-white/10 text-light font-serif text-lg tracking-wide">
                <th className="bg-transparent text-center">#</th>
                <th className="bg-transparent">Name</th>
                <th className="bg-transparent">Email</th>
                <th className="bg-transparent text-center">Role</th>
                <th className="bg-transparent text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-light/80 font-sans">
              {users.map((user, index) => (
                <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <th className="text-center font-normal">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <span className="badge bg-primary/20 text-primary border-primary/30 py-3 px-4 uppercase tracking-widest text-xs font-bold">Admin</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        title="Make Admin"
                        className="btn btn-sm btn-outline rounded-md border-primary text-primary hover:bg-primary hover:text-dark-900 transition-colors"
                      >
                        <FaUserShield size={18}></FaUserShield>
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(user)}
                      title="Delete User"
                      className="btn btn-circle btn-sm btn-outline border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
