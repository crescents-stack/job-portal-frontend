import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import FlagIndia from "../assets/flags/india";
import FlagBangladesh from "../assets/flags/bangladesh";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/urls";
import Loader from "../components/unique/loader";

const Home = () => {
  const [tab, setTab] = useState(1);
  const Tabs = [
    {
      id: 1,
      title: "All locations",
      image: "",
    },
    {
      id: 2,
      title: "Bangladesh",
      image: "",
    },
    {
      id: 3,
      title: "India",
      image: "",
    },
  ];
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [joblist, setJobList] = useState([]);
  const [loader, setLoader] = useState(true);

  const FetchJobList = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/jobs`);
      console.log(response);
      if (response.status === 200) {
        setJobList(response.data.jobs);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    FetchJobList();
  }, []);
  return (
    <div className="container mx-auto">
      <section className="section text-center flex flex-col gap-3">
        <div className="pb-10 pt-5">
          <h2>BROWSE OPEN POSITIONS</h2>
          <p style={{color: "gray"}}>We are always on the lookout for talented people</p>
        </div>
        <ButtonGroup
          style={{
            border: "none",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        >
          {Tabs.map((SingleTab) => {
            const { id, title } = SingleTab;
            return (
              <Button
                key={id}
                style={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  border: "none",
                  background: id === tab ? "indigo" : "",
                  color: id === tab ? "white" : "indigo",
                  display: "flex",
                  gap: "5px",
                  fontWeight: "medium",
                }}
                onClick={() => setTab(id)}
              >
                <span
                  className={
                    id !== 1 ? "hidden sm:inline-block" : "inline-block"
                  }
                >
                  {title}
                </span>
                {id === 2 ? <FlagBangladesh /> : null}
                {id === 3 ? <FlagIndia /> : null}
              </Button>
            );
          })}
        </ButtonGroup>
      </section>

      {loader ? (
        <Loader loader={loader} />
      ) : joblist.length ? (
        <section className="grid grid-cols-1 gap-3">
          {joblist.map((job) => {
            const { _id, category, roles } = job;
            return (
              <Accordion
                key={_id}
                style={{
                  border: "none",
                  background: "white",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                }}
                expanded={expanded == _id.toString()}
                onChange={handleChange(_id.toString())}
              >
                <AccordionSummary
                  expandIcon={
                    expanded == _id.toString() ? (
                      <Minus className="w-5 h-5 stroke-[2px] stroke-[#626262]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2px] stroke-[#626262]" />
                    )
                  }
                  aria-controls={`${_id}a-content`}
                  id={`${_id}a-header`}
                >
                  <p className="text-[14px] sm:text-[16px] font-medium text-gray-500">
                    {category}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  {roles.length ? (
                    <div className="grid grid-cols-1 gap-3">
                      {roles.map((roleFor) => {
                        const { role, locations } = roleFor;
                        console.log(locations);
                        if (tab === 2) {
                          if (locations.includes("BN")) {
                            return (
                              <div
                                key={roleFor._id}
                                className="shadow rounded-md bg-[#fff] flex items-center justify-between gap-5 group"
                              >
                                <p className="text-base pl-4">{role}</p>
                                <div className="flex items-center justify-end gap-2 text-[#626262] border border-[#62626220] group-hover:border-[#62626240] group-hover:bg-[#4c2b99] group-hover:text-[#fff] rounded-md transition ease-in-out duration-300 px-2 py-2 cursor-pointer">
                                  <button className="uppercase text-xs sm:text-sm">
                                    APPLY
                                  </button>
                                  {locations.includes("BN") ? (
                                    <FlagBangladesh />
                                  ) : null}
                                </div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        } else if (tab === 3) {
                          if (locations.includes("IN")) {
                            return (
                              <div
                                key={roleFor._id}
                                className="shadow rounded-md bg-[#fff] flex items-center justify-between gap-5 group"
                              >
                                <p className="text-base pl-4">{role}</p>
                                <div className="flex items-center justify-end gap-2 text-[#626262] border border-[#62626220] group-hover:border-[#62626240] group-hover:bg-[#4c2b99] group-hover:text-[#fff] rounded-md transition ease-in-out duration-300 px-2 py-2 cursor-pointer">
                                  <button className="uppercase text-xs sm:text-sm">
                                    APPLY
                                  </button>
                                  {locations.includes("IN") ? (
                                    <FlagIndia />
                                  ) : null}
                                </div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        } else {
                          return (
                            <div
                              key={roleFor._id}
                              className="shadow rounded-md bg-[#fff] flex items-center justify-between gap-5 group"
                            >
                              <p className="text-base pl-4">{role}</p>
                              <div className="flex items-center justify-end gap-2 text-[#626262] border border-[#62626220] group-hover:border-[#62626240] group-hover:bg-[#4c2b99] group-hover:text-[#fff] rounded-md transition ease-in-out duration-300 px-2 py-2 cursor-pointer">
                                <button className="uppercase text-xs sm:text-sm">
                                  APPLY
                                </button>
                                {locations.includes("BN") ? (
                                  <FlagBangladesh />
                                ) : null}
                                {locations.includes("IN") ? (
                                  <FlagIndia />
                                ) : null}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    "No role found!"
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </section>
      ) : (
        "No job found!"
      )}
    </div>
  );
};
export default Home;

// const JOBS = [
//   {
//     id: 0,
//     category: "Sales & Marketing",
//     roles: [
//       {
//         id: 0,
//         role: "Marketing Manager",
//         locations: ["BN", "IN"],
//       },
//       {
//         id: 1,
//         role: "Sales Executive",
//         locations: ["IN"],
//       },
//     ],
//   },
//   {
//     id: 1,
//     category: "Development",
//     roles: [
//       {
//         id: 0,
//         role: "Frontend Developer",
//         locations: ["IN"],
//       },
//       {
//         id: 1,
//         role: "Backend Developer",
//         locations: ["BN"],
//       },
//     ],
//   },
//   {
//     id: 2,
//     category: "Development",
//     roles: [
//       {
//         id: 0,
//         role: "Frontend Developer",
//         locations: ["IN"],
//       },
//       {
//         id: 1,
//         role: "Backend Developer",
//         locations: ["BN"],
//       },
//     ],
//   },
//   {
//     id: 3,
//     category: "Development",
//     roles: [
//       {
//         id: 0,
//         role: "Frontend Developer",
//         locations: ["IN"],
//       },
//       {
//         id: 1,
//         role: "Backend Developer",
//         locations: ["BN"],
//       },
//     ],
//   },
// ];
