import { useForm } from "react-hook-form";
import { Typography, Button, Stack, TextField } from "@mui/material";

import FormInputMultiCheckbox from "../../../components/form/multi-check";
import { BACKEND_URL } from "../../../utils/urls";
import axios from "axios";
import { notify } from "../../../App";
import { useNavigate } from "react-router-dom";

const CreateRole = () => {
  const navigate = useNavigate();
  const form = useForm({
    // resolver: zodResolver(RoleSchema),
    defaultValues: {
      role: "",
      locations: ["BN"],
    },
  });
  const { handleSubmit, formState, register, setValue, control } = form;
  const { errors } = formState;

  const PostNewRole = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/roles`, data);
      console.log(response);
      if (response.status === 200) {
        notify("Role created successfully!", "success");
        navigate("/dashboard/roles");
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
    }
  };

  const onSubmit = (data) => {
    PostNewRole(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <Typography variant="h6">Add new role</Typography>
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
            {form.formState.isSubmitting ? "Creating..." : "Create role"}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default CreateRole;

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
