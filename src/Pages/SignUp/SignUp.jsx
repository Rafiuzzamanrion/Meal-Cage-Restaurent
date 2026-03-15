import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import bg from '../../assets/others/authentication2.png'
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const SignUp = () => {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { createUser, updateUserProfile } = useContext(AuthContext)

  const handleSignUp = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photo = form.photo.value;

    // validation or pass expression
    if (!/^(?=.*[A-Z]).*$/.test(password)) {
      toast.warning("Password must have at least one Uppercase Character!", { theme: "dark" });
      return;
    }
    else if (!/^(?=.*[a-z]).*$/.test(password)) {
      toast.warning("Password must have at least one LowerCase Character!", { theme: "dark" });
      return;
    }
    else if (!/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
      toast.warning("Password must have at least one Special Symbol!", { theme: "dark" });
      return;
    }
    else if (password.length < 8) {
      toast.warning("Password must have at least 8 Character!", { theme: "dark" });
      return;
    }

    setLoading(true);
    createUser(email, password)
      .then(result => {
        const user = result.user;
        toast.success("Account created successfully!", { theme: "dark" });
        console.log(user)

        updateUserProfile(name, photo)
          .then(() => {
            // ========= posting user info to database ==========
            const saveUser = { name: name, email: email }
            fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {
                  toast.success("Profile updated and synced!", { theme: "dark" });
                  navigate('/')
                }

              })
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(error => {
        toast.error(error.message || "Email already in use or something went wrong!", { theme: "dark" });
        console.log(error)
        setLoading(false);
      })
  }
  return (

    <div className="min-h-screen bg-dark-900 pt-24 pb-12 transition-all">
      <Helmet>
        <title>MealCage | Sign up</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col md:flex-row gap-8 lg:gap-16">
          <div className="text-center md:w-1/2" data-aos="fade-right" data-aos-duration="1000">

            <img className="drop-shadow-2xl rounded-2xl" src={bg} alt="Authentication" />
          </div>
          <div className="card md:w-1/2 max-w-md bg-dark-800/80 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden" data-aos="fade-left" data-aos-duration="1000">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

            <form onSubmit={handleSignUp} className="card-body relative z-10">
              <h1 className="text-4xl font-serif font-bold text-center text-light mb-4">Sign <span className="text-primary italic">Up!</span></h1>

              {success && <div className='text-emerald-400 mt-2 text-sm text-center bg-emerald-900/20 p-2 rounded border border-emerald-500/30'>{success}</div>}
              {error && <div className='text-red-400 mt-2 text-sm text-center bg-red-900/20 p-2 rounded border border-red-500/30'>{error}</div>}

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-light/80 font-sans tracking-wide">Name</span>
                </label>
                <input type="text" name="name" placeholder="John Doe" className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans" required />
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text text-light/80 font-sans tracking-wide">Photo URL</span>
                </label>
                <input type="text" name="photo" placeholder="https://..." className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans" />
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text text-light/80 font-sans tracking-wide">Email</span>
                </label>
                <input type="email" name="email" placeholder="john@example.com" className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans" required />
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text text-light/80 font-sans tracking-wide">Password</span>
                </label>
                <input type="password" name="password" placeholder="••••••••" className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans" required />
              </div>
              <div className="form-control mt-8">
                <button
                  className={`btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 py-3 uppercase w-full ${loading ? 'btn-disabled opacity-50' : ''}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign Up"}
                </button>
              </div>

              <p className="text-center mt-4 text-light/70 font-sans text-sm">Already have an account? <Link className='text-primary font-bold hover:underline tracking-wide' to='/login'>Login</Link></p>

              <div className="divider before:bg-white/10 after:bg-white/10 text-light/50 font-sans text-sm my-6">OR</div>

              <div className="w-full flex justify-center">
                <SocialLogin></SocialLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;