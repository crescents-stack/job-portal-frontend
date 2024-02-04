"use client";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/urls";
import { Delete, Edit } from "@mui/icons-material";
import Loader from "../../../components/unique/loader";
import { notify } from "../../../App";

const Roles = () => {
  const [rolelist, setRoleList] = useState([]);
  const [loader, setLoader] = useState(true);

  const FetchRoleList = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/roles`);
    console.log(response);
    if (response.status === 200) {
      setRoleList(response.data.roles);
    }
  };

  useEffect(() => {
    FetchRoleList();
    setLoader(false);
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/roles/${_id}`);
      console.log(response);
      if (response.status === 200) {
        notify("Role deleted successfully!", "success");
        setRoleList([...rolelist.filter((item) => item._id !== _id)]);
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-[16px] md:text-[20px] font-bold">Roles</h3>
        <Link to={"/dashboard/roles/create"}>
          <Button variant="contained" color="primary">
            Create Role
          </Button>
        </Link>
      </div>
      <div className="pt-10">
        {rolelist.map((role, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between w-full py-2"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <p className="font-bold">{role.role}</p>
              <ul className="hidden sm:flex gap-4 items-center">
                {role.locations.map((location, index) => {
                  return (
                    <li
                      key={index}
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: "#f2f2f2",
                        display: "inline-block",
                      }}
                    >
                      {location === "BN" ? "Bangladesh" : "India"}
                    </li>
                  );
                })}
              </ul>
              <div>
                <Link to={`/dashboard/roles/update?_id=${role._id}`}>
                  <Edit />
                </Link>
                <Delete
                  onClick={() => handleDelete(role._id)}
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

export default Roles;
