import { Button, Input } from "@mui/material";
import { useState } from "react";
import ErrorBar from "../components/unique/errorbar";
import { EmailRGX } from "../utils/regex";
import axios from "axios";
import { BACKEND_URL } from "../utils/urls";
import { Link } from "react-router-dom";
import { setCookie } from "../utils/cookies";
import { RefreshRounded } from "@mui/icons-material";
import { notify } from "../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(formData);
  const [spinner, setSpinner] = useState(false);

  const FetchRegisterAPI = async () => {
    setSpinner(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        setCookie("token", response.data.token);
        notify("Registration successful!", "success");
        navigate("/dashboard");
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!", "error");
      setSpinner(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errorsInPaw = validation(formData);
    if (Object.keys(errorsInPaw).length === 0) {
      FetchRegisterAPI();
    }
    setErrors(errorsInPaw);
  };

  const validation = (data) => {
    let err = {};
    if (!data.name.trim()) {
      err.name = "Name is required!";
    }
    if (!data.email.trim()) {
      err.email = "Email is required!";
    }
    if (data.email && !EmailRGX.test(data.email)) {
      err.email = "Invalid email format!";
    }
    if (!data.password.trim()) {
      err.password = "Password is required!";
    } else if (data.password.length < 8) {
      err.password = "Must have 8 characters!";
    }

    return err;
  };
  return (
    <div className="container mx-auto">
      <form className="max-w-[300px] mx-auto py-20 grid grid-cols-1 gap-3">
        <div className="grid grid-cols-1">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <Input name="name" type="text" onChange={handleOnChange} />
          <ErrorBar props={{ text: errors?.name }} />
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <Input name="email" type="email" onChange={handleOnChange} />
          <ErrorBar props={{ text: errors?.email }} />
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input name="password" type="password" onChange={handleOnChange} />
          <ErrorBar props={{ text: errors?.password }} />
        </div>

        <Button
          variant="contained"
          onClick={handleOnSubmit}
          className="w-full mt-10"
        >
          {spinner ? <RefreshRounded className="animate-spin" /> : null}
          Register
        </Button>
      </form>
      <Link to="/login" className="text-center hover:text-primary w-full block">
        Already have account? Login now!
      </Link>
    </div>
  );
};

export default Register;
