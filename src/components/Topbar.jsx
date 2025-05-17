import { Profile } from "../assets";
import { IoMdNotifications } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="py-1.5 md:py-[13.6px] w-[96%] md:w-[94%] mx-auto flex items-center justify-between">
      <div className="flex items-start gap-x-3">
        <img src={Profile} alt="profile" className="w-[45px]" />
        {/* <div className="text-center" >
              <h4 className="text-sm md:text-base px-3 py-0.5 rounded-2xl bg-white opacity-70 text-[#0A132E] font-semibold " >083xdh.....d4x</h4>  
              <p className="text-[#9960F2]" >Sui Network</p>
            </div> */}
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
