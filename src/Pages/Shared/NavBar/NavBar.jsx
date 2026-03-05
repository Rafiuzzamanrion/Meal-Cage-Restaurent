import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import avatar from "../../../assets/avatar2.jpg";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import UseCart from "../../../Hooks/UseCart";
import img from '/icon.jpg'
import UseAdmin from "../../../Hooks/UseAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  // ===== this is come from UseCart hook =========
  const [cart] = UseCart();
  const [isAdmin] = UseAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "You have successfully Logged out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinkStyle = "hover:text-primary transition-colors duration-300 block px-4 py-2 hover:bg-white/5 rounded-md";

  const navItem = (
    <>
      <li className="list-none">
        <Link to={"/"} className={navLinkStyle}>HOME</Link>
      </li>
      <li className="list-none">
        <Link to={"/menu"} className={navLinkStyle}>MENU</Link>
      </li>
      <li className="list-none">
        <Link to={"/order/salad"} className={navLinkStyle}>ORDER FOOD</Link>
      </li>
      <li className="list-none">
        <Link to={"/contact"} className={navLinkStyle}>CONTACT</Link>
      </li>
      <li className="list-none">
        <Link to={"/gift-cards"} className={navLinkStyle}>GIFT CARDS</Link>
      </li>
      {!user && (
        <li className="list-none">
          <Link to={"/login"} className={navLinkStyle}>LOGIN</Link>
        </li>
      )}
      <li className="list-none">
        {
          isAdmin ? <Link to={"/dashboard/adminHome"} className={navLinkStyle}>DASHBOARD</Link> : (user && <Link to={"/dashboard/userHome"} className={navLinkStyle}>ACCOUNT</Link>)
        }
      </li>
    </>
  );
  return (
    <>
      <div className="navbar fixed top-0 z-50 w-full glass-effect text-light transition-all duration-300">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden hover:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-dark-900/95 backdrop-blur-lg border border-white/10 rounded-box w-52 font-serif text-lg font-medium"
            >
              {navItem}
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost normal-case text-2xl font-serif font-bold tracking-wider hover:text-primary transition-colors flex items-center gap-3">
            {/* Replace with a classier logo if available, or style the text nicely */}
            <span className="text-primary italic">Meal</span> Cage
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-sans text-sm tracking-widest font-medium uppercase gap-2">
            {/* Adding hover effects to links inside navItem requires modifying navItem definition, 
                but we can apply global styling here or update navItem manually below. */}
            {navItem}
          </ul>
        </div>

        {user ?

          <div className="navbar-end gap-4 pr-4">
            <div className="flex items-center gap-4">
              {isAdmin ?
                <Link className="flex items-center hover:text-primary transition-colors duration-300 relative group" to={"/dashboard/adminHome"}>
                  <FaShoppingCart size={22} />
                  <span className="absolute -top-2 -right-3 bg-primary text-dark-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-transform group-hover:scale-110">
                    {cart?.length || 0}
                  </span>
                </Link>
                :
                <Link className="flex items-center hover:text-primary transition-colors duration-300 relative group" to={"/dashboard/myCart"}>
                  <FaShoppingCart size={22} />
                  <span className="absolute -top-2 -right-3 bg-primary text-dark-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-transform group-hover:scale-110">
                    {cart?.length || 0}
                  </span>
                </Link>
              }
            </div>

            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 transition-transform hover:scale-105">
                <img src={avatar} alt="User Avatar" />
              </div>
            </div>

            <button
              onClick={handleLogOut}
              className="btn btn-sm btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300"
            >
              LOGOUT
            </button>

          </div>
          :
          <div className="navbar-end pr-4">
            <Link to="/login">
              <button className="btn btn-sm btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300">
                LOGIN
              </button>
            </Link>
          </div>

        }
      </div>
    </>
  );
};

export default NavBar;
