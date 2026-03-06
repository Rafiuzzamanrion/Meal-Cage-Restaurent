
import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ProductDetails from "../Pages/Menu/ProductDetails/ProductDetails";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import Contact from "../Pages/Contact/Contact";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import GiftCards from "../Pages/GiftCards/GiftCards";
import Rewards from "../Pages/Dashboard/Rewards/Rewards";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Checkout from "../Pages/Dashboard/Checkout/Checkout";
import ReservationHistory from "../Pages/Dashboard/ReservationHistory/ReservationHistory";







const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/menu',
        element: <Menu></Menu>
      },
      {
        path: '/order/:category',
        element: <Order></Order>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/food/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/gift-cards',
        element: <GiftCards></GiftCards>
      }

    ]
  },

  // ============= Dashboard layout ===============
  {
    path: 'dashboard',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [

      // ======== user routes ===========
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'myCart',
        element: <MyCart></MyCart>,

      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'checkout',
        element: <Checkout></Checkout>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'reservation',
        element: <Reservation></Reservation>
      },
      {
        path: 'reservationHistory',
        element: <ReservationHistory></ReservationHistory>
      },
      {
        path: 'rewards',
        element: <Rewards></Rewards>
      },



      // ========= admin routes ==============
      {
        path: 'adminHome',
        element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
      },
      {
        path: 'allUsers',
        element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
      },

      {
        path: 'addItem',
        element: <AdminRoutes><AddItem></AddItem></AdminRoutes>
      },
      {
        path: 'manageItems',
        element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
      },
      {
        path: 'manageBookings',
        element: <AdminRoutes><ManageBookings></ManageBookings></AdminRoutes>
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_BASE_URL}/menu/${params.id}`)
      }


    ],
  },

]);

export default router;