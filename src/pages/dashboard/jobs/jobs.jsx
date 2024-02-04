"use client";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/urls";
import { Delete, Edit } from "@mui/icons-material";
import Loader from "../../../components/unique/loader";
import { notify } from "../../../App";

const Jobs = () => {
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

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/jobs/${_id}`);
      console.log(response);
      if (response.status === 200) {
        notify("Job deleted successfully!", "success");
        setJobList([...joblist.filter((item) => item._id !== _id)]);
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-[16px] md:text-[20px] font-bold">Jobs</h3>
        <Link to={"/dashboard/jobs/create"}>
          <Button variant="contained" color="primary">
            Create Job Category
          </Button>
        </Link>
      </div>
      <div className="pt-10">
        {joblist.map((job, index) => {
          return (
            <div
              key={index}
              className="flex items-start justify-between w-full py-2"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <p className="font-bold">{job.category}</p>
              <ul className="hidden sm:flex flex-col">
                {job.roles.map((role) => {
                  return (
                    <li key={role._id}>
                      {role.role}({role.locations.toString()})
                    </li>
                  );
                })}
              </ul>
              <div>
                <Link to={`/dashboard/jobs/update?_id=${job._id}`}>
                  <Edit />
                </Link>
                <Delete
                  onClick={() => handleDelete(job._id)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          );
        })}
        <Loader loader={loader} />
      </div>
    </div>
  );
};

export default Jobs;
