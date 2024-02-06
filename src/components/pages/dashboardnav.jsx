import { Link, useLocation } from "react-router-dom";

const DashboardNav = () => {
  const Links = [
    {
      id: 1,
      text: "View Jobs",
      link: "/",
    },
    {
      id: 2,
      text: "Manage Jobs",
      link: "/dashboard/jobs",
    },
    {
      id: 3,
      text: "Manage Roles",
      link: "/dashboard/roles",
    },
  ];
  const location = useLocation();

  return (
    <ul
      className="flex flex-row sm:flex-col min-w-[100px] sm:min-w-[200px] pr-1 py-4 sm:py-10 border-b sm:border-b-0 rounded-[8px]"
      style={{ boxShadow: "2px -1px 2px rgb(0,0,0,0.1)" }}
    >
      {Links.map((item) => {
        const { id, link, text } = item;
        return (
          <li key={id} className="w-full">
            <Link
              to={link}
              style={{
                background: location.pathname === link ? "#4B008210" : "white",
                display: "flex",
                padding: "4px 8px",
                borderRadius: "4px",
                borderLeft:
                  location.pathname === link
                    ? "4px solid #4B0082"
                    : "4px solid #4B008210",
                boxShadow:
                  location.pathname === link
                    ? "0 0 2px rgba(0, 0, 0, 0.2)"
                    : "0 0 2px rgba(0, 0, 0, 0)",
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
