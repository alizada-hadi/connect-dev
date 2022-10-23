import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../features/auth/authSlice";
import Button from "../components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, access, status } = useSelector((state) => state.auth);

  const [first_name, setFirst_name] = useState(
    user ? user?.programmer?.first_name : ""
  );
  const [last_name, setLast_name] = useState(
    user ? user?.programmer?.last_name : ""
  );
  const [phone, setPhone] = useState(user ? user?.programmer?.phone : "");
  const [address, setAddress] = useState(user ? user?.programmer?.address : "");
  const [about, setAbout] = useState(user ? user?.programmer?.about : "");
  const [git, setGit] = useState(user ? user?.programmer?.git : "");
  const [gender, setGender] = useState(user ? user?.programmer?.gender : "");
  const [website, setWebsite] = useState(user ? user?.programmer?.website : "");
  const [avatar, setAvatar] = useState(user ? user?.programmer?.avatar : "");

  const [email, setEmail] = useState(user ? user.email : "");
  const [speciality, setSpeciality] = useState(
    user ? user?.programmer?.speciality : ""
  );
  const [twitter, setTwitter] = useState(user ? user?.programmer?.twitter : "");
  const [linkedIn, setLinkedIn] = useState(
    user ? user?.programmer?.linkedIn : ""
  );

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = access.access;
    const data = {
      first_name,
      last_name,
      phone,
      address,
      about,
      git,
      website,
      avatar,
      gender,
      token,
      speciality,
      twitter,
      linkedIn,
    };
    dispatch(profile(data));
    navigate("/profile");
    toast.success("Your info updated successfully ");
  };

  const changeGenderHandler = (e) => {
    setGender(e.target.value);
  };

  return status === "loading" ? (
    <Spinner />
  ) : (
    <div className="pt-12 h-screen dark:bg-gray-800">
      <div className="max-w-5xl mx-auto bg-white rounded-md border-2 mt-24 p-10 dark:bg-slate-700">
        <Link to={"/profile"} className="block">
          <span className="">
            <AiOutlineArrowLeft className="text-6xl bg-green-200 p-4 rounded-full hover:shadow-md dark:bg-gray-800 dark:text-slate-200" />
          </span>
        </Link>
        <div className="my-6 mx-12">
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your nick name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="youemail@gmail.com"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="speciality"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Your Speciality
                </label>
                <input
                  type="text"
                  name="speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your mastery"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+93-789-231-111"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Gender
                </label>
                <div className="flex space-x-5 items-center">
                  <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-slate-200">
                    <input
                      id="bordered-radio-1"
                      type="radio"
                      value="Male"
                      name="gender"
                      onChange={changeGenderHandler}
                      className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={gender === "Male"}
                    />
                    <label
                      htmlFor="bordered-radio-1"
                      className="py-3 cursor-pointer px-5 ml-2 w-full text-md font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-slate-200">
                    <input
                      id="bordered-radio-2"
                      type="radio"
                      value="Female"
                      name="gender"
                      onChange={changeGenderHandler}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={gender === "Female"}
                    />
                    <label
                      htmlFor="bordered-radio-2"
                      className="py-3 cursor-pointer px-5 ml-2 w-full text-md font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="git"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Git Hub
                </label>
                <input
                  type="tel"
                  name="git"
                  value={git}
                  onChange={(e) => setGit(e.target.value)}
                  id="git"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="https://www.github.com/username"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Website
                </label>
                <input
                  type="tel"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  id="website"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="https://www.yousubdomain.topLevelDomain"
                />
              </div>
              <div>
                <label
                  htmlFor="twitter"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Twitter{" "}
                </label>
                <input
                  type="tel"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  id="twitter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="https://www.twitter.com/username"
                />
              </div>
              <div>
                <label
                  htmlFor="linkedIn"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Linked In
                </label>
                <input
                  type="tel"
                  name="linkedIn"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  id="linkedIn"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="https://www.linkedIn.com/username"
                />
              </div>
              {/* end gender input */}
              <div>
                <label
                  htmlFor="bio"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="6"
                  name="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="About yourself..."
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  rows="6"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your place..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center items-center w-full mt-8 mb-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {avatar?.name
                      ? avatar?.name
                      : "SVG, PNG, JPG or GIF (MAX. 800x400px)"}
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="avatar"
                  onChange={handleUploadImage}
                  className="hidden"
                  required
                />
              </label>
            </div>
            <Button label="Save" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
