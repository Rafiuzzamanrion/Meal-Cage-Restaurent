import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Reservation = () => {
  const [axiosSecure] = UseAxiosSecure();


  const handleReserve = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const time = form.time.value;
    const name = form.name.value;
    const email = form.email.value;
    const description = form.description.value;
    const data = { date, time, name, email, description };
    console.log(data);

    Swal.fire({
      title: "Confirm Reservation?",
      text: `Book a table for ${date} at ${time}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reserve it!",
      background: '#1a1a1a',
      color: '#f5f5f5'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/reservation", data)
          .then(res => {
            if (res.data.insertedId) {
              toast.success("Table reserved successfully!", { theme: "dark" });
            }
            form.reset()
          });
      }
    });
  };
  return (
    <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 pb-16">
      <Helmet>
        <title>MealCage | Reservation</title>
      </Helmet>

      <div className="bg-dark-800 border border-white/10 shadow-2xl p-8 md:p-12 mt-12 mb-8 rounded-2xl relative overflow-hidden"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="800">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-light uppercase tracking-widest">Book A <span className="text-primary italic">Table</span></h1>
          <p className="font-sans text-light/60 mt-4 tracking-wide">Join us for an unforgettable dining experience.</p>
        </div>

        <form onSubmit={handleReserve} className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-light/80 font-sans tracking-wide">Date</span>
              </label>
              <input
                type="date"
                name="date"
                required
                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-light/80 font-sans tracking-wide">Time</span>
              </label>
              <input
                type="time"
                name="time"
                required
                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-light/80 font-sans tracking-wide">Name</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-light/80 font-sans tracking-wide">Email</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans w-full"
              />
            </div>
          </div>
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text text-light/80 font-sans tracking-wide">Special Requests</span>
            </label>
            <textarea
              name="description"
              required
              className="textarea bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans h-32 resize-none"
              placeholder="Any allergies, special occasions, or preferences?"
            ></textarea>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-12 py-3 uppercase w-full md:w-1/2"
              type="submit"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
