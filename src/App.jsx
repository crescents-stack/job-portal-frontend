/* eslint-disable react-refresh/only-export-components */

"use client";

import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { getCookie } from "./utils/cookies";

import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import PrivateRoutes from "./routes/privateroute";
import PublicRoutes from "./routes/publicroute";
import ErrorPage from "./pages/404";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./pages/dashboard/layout";
import Jobs from "./pages/dashboard/jobs/jobs";
import Roles from "./pages/dashboard/roles/roles";
import RolesLayout from "./pages/dashboard/roles/layout";
import UpdateRole from "./pages/dashboard/roles/update";
import CreateRole from "./pages/dashboard/roles/create";
import JobsLayout from "./pages/dashboard/jobs/layout";
import CreateJob from "./pages/dashboard/jobs/create";
import UpdateJob from "./pages/dashboard/jobs/update";

export const notify = (message, type) => toast[type](message);
export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      const UserInCookie = getCookie("token");
      console.log(UserInCookie);
      if (UserInCookie) {
        setUser(UserInCookie);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Toaster />
      <Navbar />
      <div className="min-h-[100vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<PublicRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="jobs" element={<JobsLayout />}>
                <Route index element={<Jobs />} />
                <Route path="create" element={<CreateJob />} />
                <Route path="update" element={<UpdateJob />} />
              </Route>
              <Route path="roles" element={<RolesLayout />}>
                <Route index element={<Roles />} />
                <Route path="create" element={<CreateRole />} />
                <Route path="update" element={<UpdateRole />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
