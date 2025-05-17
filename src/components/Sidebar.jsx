import { NavLink } from "react-router";
import { Logo } from "../assets";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { GrSettingsOption } from "react-icons/gr";

const Sidebar = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className=" w-full  border-b border-[#1E3A8A] py-5 ">
        <div className="w-[80%] mx-auto flex items-center gap-x-2">
          <img src={Logo} alt="logo" className="w-[30px]" />
          <h2 className="text-xl font-semibold">Guardwallet</h2>
        </div>
      </div>
      <div className="w-[90%] mx-auto flex items-center flex-col mt-14">
        <NavLink
          to="/send-asset"
          className="mb-7 flex items-center gap-x-2.5 bg-[#1E3A8A] px-3 py-2 rounded-md w-full"
        >
          <AiFillDollarCircle />
          Send Asset
        </NavLink>
        <NavLink
          to="/dashboard"
          className="mb-7 bg-[#FFFFFF1A] py-2 rounded-md opacity-65 flex items-center px-3 gap-x-2.5 w-full text-white font-semibold"
        >
          <MdDashboard />
          Dashboard
        </NavLink>
        <NavLink
          to="/send-asset"
          className="mb-7 flex items-center gap-x-2.5 w-full text-white font-semibold px-3 hover:bg-black opacity-65"
        >
          <TbMoneybag />
          Asset
        </NavLink>
        <NavLink className="mb-7 flex items-center gap-x-2.5 w-full text-white font-semibold px-3 hover:bg-black opacity-65">
          <IoMdNotifications />
          Notification
        </NavLink>
        <NavLink className="mb-7 flex items-center gap-x-2.5 w-full text-white font-semibold px-3 hover:bg-black opacity-65">
          <GrSettingsOption />
          Settings
        </NavLink>
      </div>
      <div className="mt-32">
        <button className="bg-red-700 text-white px-5 py-2 rounded-xl">
          Diconnect Wallet
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
