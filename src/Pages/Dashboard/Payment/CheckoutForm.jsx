import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { toast } from "react-toastify";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";


import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = UseAxiosSecure();


  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Payment Intent Error:", error);
          toast.error("Failed to initialize payment.", { theme: "dark" });
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message, { theme: "dark" });
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "unknown",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      toast.error(confirmError.message, { theme: "dark" });
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date().toISOString(),
        status: 'paid',
        quantity: cart.length,
        itemsName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id),
        foodId: cart.map(item => item.foodId || item.menuItemId), // Support both for safety
      }

      axiosSecure.post("/payments", payment)
        .then(res => {
          if (res.data.insertResult.insertedId) {
            toast.success('Payment succeeded and order recorded!', { theme: "dark" });
          }
        })
        .catch(err => {
          console.error("Payment Saving Error:", err);
          toast.error("Payment succeeded but failed to save order details. Please contact support.", { theme: "dark" });
        });
    }
  };

  return (
    <div className="w-full transition-all"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="800">

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
        {/* Left Column: Billing Information (Visual Mockup for Professional Look) */}
        <div className="flex-1 bg-dark-800 border border-white/5 p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-serif text-light mb-6 uppercase tracking-wider border-b border-light/10 pb-3">
            Billing Information
          </h3>

          <div className="flex flex-col gap-5">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-light/70 tracking-wide text-sm font-sans">Cardholder Name</span>
              </label>
              <div className="bg-dark-900/50 border border-white/5 py-3 px-4 rounded-lg text-light/80 font-sans">
                {user?.displayName || "Guest Customer"}
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-light/70 tracking-wide text-sm font-sans">Email Address</span>
              </label>
              <div className="bg-dark-900/50 border border-white/5 py-3 px-4 rounded-lg text-light/80 font-sans">
                {user?.email || "Not Provided"}
              </div>
            </div>

            <p className="text-xs text-light/40 mt-4 font-sans tracking-wide">
              * Billing details are securely synchronized with your account profile. By proceeding, you agree to our Terms of Service.
            </p>
          </div>
        </div>

        {/* Right Column: Payment Method */}
        <div className="flex-1 bg-dark-800 border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col">
          <h3 className="text-xl font-serif text-light mb-6 uppercase tracking-wider border-b border-light/10 pb-3">
            Payment Method
          </h3>

          <div className="bg-dark-900/80 p-5 border border-white/10 rounded-xl mb-8 shadow-inner">
            <h4 className="text-sm text-light/80 font-sans tracking-widest uppercase mb-4 opacity-70">
              Credit / Debit Card
            </h4>
            <div className="bg-dark-800 p-4 border border-white/5 rounded-lg focus-within:border-primary/50 transition-colors">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "18px",
                      color: "#f8fafc", // slate-50
                      fontFamily: '"Inter", sans-serif',
                      "::placeholder": {
                        color: "#64748b", // slate-500
                      },
                      iconColor: "#d4af37", // primary
                    },
                    invalid: {
                      color: "#ef4444", // red-500
                      iconColor: "#ef4444",
                    },
                  },
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2 opacity-60 grayscale items-center">
                <span className="text-xs text-light font-bold italic tracking-tighter">VISA</span>
                <span className="text-xs text-light font-bold italic tracking-tighter">MasterCard</span>
                <span className="text-xs text-light font-bold italic tracking-tighter">AMEX</span>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-end">
            <button
              className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-12 py-4 uppercase w-full md:w-auto h-auto min-h-0 text-lg shadow-lg hover:shadow-primary/20"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              {stripe && clientSecret ? `Pay $${price}` : "Processing..."}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
