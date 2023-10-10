import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../../App";
import { deleteCookie } from "../../utils/cookies";
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <nav className="sticky top-0 py-2 container mx-auto flex items-center justify-between gap-10 backdrop-blur-xl z-50">
      <Link to="/" className="text-xl lg:text-2xl font-bold text-primary">
        JOBTALS
      </Link>
      <ul className="flex justify-end gap-10 items-center">
        {user ? (
          <Link
            to="/dashboard"
            className="list hover:text-primary border-b-2 border-[#fff] hover:border-primary transition ease-in-out duration-300"
          >
            Dashboard
          </Link>
        ) : null}
        {!user ? (
          <Link to="/login" className="list">
            <Button variant="contained">Login</Button>
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
    </nav>
  );
};

export default Navbar;
