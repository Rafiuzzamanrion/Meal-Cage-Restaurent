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

        <div className="navbar-end gap-4 pr-4">
          {/* Cart Dropdown - Public */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle hover:text-primary transition-colors duration-300 relative group">
              <div className="indicator">
                <FaShoppingCart size={22} />
                <span className="badge badge-sm indicator-item bg-primary text-dark-900 border-none font-bold shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                  {cart?.length || 0}
                </span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-dark-800 border border-white/10 shadow-2xl backdrop-blur-md">
              <div className="card-body p-4">
                <span className="font-serif font-bold text-lg text-primary">{cart?.length || 0} Items</span>
                <div className="max-h-60 overflow-y-auto my-2 border-y border-white/5 py-2">
                  {cart.length > 0 ? (
                    cart.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-none">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium text-light truncate">{item.name}</p>
                          <p className="text-xs text-primary font-bold">${item.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-center text-light/50 py-4 font-sans">Your cart is empty</p>
                  )}
                  {cart.length > 5 && (
                    <p className="text-[10px] text-center text-primary/70 mt-1 uppercase tracking-widest">+ {cart.length - 5} more items</p>
                  )}
                </div>
                <div className="card-actions mt-2">
                  <Link to="/cart" className="w-full">
                    <button className="btn btn-outline btn-sm rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 w-full font-sans tracking-widest font-bold uppercase transition-all duration-300">View Full Cart</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {user ? (
            <>
              <div className="avatar">
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 transition-transform hover:scale-105">
                  <img src={avatar} alt="User Avatar" />
                </div>
              </div>

              <button
                onClick={handleLogOut}
                className="btn btn-sm btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 uppercase"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 uppercase">
                LOGIN
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
