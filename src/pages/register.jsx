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
    <div className="bg-[url('/grid.svg')] bg-cover bg-center">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-16 min-h-[80dvh]">
        <div className="flex items-center gap-4 sm:gap-12 justify-center">
          <img
            src={"/rects.svg"}
            alt="circulars"
            className="max-w-[75px] sm:max-w-[150px] h-auto"
          />
          <div className="space-y-4 sm:space-y-8">
            <h2
              className="text-2xl md:text-5xl font-bold "
              style={{ color: "indigo" }}
            >
              Register
            </h2>
            <p className="text-lg md:text-xl">
              Already have account? Please&nbsp;
              <Link
                to="/login"
                className="hover:underline"
                style={{ color: "indigo" }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <form
          className="p-4 md:p-12 grid grid-cols-1 gap-3 my-auto backdrop-blur rounded-[10px] shadow-xl"
          style={{ border: "1px solid #f3f3f3" }}
        >
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
            style={{
              background: "indigo",
              color: "white",
              marginTop: "2rem",
            }}
          >
            {spinner ? <RefreshRounded className="animate-spin" /> : null}
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
