import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.warning('Please enter a valid email address.', { theme: "dark" });
      return;
    }
    setSubscribing(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/newsletter/subscribe`, { email });
      toast.success("You're now on the VIP list!", { theme: "dark" });
      setEmail('');
    } catch (err) {
      const msg = err.response?.status === 409 ? 'This email is already subscribed.' : err.message;
      toast.info(msg, { theme: "dark" });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="mt-20 border-t border-white/10"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="800">
      <div className="footer p-12 bg-dark-900 text-light/80 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <aside className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-primary italic text-3xl font-bold font-serif">Meal</span>
            <span className="text-3xl font-bold font-serif tracking-wider text-light">Cage</span>
          </div>
          <p className="font-sans font-light tracking-wide max-w-xs text-center md:text-left">
            Providing an unforgettable culinary experience with premium quality foods since 1992.
          </p>
        </aside>

        <nav className="font-sans tracking-wide w-full flex flex-col items-center md:items-start text-center md:text-left">
          <header className="footer-title text-primary font-serif text-xl mb-4 opacity-100 uppercase tracking-widest">Newsletter</header>
          <p className="mb-4 text-light/70 font-light max-w-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form onSubmit={handleSubscribe} className="relative w-full max-w-xs group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input bg-dark-800 border-white/10 text-light w-full pr-12 rounded-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="absolute top-0 right-0 h-full px-4 text-primary hover:text-light transition-colors flex items-center justify-center"
            >
              {subscribing ? <span className="loading loading-spinner loading-xs" /> : <FaPaperPlane />}
            </button>
          </form>
        </nav>

        <nav className="font-sans tracking-wide flex flex-col items-center lg:items-end w-full">
          <header className="footer-title text-primary font-serif text-xl normal-case mb-4 opacity-100">Social Connections</header>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors cursor-pointer transform hover:scale-110 duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a className="hover:text-primary transition-colors cursor-pointer transform hover:scale-110 duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a className="hover:text-primary transition-colors cursor-pointer transform hover:scale-110 duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </nav>
      </div>
      <div className="footer footer-center p-6 bg-dark-800 text-light/60 text-sm font-sans tracking-widest border-t border-white/5">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Meal Cage Restaurant Ltd.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;