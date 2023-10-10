import { Outlet } from "react-router-dom";
import DashboardNav from "../../components/pages/dashboardnav";

const DashboardLayout = () => {
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
