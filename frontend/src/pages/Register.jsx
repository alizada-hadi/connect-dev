import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { register, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alerts from "../components/Alerts";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { status, user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { email, username, password, re_password: confirmPassword };
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match ");
    }
    dispatch(register(data));
  };

  useEffect(() => {
    if (user && status === "succeeded") {
      setMessage(
        "We have sent you a confirmation email. Please check your inbox "
      );
      reset();
    } else {
      setMessage("");
    }
  }, [user]);

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
                Register for free
              </h2>
              <form onSubmit={submitHandler} className="mt-10 px-10">
                {message ? <Alerts message={message} type="info" /> : ""}
                <FormInput
                  label="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@gmail.com"
                />
                <FormInput
                  label="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your Name"
                />
                <FormInput
                  label="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*************"
                />
                <FormInput
                  label="confirm password"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="*************"
                />
                <div>
                  <p className="mb-2 ml-2 dark:text-slate-200">
                    Already have an account?{" "}
                    <Link
                      to={"/signin"}
                      className="text-blue-800 ml-1 dark:text-blue-600"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
                <Button type="submit" label="Sign up" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
