import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FlagIndia from "../assets/flags/india";
import FlagBangladesh from "../assets/flags/bangladesh";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

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
  return (
    <div className="container mx-auto">
      <section className="section text-center flex flex-col gap-3">
        <div>
          <h2>BROWSE OPEN POSITIONS</h2>
          <p>We are always on the lookout for talented people</p>
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
                  border: "1px solid black",
                  background: id === tab ? "black" : "",
                  color: id === tab ? "white" : "black",
                  display: "flex",
                  gap: "5px",
                  fontWeight: "medium",
                }}
                onClick={() => setTab(id)}
              >
                <span>{title}</span>
                {id === 2 ? <FlagBangladesh /> : null}
                {id === 3 ? <FlagIndia /> : null}
              </Button>
            );
          })}
        </ButtonGroup>
      </section>

      <section className="grid grid-cols-1 gap-3">
        {JOBS.map((job) => {
          const { id, category, roles } = job;
          return (
            <Accordion
              key={id}
              style={{
                border: "2px solid #C4C4C4",
                background: "#F5F5F5",
                borderRadius: "8px",
                padding: "5px",
              }}
              expanded={expanded == id.toString()}
              onChange={handleChange(id.toString())}
            >
              <AccordionSummary
                expandIcon={
                  expanded == id.toString() ? (
                    <Minus className="w-5 h-5 stroke-[2px] stroke-[#626262]" />
                  ) : (
                    <Plus className="w-5 h-5 stroke-[2px] stroke-[#626262]" />
                  )
                }
                aria-controls={`${id}a-content`}
                id={`${id}a-header`}
              >
                <Typography
                  style={{
                    color: "#626262",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                  }}
                >
                  {category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {roles.length ? (
                  <div className="grid grid-cols-1 gap-3">
                    {roles.map((roleFor) => {
                      const { id, role, locations } = roleFor;
                      console.log(locations);
                      if (tab === 2) {
                        if (locations.includes("BN")) {
                          return (
                            <div
                              key={id}
                              className="border border-[#62626220] hover:border-[#62626240] rounded-md bg-[#fff] flex items-center justify-between gap-5 group"
                            >
                              <p className="text-base pl-4">{role}</p>
                              <div className="flex items-center justify-end gap-2 text-[#626262] border border-[#62626220] group-hover:border-[#62626240] group-hover:bg-[#182F59] group-hover:text-[#fff] rounded-md transition ease-in-out duration-300 px-2 py-2 cursor-pointer">
                                <button className="uppercase text-sm">
                                  APPLY NOW
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
                              key={id}
                              className="border border-[#62626220] hover:border-[#62626240] rounded-md bg-[#fff] flex items-center justify-between gap-5 group"
                            >
                              <p className="text-base pl-4">{role}</p>
                              <div className="flex items-center justify-end gap-2 text-[#626262] border border-[#62626220] group-hover:border-[#62626240] group-hover:bg-[#182F59] group-hover:text-[#fff] rounded-md transition ease-in-out duration-300 px-2 py-2 cursor-pointer">
                                <button className="uppercase text-sm">
                                  APPLY NOW
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
                            key={id}
                            className="border border-[#62626220] hover:border-[#62626240] rounded-md bg-[#fff] flex items-center justify-between gap-5 group"
                          >
                            <p className="text-base pl-4">{role}</p>
                            <div className="flex items-center justify-end gap-2 text-[#626262] border border-[#62626220] group-hover:border-[#62626240] group-hover:bg-[#182F59] group-hover:text-[#fff] rounded-md transition ease-in-out duration-300 px-2 py-2 cursor-pointer">
                              <button className="uppercase text-sm">
                                APPLY NOW
                              </button>
                              {locations.includes("BN") ? (
                                <FlagBangladesh />
                              ) : null}
                              {locations.includes("IN") ? <FlagIndia /> : null}
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
    </div>
  );
};
export default Home;

const JOBS = [
  {
    id: 0,
    category: "Sales & Marketing",
    roles: [
      {
        id: 0,
        role: "Marketing Manager",
        locations: ["BN", "IN"],
      },
      {
        id: 1,
        role: "Sales Executive",
        locations: ["IN"],
      },
    ],
  },
  {
    id: 1,
    category: "Development",
    roles: [
      {
        id: 0,
        role: "Frontend Developer",
        locations: ["IN"],
      },
      {
        id: 1,
        role: "Backend Developer",
        locations: ["BN"],
      },
    ],
  },
  {
    id: 2,
    category: "Development",
    roles: [
      {
        id: 0,
        role: "Frontend Developer",
        locations: ["IN"],
      },
      {
        id: 1,
        role: "Backend Developer",
        locations: ["BN"],
      },
    ],
  },
  {
    id: 3,
    category: "Development",
    roles: [
      {
        id: 0,
        role: "Frontend Developer",
        locations: ["IN"],
      },
      {
        id: 1,
        role: "Backend Developer",
        locations: ["BN"],
      },
    ],
  },
];
