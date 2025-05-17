import { Outlet } from "react-router";

const LandingLayout = () => {
  return (
    <div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
