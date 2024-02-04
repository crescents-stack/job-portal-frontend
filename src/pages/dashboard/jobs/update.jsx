/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { Typography, Button, Stack, TextField } from "@mui/material";

import FormInputMultiCheckbox from "../../../components/form/multi-check";
import { BACKEND_URL } from "../../../utils/urls";
import axios from "axios";
import { notify } from "../../../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../../components/unique/loader";

const UpdateJob = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [rolelist, setRoleList] = useState([]);
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(true);
  const form = useForm({
    // resolver: zodResolver(RoleSchema),
    defaultValues: {
      category: "",
      roles: [],
    },
  });
  const { handleSubmit, formState, register, setValue, control } = form;
  const { errors } = formState;

  // eslint-disable-next-line no-unused-vars
  const UpdateRole = async (data) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/api/jobs/${data._id}`, data);
      console.log(response);
      if (response.status === 200) {
        notify("Job created successfully!", "success");
        navigate("/dashboard/jobs");
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
    }
  };

  const onSubmit = (data) => {
    const mergedData = {
      ...data,
      roles: [
        ...data.roles.map(
          (role_id) => rolelist.filter((role) => role._id === role_id)[0]
        ),
      ],
    };
    // console.log(mergedData);
    UpdateRole(mergedData);
  };

  const FetchRoleList = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/roles`);
      console.log(response);
      if (response.status === 200) {
        setRoleList(response.data.roles);
        setOptions(
          response.data.roles.map((role) => {
            return {
              label: `${role.role}(${role.locations.toString()})`,
              value: role._id,
            };
          })
        );
        // setLoader(false);
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
      // setLoader(false);
    }
  };

  const FetchJobData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/jobs/${searchParams.get("_id")}`);
      console.log(response);
      if (response.status === 200) {
        const data = response.data.jobs[0];
        const processedData = {...data, roles: [...data.roles.map((role) => role._id)]}
        form.reset(processedData);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
      setLoader(false);
    }
  };

  useEffect(() => {
    FetchRoleList();
    FetchJobData();
  }, []);
  return (
    <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} width={400}>
            <Typography variant="h6">Add new job category</Typography>
            <TextField
              {...register("category", {
                required: "Category is required!",
              })}
              label="Job category"
              error={!!errors.email}
              helperText={errors.email?.message}
              size="small"
            />
            <FormInputMultiCheckbox
              control={control}
              setValue={setValue}
              name={"roles"}
              label={"Roles"}
              defaultValues={form.getValues("roles")}
              options={options}
            />
            <Button type="submit" variant={"contained"}>
              Submit
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default UpdateJob;
