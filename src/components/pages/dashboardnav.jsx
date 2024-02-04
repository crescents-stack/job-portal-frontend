import { Link, useLocation } from "react-router-dom";

const DashboardNav = () => {
  const Links = [
    // {
    //   id: 1,
    //   text: "Dashboard",
    //   link: "/dashboard",
    // },
    {
      id: 2,
      text: "Jobs",
      link: "/dashboard/jobs",
    },
    {
      id: 3,
      text: "Roles",
      link: "/dashboard/roles",
    },
  ];
  const location = useLocation();

  return (
    <ul
      className="flex flex-row sm:flex-col min-w-[100px] sm:min-w-[200px] pr-1 py-4 sm:py-10 border-b sm:border-b-0"
      // style={{ borderRight: "1px solid lightgray" }}
    >
      {Links.map((item) => {
        const { id, link, text } = item;
        console.log(link, location.pathname, location.pathname === link);
        return (
          <li key={id} className="w-full">
            <Link
              to={link}
              style={{
                background: location.pathname === link ? "#f2f2f2" : "white",
                display: "flex",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardNav;
