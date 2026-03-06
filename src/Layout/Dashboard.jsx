import { Link, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUsers,
  FaStar,
  FaBox
} from "react-icons/fa";
import { GiHamburgerMenu, GiForkKnifeSpoon } from "react-icons/gi";
import { BsArrow90DegLeft } from "react-icons/bs";
import { AiFillShopping, AiFillContacts, } from "react-icons/ai";
import UseCart from "../Hooks/UseCart";
import UseAdmin from "../Hooks/UseAdmin";
import { BiSolidBook } from "react-icons/bi";
import { HiTemplate } from "react-icons/hi";

const Dashboard = () => {
  const [cart] = UseCart();
  // ========= TODO =========
  // const isAdmin = true;
  const [isAdmin] = UseAdmin();

  return (
    <div className="bg-dark-900 min-h-screen text-light font-sans" data-aos="fade-in" data-aos-duration="800">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col items-center justify-start min-h-screen p-4 md:p-8 lg:p-12 relative">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 tracking-widest uppercase lg:hidden mt-5 mb-8 align-self-start absolute top-4 left-4 z-50"
          >
            <GiHamburgerMenu size={24} className="mr-2" /> MENU
          </label>

          {/* Page content here */}
          <div className="w-full max-w-7xl mx-auto pt-16 lg:pt-0">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-6 w-80 min-h-full bg-dark-900 border-r border-white/5 text-light shadow-2xl relative">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="mb-10 text-center">
              <h2 className="text-3xl font-serif font-bold text-light tracking-widest uppercase">Meal<span className="text-primary italic">Cage</span></h2>
            </div>

            {isAdmin ? (
              <div className="space-y-2">
                <li>
                  <Link to={'/dashboard/adminHome'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <FaHome size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Admin Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={'/dashboard/addItem'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <GiForkKnifeSpoon size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Add an Item
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to={'/dashboard/manageItems'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <HiTemplate size={22} className="text-primary" />
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Manage Items
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to={'/dashboard/manageBookings'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <BiSolidBook size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Manage Bookings
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={'/dashboard/allUsers'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <FaUsers size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Manage Users
                    </span>
                  </Link>
                </li>

              </div>

              // ========= Admin end ===========

            ) : (

              // ========== user start ============

              <div className="space-y-2">
                <li>
                  <Link to={'/dashboard/userHome'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <FaHome size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      User Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="flex flex-row hover:bg-dark-800 hover:text-primary transition-colors py-3" to={"/dashboard/myCart"}>
                    <FaShoppingCart size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide flex items-center">
                      {" "}
                      My Cart
                      <span className="ml-3 bg-primary text-dark-900 px-2 py-0.5 rounded-md text-xs font-bold font-sans">
                        +{cart?.length || 0}
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={'/dashboard/paymentHistory'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <FaBox size={22} className="text-primary" />
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Order History
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={'/dashboard/reservation'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <FaCalendarAlt size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Book a Table
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={'/dashboard/reservationHistory'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <FaCalendarAlt size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      Reservation History
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={'/dashboard/rewards'} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                    <FaStar size={22} className="text-primary" />{" "}
                    <span className="font-semibold tracking-wide">
                      {" "}
                      My Rewards
                    </span>
                  </Link>
                </li>
              </div>
            )}

            <div className="divider before:bg-white/10 after:bg-white/10 my-6"></div>

            <div className="space-y-2">
              <li>
                <Link to={"/"} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                  <FaHome size={22} className="text-primary" />{" "}
                  <span className="font-semibold tracking-wide uppercase"> HOME</span>
                </Link>
              </li>
              <li>
                <Link to={"/menu"} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                  <GiHamburgerMenu size={22} className="text-primary" />{" "}
                  <span className="font-semibold tracking-wide uppercase"> MENU</span>
                </Link>
              </li>
              <li>
                <Link to={"/order/salad"} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                  <AiFillShopping size={22} className="text-primary" />{" "}
                  <span className="font-semibold tracking-wide uppercase"> ORDER FOOD</span>
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="hover:bg-dark-800 hover:text-primary transition-colors py-3">
                  <AiFillContacts size={22} className="text-primary" />{" "}
                  <span className="font-semibold tracking-wide uppercase"> CONTACT</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
