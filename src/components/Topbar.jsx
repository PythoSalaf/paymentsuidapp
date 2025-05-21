import { useState } from "react";
import { Link } from "react-router";
import { Logo, Profile } from "../assets";
import { IoMdNotifications } from "react-icons/io";
import { MdClose, MdMenu } from "react-icons/md";

const Topbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <div className="py-1.5 md:py-[13.6px] w-[96%] md:w-[94%] mx-auto flex items-center justify-between">
      <div
        className="block md:hidden cursor-pointer"
        onClick={() => setIsToggle(!isToggle)}
      >
        {isToggle ? (
          <MdClose className="size-8" />
        ) : (
          <MdMenu className="size-8" />
        )}
      </div>
      {isToggle && (
        <div className="absolute top-14 right-0 z-40 shadow-2xl rounded-l-2xl w-[50%] bg-[#0F1D45] py-5 ">
          <div className="w-[75%] mx-auto flex flex-col ">
            <Link to="/" className="mb-3">
              Home
            </Link>
            <Link to="/dashboard" className="mb-3">
              Dashboard
            </Link>
            <Link className="mb-3">Transactions</Link>
          </div>
        </div>
      )}
      <div className="flex items-start py-3 md:py-0">
        <img src={Profile} alt="profile" className="hidden md:block w-[45px]" />
        {/* <div className="text-center" >
              <h4 className="text-sm md:text-base px-3 py-0.5 rounded-2xl bg-white opacity-70 text-[#0A132E] font-semibold " >083xdh.....d4x</h4>  
              <p className="text-[#9960F2]" >Sui Network</p>
            </div> */}
        <div className="block md:hidden">
          <Link to="/" className="flex items-center gap-x-2">
            <img src={Logo} alt="logo" className="w-[30px]" />
            <h2 className="text-xl font-semibold">Guardwallet</h2>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-x-6">
        <div className="relative border text-white border-[#1E3A8A] rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
          <IoMdNotifications className="size-[60%]" />
          <div className="absolute -top-2 right-0 w-4 h-4 rounded-full bg-[#9960F2] text-white flex items-center justify-center">
            <h2 className="text-xs font-semibold">2</h2>
          </div>
        </div>
        <div className="hidden md:block">
          <input
            className=" border border-[#1E3A8A] h-9 rounded-2xl px-3"
            placeholder="Search........."
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
