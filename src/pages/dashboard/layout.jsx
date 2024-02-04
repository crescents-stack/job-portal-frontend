import { Outlet } from "react-router-dom";
import DashboardNav from "../../components/pages/dashboardnav";

const DashboardLayout = () => {
  return (
    <div className="container mx-auto flex flex-col sm:flex-row gap-8">
      <DashboardNav />
      <div className="flex-1 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
