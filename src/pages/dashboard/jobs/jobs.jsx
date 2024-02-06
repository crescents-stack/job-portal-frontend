"use client";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/urls";
import { Delete, Edit } from "@mui/icons-material";
import Loader from "../../../components/unique/loader";
import { notify } from "../../../App";
import toast from "react-hot-toast";

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
        <h3 className="text-[16px] md:text-[20px] font-bold">
          All Jobs Categories
        </h3>
        <Link to={"/dashboard/jobs/create"}>
          <Button variant="contained" style={{ background: "indigo" }}>
            Create Job
          </Button>
        </Link>
      </div>
      <div className="pt-10 space-y-8">
        {joblist.map((job, index) => {
          return (
            <div
              key={index}
              className="flex items-start justify-between w-full pt-2 pb-4 px-4 rounded-[10px]"
              style={{
                borderTop: "1px solid lightgray",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div className="space-y-2">
                <p className="font-medium">{job.category}</p>
                <ul className="hidden sm:flex flex-col">
                  {job.roles.map((role) => {
                    return (
                      <li key={role._id} style={{ color: "#3f3f3f" }}>
                        {role.role}&nbsp;(
                        {role.locations.toString().replaceAll("BN", "BD")})
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="space-x-8">
                <Link to={`/dashboard/jobs/update?_id=${job._id}`}>
                  <Edit />
                </Link>
                <Delete
                  onClick={() => {
                    toast((t) => (
                      <div className="grid grid-cols-1 gap-4">
                        <p>Are you sure to delete this job?</p>
                        <div className="space-x-4">
                          <button
                            onClick={async () => {
                              await handleDelete(job._id);
                              toast.dismiss(t.id);
                            }}
                            className="shadow px-[12px] py-[6px] rounded-[10px]"
                            style={{ background: "red", color: "white" }}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className="shadow px-[12px] py-[6px] rounded-[10px]"
                            style={{ background: "indigo", color: "white" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ));
                  }}
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
