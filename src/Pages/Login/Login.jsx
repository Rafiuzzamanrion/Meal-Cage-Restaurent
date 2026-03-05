import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import bg from '../../assets/others/authentication2.png'
import SocialLogin from "../Shared/SocialLogin/SocialLogin";





const Login = () => {


  const { logInUser } = useContext(AuthContext)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/'



  const alertSuccess = <div className="alert alert-success">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>You have successfully Logged In !!</span>
  </div>;

  const handleLogin = event => {

    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    logInUser(email, password)
      .then(result => {

        const user = result.user;
        setSuccess(alertSuccess);
        setError(' ')
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'You have successfully Logged in',
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });

        console.log(user)
      })
      .catch(error => {
        setError(<div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Wrong! You have entered a wrong password</span>
        </div>)

        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Your password is wrong',
          showConfirmButton: false,
          timer: 1500
        })
        setSuccess('')
        console.log(error)
      })
  }
  return (
    <div>
      <Helmet>
        <title>MealCage | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-dark-900">
        <div className="hero-content flex-col md:flex-row gap-8 lg:gap-16">
          <div className="text-center md:w-1/2" data-aos="fade-right" data-aos-duration="1000">

            <img className="drop-shadow-2xl rounded-2xl" src={bg} alt="Authentication" />
          </div>
          <div className="card md:w-1/2 max-w-sm bg-dark-800/80 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden" data-aos="fade-left" data-aos-duration="1000">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

            <form onSubmit={handleLogin} className="card-body relative z-10">
              <h1 className="text-4xl font-serif font-bold text-center text-light mb-4">Login <span className="text-primary italic">now!</span></h1>

              {error && <div className='text-red-400 mt-2 text-sm text-center bg-red-900/20 p-2 rounded border border-red-500/30'>{error}</div>}
              {success && <div className='text-emerald-400 mt-2 text-sm text-center bg-emerald-900/20 p-2 rounded border border-emerald-500/30'>{success}</div>}

              <div className="form-control">
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
                <label className="label mt-1">
                  <a href="#" className="label-text-alt text-light/60 hover:text-primary transition-colors font-sans tracking-wide">Forgot password?</a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 py-3 uppercase w-full cursor-pointer" type="submit" value="Sign In" />
              </div>

              <p className="text-center mt-4 text-light/70 font-sans text-sm">New to MealCage? <Link className='text-primary font-bold hover:underline tracking-wide' to='/signup'>Create Account</Link></p>

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

export default Login;