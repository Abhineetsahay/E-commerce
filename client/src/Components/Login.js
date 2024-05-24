import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSigin.css'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postLoginData } from '../Redux/slice/Loginslice';
import toast from 'react-hot-toast';
function Login(){
          const {register,handleSubmit}=useForm();
          const dispatch=useDispatch();
          const navigate=useNavigate();
          const setData=async(data)=>{
                    const result= await dispatch(postLoginData(data));
                    const {payload}=result;
                     if (payload.success===false) {
                        toast.error("Incorrect password");
                     }
                    else{
                         navigate("/")
                         toast.success("Login suceesfully")
                    }
          }
          return(
                   <form className='forms' onSubmit={handleSubmit(setData)}>
                          <div className='form'>
                              <div className='form-elements-Login'>
                                        <div className='form-box'>
                                        <div className='imagediv'><img className="imageinlogin" src="../logo.png" alt="Logo" /></div>
                                        <div className='messages'>
                                                  <p className='welcome-message'>Welcome Back !!!</p>
                                                  <h1 className='Login-message'>Login</h1>
                                        </div>
                                        <div className='inputsandboxes'>
                                       
                                        <div className='input-boxes'>
                                                  <div className='label-div'>
                                                  <label htmlFor="email-input" className='label'>E-mail</label>
                                                  </div>
                                                  <input type="email" className='input' id="email-input" name='email' placeholder='Enter your E-mail' required {...register("email")}/>
                                        </div>
                                        <div className='input-boxes'>
                                                  <div className='label-div'>
                                                  <label htmlFor="password-input" className='label'>Password</label>
                                                  </div>
                                                  <input type="password" className='input' id="password-input" name='password' placeholder='Enter your Password' required {...register("password")}/>
                                        </div>
                                        </div>
                                        <div className='login-signin'>
                                                  <button className='Login-Sigin' type='submit'>Login<FaArrowRight/></button>
                                                  <button className='Signin-Login'>I don't have account? <Link className='signin' to='/Signup'>Sign up</Link></button>
                                        </div>

                                        </div>
                                        
                              </div>
                          </div>
                   </form>
          )

}
export default Login;