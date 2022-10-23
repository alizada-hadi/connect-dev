import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight, BsMoonStars, BsSun, BsChatLeft } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineDashboard,
} from "react-icons/ai";
import { GrProjects, GrGroup } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";
import { changeTheme } from "../features/ui/UISlice";

import UserAvatar from "../assets/users/avatar-1.jpg";

const Header = () => {
  const pic_url =
    "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

  const [nav, setNav] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const { access, user } = useSelector((state) => state.auth);
  const { unreadMessageCount } = useSelector((state) => state.UI);

  const avatar = user?.programmer?.avatar;
  const dispatch = useDispatch();
  const handleChangeTheme = () => {
    setDarkMode(!darkMode);
    dispatch(changeTheme(darkMode));
  };
  const handleClick = () => {
    setNav(!nav);
  };
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(reset());
    navigate("/signin");
  };
  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className="w-full h-[50px] fixed bg-zinc-100 dark:bg-gray-800 drop-shadow-sm">
      <nav className="flex items-center  justify-between mx-12 md:mx-20 lg:mx-32">
        <div className="flex items-center">
          <div className="flex items-center">
            <div>
              <h1 className="text-4xl dark:text-slate-200 font-semibold text-slate-500 mr-12">
                CC
              </h1>
            </div>
            <div className=" ">
              <ul className="ml-12 hidden dark:text-slate-100 text-lg md:flex">
                {access ? (
                  <>
                    <li className="ml-5">
                      <Link to={"/"} className="flex items-center">
                        <GrGroup className="mr-2 dark:bg-slate-200" />
                        Programmers
                      </Link>
                    </li>
                    <li className="ml-5">
                      <Link to={"/projects"} className="flex items-center">
                        <GrProjects className="mr-2 dark:bg-slate-200" />
                        Projects
                      </Link>
                    </li>
                    <li className="ml-5">
                      <Link
                        to={"/conversation"}
                        className="flex items-center absolute"
                      >
                        <BsChatLeft className="mr-2 dark:bg-state-200" />
                        Conversation{" "}
                        {unreadMessageCount > 0 && (
                          <span className="bg-blue-700 rounded-full px-2 ml-2 text-sm text-white relative top-[-10px] right-[4px] ">
                            {unreadMessageCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-items">
          <button
            onClick={() => handleChangeTheme()}
            className=" border rounded-md transition ease-out duration-300 mr-8 px-3 mt-2"
          >
            {darkMode ? <BsMoonStars /> : <BsSun className="text-white" />}
          </button>
          {access ? (
            <>
              <div className="md:order-2  mr-10 mt-2 ">
                <button
                  onClick={dropdownHandler}
                  type="button"
                  className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <img
                    className="w-9 h-9 rounded-full"
                    src={user && avatar ? avatar : UserAvatar}
                    alt="user photo"
                  />
                </button>
                <div
                  className={
                    dropdown
                      ? `flex flex-col z-10 absolute w-48 bg-white mt-2 rounded-md shadow-sm dark:bg-slate-700 dark:text-slate-200 dark:hover:text-slate-800`
                      : `hidden  flex-col z-10 absolute w-48 bg-white mt-2 rounded-md shadow-sm dark:bg-slate-700 dark:text-slate-200 dark:hover:text-slate-800`
                  }
                >
                  <span className="mt-1 cursor-pointer hover:bg-gray-200 px-4 py-1 rounded-sm">
                    <Link
                      to={"/profile"}
                      onClick={dropdownHandler}
                      className="flex items-center"
                    >
                      <AiOutlineUser className="text-xl mr-3" />
                      <span className="text-lg font-medium">
                        {user.programmer?.first_name
                          ? user.programmer?.first_name
                          : user.username}
                      </span>
                    </Link>
                  </span>
                  <span className="mt-1 cursor-pointer hover:bg-gray-200 px-4 py-1 rounded-sm">
                    <Link to={"/"} className="flex items-center">
                      <AiOutlineDashboard className="text-xl mr-3" />
                      <span>Dashboard</span>
                    </Link>
                  </span>
                  <span className="mt-1 cursor-pointer hover:bg-gray-200 px-4 py-1 rounded-sm">
                    <Link to={"/"} className="flex items-center">
                      <FiSettings className="text-xl mr-3" />
                      <span>Settings</span>
                    </Link>
                  </span>
                  <span className="my-1 cursor-pointer hover:bg-gray-200 px-4 py-1 rounded-sm border-t">
                    <button
                      onClick={logoutHandler}
                      className="flex items-center"
                    >
                      <VscSignOut className="text-xl mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="flex items-center bg-cyan-600 px-4 py-2 mt-1 font-medium rounded-md text-slate-100 hover:bg-transparent hover:border-2 hover:text-slate-800 border-gray-800 ease-out duration-100 dark:hover:text-slate-200 dark:hover:border-slate-200"
              >
                Get Started <BsArrowRight className="ml-2" />
              </Link>
            </>
          )}
        </div>
        <div
          className="md:hidden cursor-pointer text-xl mt-2"
          onClick={handleClick}
        >
          {!nav ? <AiOutlineMenu /> : <AiOutlineClose />}
        </div>
      </nav>
      <ul className={!nav ? "hidden" : "absolute bg-zinc-100 w-full px-12"}>
        <li className="my-2 text-center border-b">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="my-2 text-center border-b">
          <Link to={"/"}>Home</Link>
        </li>
        <Link
          to={"/signup"}
          className="flex items-center my-8 bg-cyan-600 px-4 py-2 font-medium rounded-md text-slate-100 hover:bg-transparent hover:border-2 hover:text-slate-800 border-gray-800 ease-out duration-100"
        >
          Get Started <BsArrowRight className="ml-2" />
        </Link>
      </ul>
    </div>
  );
};

export default Header;
