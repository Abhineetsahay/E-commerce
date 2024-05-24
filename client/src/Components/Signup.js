import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSigin.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postSigninData } from "../Redux/slice/Api";
function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setData = async (data) => {
      await dispatch(postSigninData(data));
      navigate("/");
      // window.location.reload();
  
  };
  return (
    <form className="forms" onSubmit={handleSubmit(setData)}>
      <div className="form">
        <div className="form-elements">
          <div className="form-box">
            <div className="imagediv">
              <img className="imageinlogin" src="../logo.png" alt="Logo" />
            </div>
            <div className="messages">
              <p className="welcome-message">Create Account</p>
              <h1 className="Login-message">Sign In</h1>
            </div>
            <div className="inputsandboxes">
              <div className="input-boxes">
                <div className="label-div">
                  <label htmlFor="name-input" className="label">
                    Name
                  </label>
                </div>
                <input
                  type="text"
                  className="input"
                  id="name-input"
                  name="name"
                  placeholder="Enter your Name"
                  required
                  {...register("name")}
                />
              </div>

              <div className="input-boxes">
                <div className="label-div">
                  <label htmlFor="email-input" className="label">
                    E-mail
                  </label>
                </div>
                <input
                  type="email"
                  className="input"
                  id="email-input"
                  name="email"
                  placeholder="Enter your E-mail"
                  required
                  {...register("email")}
                />
              </div>
              <div className="input-boxes">
                <div className="label-div">
                  <label htmlFor="password-input" className="label">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  className="input"
                  id="password-input"
                  name="password"
                  placeholder="Enter your Password"
                  required
                  {...register("password")}
                />
              </div>
            </div>
            <div className="login-signin">
              <button className="Login-Sigin" type="submit">
                Sign In
                <FaArrowRight />
              </button>
              <p className="Signin-Login">
                Already have an account?
                <Link className="signin" to="/Login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
