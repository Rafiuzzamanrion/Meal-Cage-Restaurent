import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Swal from "sweetalert2";

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
    axiosSecure.post("/create-payment-intent", {
      price
    })

      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    console.log(card);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("payment method", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError)
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${confirmError.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (paymentIntent.status === 'succeeded') {

      Swal.fire({
        position: "top",
        icon: "success",
        title: `Your payment has been received`,
        showConfirmButton: false,
        timer: 1500,
      });

      const payment = {
        email: user?.email, transactionId: paymentIntent.id,
        price,
        date: Date(),
        status: 'service pending',
        quantity: cart.length,
        itemsName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id),
        foodId: cart.map(item => item.foodId),
      }

      axiosSecure.post("/payments", payment)
        .then(res => {
          if (res.data.insertResult.insertedId) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: `payment ifo saved successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })


    }









  };

  return (
    <div className="bg-dark-800 border border-white/10 w-full p-8 md:p-12 rounded-2xl shadow-2xl shadow-black/50 transition-all"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="bg-dark-900/50 p-4 border border-white/5 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#f8fafc", // slate-50
                  fontFamily: '"Inter", sans-serif',
                  "::placeholder": {
                    color: "#94a3b8", // slate-400
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
        <div className="flex justify-end">
          <button
            className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-12 uppercase w-full md:w-auto"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Process Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
