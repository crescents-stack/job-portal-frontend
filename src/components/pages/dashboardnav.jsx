import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <ul className="flex items-center gap-10">
      <li>
        <Link to="">Dashboard</Link>
      </li>
      <li>
        <Link to="jobs">Jobs</Link>
      </li>
      <li>
        <Link to="create">Create</Link>
      </li>
      <li>
        <Link to="update">Update</Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
