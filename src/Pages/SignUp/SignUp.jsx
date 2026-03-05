import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import bg from '../../assets/others/authentication2.png'
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const SignUp = () => {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const { createUser, updateUserProfile } = useContext(AuthContext)

  // -----------------alert----------------------

  const alertSuccess = <div className="alert alert-success">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>You have successfully created an account !!</span>
  </div>;
  const alertError1 = <div className="alert alert-warning">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: Password must have at least one Uppercase Character !</span>
  </div>
  const alertError2 = <div className="alert alert-warning">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: Password must have at least one LowerCase Character !</span>
  </div>
  const alertError3 = <div className="alert alert-warning">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: Password must have at least one Special Symbol !</span>
  </div>
  const alertError4 = <div className="alert alert-warning">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: Password must have at least 8 Character !</span>
  </div>
  const alertError5 = <div className="alert alert-warning">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: The email already in use !!</span>
  </div>

  const handleSignUp = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photo = form.photo.value;
    console.log(email, password)

    // validation or pass expression
    if (!/^(?=.*[A-Z]).*$/.test(password)) {
      setError(alertError1)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
      setSuccess('')

      return;
    }
    else if (!/^(?=.*[a-z]).*$/.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
      setError(alertError2)
      setSuccess('')
      return;
    }
    else if (!/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
      setError(alertError3)
      setSuccess('')
      return;

    }
    else if (!password.length >= 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
      setError(alertError4)
      setSuccess('')
      return;
    }



    createUser(email, password)
      .then(result => {
        const user = result.user;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'You have successfully Created an account',
          showConfirmButton: false,
          timer: 1500
        })
        setSuccess(alertSuccess)
        setError('')
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
                  Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'You have successfully created an account !!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setSuccess(alertSuccess)
                  setError('')
                  navigate('/')
                  // ========= end of posting ===========
                }

              })



          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        setError(alertError5)
        setSuccess('')
        console.log(error)
      })

  }
  return (

    <div className="min-h-screen bg-dark-900 pb-12 transition-all">
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
                <input className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 py-3 uppercase w-full cursor-pointer" type="submit" value="Sign Up" />
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