import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import UseCart from "../../../Hooks/UseCart";


const Payment = () => {
    // todo: provide publishable key 
    const stripePromise = loadStripe(import.meta.env.VITE_payment_key)

    const [cart] = UseCart();

    // ===== easy way to addition ==========
    // ======= here 0 is initial value =========
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const price = parseFloat(total?.toFixed(2))

    return (
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-16">
            <Helmet>
                <title>MealCage | Payment</title>
            </Helmet>
            <SectionTitle heading={'Payment Center'} subHeading={'Complete your order'}></SectionTitle>

            <div className="text-center mb-10"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="600">
                <h1 className="text-2xl md:text-3xl font-serif text-light tracking-wide">
                    Total Amount To Pay: <span className="text-primary font-bold ml-2">${price}</span>
                </h1>
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;