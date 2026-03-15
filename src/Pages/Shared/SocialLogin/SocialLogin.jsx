import { useContext } from 'react';
import google from '/google.png'
import { AuthContext } from '../../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SocialLogin = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(result => {
        const loggedInUser = result.user;

        const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
        console.log(saveUser)
        fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(saveUser)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              toast.success('Successfully created an account!', { theme: "dark" });
              navigate(from, { replace: true });
            }
            else {

              toast.success('Successfully logged in!', { theme: "dark" });
              navigate(from, { replace: true });
            }
            // ========= end of posting ===========


          })
      })
      .catch(error => {
        console.log(error.message)

      })
  }
  return (
    <div>
      <div>
        <div className="text-center my-3">OR</div>
        <div className="text-center"><button onClick={handleGoogleLogin} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-dark-900 transition-all duration-300 rounded-none px-8"> <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={google} />
          </div>
        </div></button></div>
      </div>
    </div>
  );
};

export default SocialLogin;