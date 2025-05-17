import { Outlet } from "react-router";
import { Sidebar, Topbar } from "../components";

const DashboardLayout = () => {
  return (
    <div className="w-full flex items-start text-white h-full bg-[#0A132E]">
      <div className="hidden md:block bg-[#0A132E] md:w-[20%] lg:w-[15%] fixed border-r border-[#1E3A8A] h-screen">
        <Sidebar />
      </div>

      <div className="w-full md:w-[80%] lg:w-[85%] ml-auto bg-[#0A132E] relative">
        <div className="fixed w-full right-0 md:w-[80%] lg:w-[85%] border-b border-[#1E3A8A] z-50 bg-[#0A132E]">
          <Topbar />
        </div>

        <div className="w-[96%] md:w-[94%] mx-auto">
          <div className="mt-[5.5rem]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
