import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import avatar from "../../../assets/avatar2.jpg";
import { toast } from "react-toastify";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import UseCart from "../../../Hooks/UseCart";
import img from '/icon.jpg'
import UseAdmin from "../../../Hooks/UseAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ===== this is come from UseCart hook =========
  const [cart] = UseCart();
  const [isAdmin] = UseAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out!", { theme: "dark" });
        setIsMenuOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkStyle = "hover:text-primary transition-colors duration-300 block px-4 py-2 hover:bg-white/5 rounded-md";

  const renderNavItems = (isMobile = false) => (
    <>
      <li className="list-none">
        <Link to={"/"} className={navLinkStyle} onClick={closeMenu}>HOME</Link>
      </li>
      <li className="list-none">
        <Link to={"/menu"} className={navLinkStyle} onClick={closeMenu}>MENU</Link>
      </li>
      <li className="list-none">
        <Link to={"/order/salad"} className={navLinkStyle} onClick={closeMenu}>ORDER FOOD</Link>
      </li>
      <li className="list-none">
        <Link to={"/contact"} className={navLinkStyle} onClick={closeMenu}>CONTACT</Link>
      </li>
      <li className="list-none">
        <Link to={"/gift-cards"} className={navLinkStyle} onClick={closeMenu}>GIFT CARDS</Link>
      </li>

      <li className="list-none">
        {
          isAdmin ?
            <Link to={"/dashboard/adminHome"} className={navLinkStyle} onClick={closeMenu}>DASHBOARD</Link> :
            (user && <Link to={"/dashboard/userHome"} className={navLinkStyle} onClick={closeMenu}>ACCOUNT</Link>)
        }
      </li>
    </>
  );
  return (
    <>
      {/* Mobile Overlay Menu - Global Scope */}
      <div
        className={`fixed inset-0 z-[100] bg-black transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full items-center justify-start p-6 pt-24 relative overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-8 right-8 text-light/80 hover:text-primary transition-all duration-300 hover:rotate-90"
          >
            <FaTimes size={30} />
          </button>

          <div className="flex flex-col items-center w-full max-w-sm py-10">
            {/* Brand in Menu */}
            <div className="mb-12 text-center" data-aos="fade-down">
              <span className="text-primary italic font-serif text-4xl font-bold">Meal</span>
              <span className="text-light text-4xl font-serif tracking-wider uppercase opacity-90 ml-3">Cage</span>
            </div>

            <ul className="flex flex-col items-center gap-8 font-serif text-xl font-medium tracking-[0.15em] uppercase w-full">
              {renderNavItems()}
              {!user && (
                <li className="list-none mt-8 w-full text-center px-4">
                  <Link to="/login" onClick={closeMenu}>
                    <button className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest uppercase w-full py-4 text-lg">
                      LOGIN
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="navbar fixed top-0 z-50 w-full glass-effect text-light transition-all duration-300">
        <div className="navbar-start">
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="btn btn-ghost lg:hidden hover:text-primary transition-colors"
          >
            <FaBars className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link to={'/'} className="btn btn-ghost normal-case text-2xl font-serif font-bold tracking-wider hover:text-primary transition-colors flex items-center gap-3">
            <span className="text-primary italic">Meal</span> Cage
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-sans text-sm tracking-widest font-medium uppercase gap-2">
            {renderNavItems()}
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
