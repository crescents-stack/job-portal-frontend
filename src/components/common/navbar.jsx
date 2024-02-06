import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../../App";
import { deleteCookie } from "../../utils/cookies";
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  console.table(location.pathname);
  return location.pathname.includes("login") ||
    location.pathname.includes("register") ? null : (
    <nav className="sticky top-0 py-2 backdrop-blur-xl z-50 shadow">
      <div className="container mx-auto flex items-center justify-between gap-4 sm:gap-10">
        <Link to="/" className="text-xl lg:text-2xl font-bold" style={{color: "indigo"}}>
          JOBTALS
        </Link>
        <ul className="flex justify-end gap-4 sm:gap-10 items-center">
          {user ? (
            <Link
              to="/dashboard/jobs"
              className="list"
            >
              Dashboard
            </Link>
          ) : null}
          {!user ? (
            <Link to="/login" className="list">
              <Button variant="contained" style={{background: "indigo"}}>Login</Button>
            </Link>
          ) : (
            <Button
              variant="contained"
              style={{ background: "#CC397B", color: "white" }}
              onClick={() => {
                deleteCookie("token");
                setUser(null);
              }}
            >
              Logout
            </Button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
