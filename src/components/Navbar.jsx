import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Logo } from "../assets";
import { IoWalletOutline } from "react-icons/io5";
import { MdMenu, MdClose } from "react-icons/md";
import WalletModal from "./WalletModal";
const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <div className="w-full  py-3 z-50 bg-[#060C1C]  shadow">
      <div className="w-[96%] md:w-[92%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-1.5">
          <img src={Logo} alt="logo" className="w-[30px] md:w-[35px]" />
          <h3 className="">Guardwallet</h3>
        </div>
        <div className="hidden md:flex items-center gap-9">
          <NavLink>Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
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
        <div
          className="block md:hidden cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <MdClose className="size-8" />
          ) : (
            <MdMenu className="size-8" />
          )}
        </div>
        {toggle && (
          <div className="absolute top-14 right-0 z-40 shadow-2xl rounded-b-2xl w-full bg-[#0F1D45] py-8 ">
            <div className="w-[85%] mx-auto flex flex-col items-center justify-center">
              <Link to="/" className="mb-3" onClick={() => setToggle(!toggle)}>
                Home
              </Link>
              <Link
                to="/dashboard"
                className="mb-3"
                onClick={() => setToggle(!toggle)}
              >
                Dashboard
              </Link>
              <Link
                to="/send-asset"
                className="mb-3"
                onClick={() => setToggle(!toggle)}
              >
                Send Asset
              </Link>
              <button className="bg-[#0A132E] text-sm px-3 rounded-lg py-1.5 mt-6">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
      <WalletModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Navbar;
