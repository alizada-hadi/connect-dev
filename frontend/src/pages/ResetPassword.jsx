import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { reset_password } from "../features/auth/authSlice";
import Alerts from "../components/Alerts";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { status, error } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(reset_password({ email }));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setMessage("Check your inbox ");
    } else {
      setMessage("");
    }
  }, [status]);

  return (
    <div className="flex w-full items-center justify-around flex-col md:flex-row bg-zinc-50 dark:bg-gray-800 ">
      <div className="w-full h-screen dark:bg-gray-800">
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div></div>
          <div className="mt-12 lg:mx-32 ">
            <div className="bg-white w-full mt-12 rounded-lg shadow-md p-12 dark:bg-slate-700">
              <h2 className="text-3xl ml-10 font-semibold capitalize text-slate-700 dark:text-slate-200">
                Reset Password
              </h2>
              <div className="my-2">
                {message ? <Alerts type="info" message={message} /> : ""}
              </div>
              <form onSubmit={submitHandler} className="mt-10 mx-10">
                <FormInput
                  label="reset password"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@gmail.com"
                />

                {status === "loading" ? (
                  <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Processing...
                  </button>
                ) : (
                  <Button type="submit" label="Reset" />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
