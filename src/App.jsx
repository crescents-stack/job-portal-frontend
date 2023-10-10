/* eslint-disable react-refresh/only-export-components */
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/common/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { getCookie } from "./utils/cookies";
import Dashboard from "./pages/dashboard/dashboard";

import toast, { Toaster } from "react-hot-toast";
import PrivateRoutes from "./routes/privateroute";
import PublicRoutes from "./routes/publicroute";
import ErrorPage from "./pages/404";
import Jobs from "./pages/dashboard/jobs";
import CreateJob from "./pages/dashboard/create";
import UpdateJobs from "./pages/dashboard/Update";
import DashboardLayout from "./pages/dashboard/layout";
import Footer from "./components/common/footer";

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
              <Route path="jobs" element={<Jobs />} />
              <Route path="create" element={<CreateJob />} />
              <Route path="update" element={<UpdateJobs />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
