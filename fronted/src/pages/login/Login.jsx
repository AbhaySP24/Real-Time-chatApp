import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink,useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginUserThunk } from "../../store/slice/user/user.thunk";


const Login = () => {

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const {isAuthenticated, screenLoading} = useSelector((state)=>state.userReducer);
 const [loginData, setLoginData] = useState({
  email: "",
  password: "",
 });

//  input change handler
 const changeHandler = (e) => {
  setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };

//  handle login form submit
const submitHandler = async (e) => {
  e.preventDefault();
  const response=await dispatch(loginUserThunk(loginData));
  if(response?.payload?.success) {
    navigate("/");
  }
 };

 useEffect(()=>{
    console.log(isAuthenticated);
    if(isAuthenticated){
        navigate("/");
    }
 },[isAuthenticated])


  return (
    <div className="bg-[url(https://imgs.search.brave.com/aTowHF2UjyIb5NYINK7CLv8iCk4PRv7V8tJI1qqlcGg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYW1r/ZWRlbS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTYvMTEv/bG9naW4tYmctMzAw/eDE4OC5qcGc)] bg-no-repeat h-screen w-[100vw] bg-cover">
      {/* Login Form */}
      <div className="w-[450px]  bg-transparent absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-5 rounded-lg  py-10 px-5  border backdrop-blur-xl border-gray-300">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4  w-full px-2 py-4  "
        >
          <div className="relative ">
            <FaUser className="absolute left-4 top-[50%] translate-y-[-50%]" />
            <input
              type="text" name='email' value={loginData.email} onChange={changeHandler}
              placeholder="Enter Your Email here..."
              className="bg-transparent border border-gray-300 focus:outline-none
                    focus:border-0 focus:ring-2 focus:ring-blue-500 w-full pl-10 py-4 p-4 rounded-4xl"
            />
          </div>

          <div className="relative">
            <RiLockPasswordFill className="absolute left-4 top-[50%] translate-y-[-50%]" />
            <input
              type="password" name='password' value={loginData.password} onChange={changeHandler}
                placeholder="Enter Your Password here..." className="bg-transparent border border-gray-300 focus:outline-none focus:border-0 focus:ring-2 focus:ring-blue-500 w-full pl-10 py-4 p-4 rounded-4xl"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-4xl hover:bg-blue-600 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
