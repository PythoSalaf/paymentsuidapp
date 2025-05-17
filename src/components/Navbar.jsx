import { useState } from "react";
import { NavLink } from "react-router";
import { Logo } from "../assets";
import { IoWalletOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import WalletModal from "./WalletModal";
const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="w-full  py-3 z-50 bg-[#060C1C]  shadow">
      <div className="w-[96%] md:w-[92%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-1.5">
          <img src={Logo} alt="logo" className="w-[30px] md:w-[35px]" />
          <h3 className="">Guardwallet</h3>
        </div>
        <div className="hidden md:flex items-center gap-9">
          <NavLink>Home</NavLink>
          <NavLink>About us</NavLink>
          <NavLink>Our Services</NavLink>
          <NavLink>Contact us</NavLink>
        </div>
        <div className="hidden md:block">
          <button
            className="bg-[#1E3A8A] hover:bg-[#0e235d] text-white py-2 px-3 rounded-md cursor-pointer flex items-center gap-x-1.5"
            onClick={() => setModalOpen(true)}
          >
            <IoWalletOutline className="size-5" />
            Connect Wallet
          </button>
        </div>
        <div className="block md:hidden cursor-pointer">
          <MdMenu className="size-8" />
        </div>
      </div>
      <WalletModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Navbar;
