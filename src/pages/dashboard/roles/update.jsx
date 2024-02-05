/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Typography, Button, Stack, TextField } from "@mui/material";

import FormInputMultiCheckbox from "../../../components/form/multi-check";
import { BACKEND_URL } from "../../../utils/urls";
import axios from "axios";
import { notify } from "../../../App";
import { useEffect, useState } from "react";
import Loader from "../../../components/unique/loader";

const UpdateRole = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(true);
  const form = useForm({
    defaultValues: {
      role: "",
      locations: ["BN"],
    },
  });
  const { handleSubmit, formState, register, setValue, control } = form;
  const { errors } = formState;

  const PostNewRole = async (data) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/roles/${data._id}`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        notify("Role updated successfully!", "success");
        navigate("/dashboard/roles");
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    PostNewRole(data);
  };

  const FetchRoleList = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/roles/${searchParams.get("_id")}`
      );
      console.log(response);
      if (response.status === 200) {
        // form.formState.defaultValues = response.data.role;
        form.reset(response.data.role);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      notify("Something went wrong!", "error");
      setLoader(false);
    }
  };

  useEffect(() => {
    FetchRoleList();
  }, []);
  return (
    <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} width={400}>
            <Typography variant="h6">Update role</Typography>
            <TextField
              {...register("role", {
                required: "Role is required!",
              })}
              label="Role"
              error={!!errors.email}
              helperText={errors.email?.message}
              size="small"
            />
            <FormInputMultiCheckbox
              control={control}
              setValue={setValue}
              name={"locations"}
              label={"Locations"}
              defaultValues={form.getValues("locations")}
              options={options}
            />
            <Button
              type="submit"
              variant={"contained"}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update Role"}
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default UpdateRole;

const options = [
  {
    label: "Bangladesh",
    value: "BN",
  },
  {
    label: "India",
    value: "IN",
  },
];
