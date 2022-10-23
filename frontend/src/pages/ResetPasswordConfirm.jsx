import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { change_password } from "../features/auth/authSlice";
import { useParams, Link } from "react-router-dom";
import Alerts from "../components/Alerts";

const ResetPasswordConfirm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [new_password, setNew_password] = useState("");
  const [re_new_password, setRe_new_password] = useState("");
  const [message, setMessage] = useState("");
  const { status } = useSelector((state) => state.auth);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      uid: params.uid,
      token: params.token,
      new_password,
      re_new_password,
    };
    dispatch(change_password(data));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setMessage("Your password changed successfully ");
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
                Create new password
              </h2>

              <p className="my-2">
                {message ? <Alerts message={message} type="info" /> : ""}
              </p>

              <form onSubmit={submitHandler} className="mt-10 mx-10">
                <FormInput
                  label="new password"
                  type="password"
                  name="new_password"
                  value={new_password}
                  onChange={(e) => setNew_password(e.target.value)}
                  placeholder="********"
                />
                <FormInput
                  label="re-type password"
                  type="password"
                  name="re_new_password"
                  value={re_new_password}
                  onChange={(e) => setRe_new_password(e.target.value)}
                  placeholder="********"
                />
                {status === "loading" ? (
                  <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Processing...
                  </button>
                ) : status === "succeeded" ? (
                  <Link
                    to={"/signin"}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Back to sign in page
                  </Link>
                ) : (
                  <Button type="submit" label="Change Password" />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
