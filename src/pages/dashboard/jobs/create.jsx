import { useForm } from "react-hook-form";
import { Typography, Button, Stack, TextField } from "@mui/material";

import FormInputMultiCheckbox from "../../../components/form/multi-check";
import { BACKEND_URL } from "../../../utils/urls";
import axios from "axios";
import { notify } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../../components/unique/loader";
import { Link } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";

const CreateJob = () => {
  const navigate = useNavigate();
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
  const PostNewRole = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/jobs`, data);
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
    PostNewRole(mergedData);
  };

  const FetchRoleList = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/roles/unpublished`);
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
  }, []);
  return (
    <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} width={400}>
            <Typography variant="h6">Add new job category</Typography>
            {options.length ? (
              <>
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
                  defaultValues={form.getValues("locations")}
                  options={options}
                />
                <Button
                  type="submit"
                  variant={"contained"}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Creating..." : "Create job"}
                </Button>
              </>
            ) : (
              <Link
                to="/dashboard/roles/create"
                className="hover:underline flex items-center gap-2"
              >
                <ArrowRight /> Please add a role first!
              </Link>
            )}
          </Stack>
        </form>
      )}
    </>
  );
};

export default CreateJob;

// const options = [
//   {
//     label: "Bangladesh",
//     value: "BN",
//   },
//   {
//     label: "India",
//     value: "IN",
//   },
// ];
