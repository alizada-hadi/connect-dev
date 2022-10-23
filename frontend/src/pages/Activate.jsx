import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activate } from "../features/auth/authSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import Alerts from "../components/Alerts";

const Activate = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [message, setMessage] = useState("");
  const { status, error } = useSelector((state) => state.auth);

  const activateHandler = () => {
    const data = { uid: params.uid, token: params.token };
    dispatch(activate(data));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setMessage("Your account successfully activated ");
    }
  }, [status]);

  return (
    <div className="flex w-full items-center justify-around flex-col md:flex-row bg-zinc-50 dark:bg-gray-800 ">
      <div className="w-full h-screen dark:bg-gray-800">
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div></div>
          <div className="mt-12 lg:mx-32 ">
            <div className="bg-white w-full mt-12 rounded-lg shadow-md p-12 dark:bg-slate-700">
              <h2 className="text-3xl ml-1 font-semibold capitalize text-slate-700 dark:text-slate-200">
                Activate Account
              </h2>
              {message ? <Alerts message={message} type="info" /> : ""}
              <button
                className="px-4 py-2 mt-4 bg-blue-800 text-white text-xl hover:bg-white hover:text-blue-800 hover:border-2 hover:border-blue-800 transition ease-in-out duration-500 rounded-md h-14 w-full"
                onClick={activateHandler}
              >
                {status === "loading" ? (
                  "Processing..."
                ) : status === "succeeded" ? (
                  <Link to={"/signin"}>Back to sign in page</Link>
                ) : (
                  "Activate"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
