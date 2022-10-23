import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { login, get_user } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, status, error, access } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(login(data));
  };
  useEffect(() => {
    if (error) {
      toast.error("Invalid email or password ");
    }
  }, [error]);
  useEffect(() => {
    if (user && status === "succeeded") {
      toast.success("Logged in");
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const token = access ? access?.access : "";
    const data = { token };
    if (access) {
      dispatch(get_user(data));
    }
  }, [access, dispatch]);

  return status === "loading" ? (
    <Spinner />
  ) : (
    <div className="flex w-full items-center justify-around flex-col md:flex-row bg-zinc-50 dark:bg-gray-800 ">
      <div className="w-full h-screen dark:bg-gray-800">
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div></div>
          <div className="mt-12 lg:mx-32 ">
            <div className="bg-white w-full mt-12 rounded-lg shadow-md p-12 dark:bg-slate-700">
              <h2 className="text-3xl ml-10 font-semibold capitalize text-slate-700 dark:text-slate-200">
                Welcome back
              </h2>

              <form onSubmit={submitHandler} className="mt-10 mx-10">
                <FormInput
                  label="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@gmail.com"
                />

                <FormInput
                  label="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*************"
                />
                <div className="flex justify-between flex-wrap">
                  <div className="mb-2 ml-3 text-sm text-blue-800 dark:text-blue-500">
                    <Link to="/reset-password">Forgot password?</Link>
                  </div>
                  <div>
                    <p className="mb-2 text-sm dark:text-slate-200">
                      Don't have an account?{" "}
                      <Link
                        to={"/signup"}
                        className="text-blue-800 dark:text-blue-500"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
                <Button type="submit" label="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
