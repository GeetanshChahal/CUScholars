import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { register } from "../../Redux/Auth/AuthAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

//validation
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  name: yup.string().required("Name is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const { isRegisterSuccess, message } = authState;
  const [image, setImage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(image);
      const data = new FormData();
      await data.append("file", image);
      await data.append("upload_preset", "cuscholar");
      await data.append("cloud_name", process.env.REACT_APP_CLOUDNAME);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      );
      const cloudinaryData = await res.json();
      if (cloudinaryData?.url) {
        const updatedUserData = { ...values, pic: cloudinaryData.url };
        dispatch(register(updatedUserData));
      }
    },
  });

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success(message);
      navigate("/"); // to login
    } else {
      navigate("/register");
    }
  }, [navigate, isRegisterSuccess]);

  return (
    <div className="container">
      <div className="row w-530">
        <div className="col-sm-12 d-flex loginform">
          <div className="login-card card-block auth-body">
            <div className="authbox">
              <h1 className="brand-logo text-center">CUScholars</h1>
              <h3 className="text-secondary text-center">
                Sign up to see updates from your university mates
              </h3>
              <br />
              <ToastContainer />
              <div className="col-12">
                <form className="w-100" onSubmit={formik.handleSubmit}>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="icofont icofont-email"></i>
                    </span>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="form-control"
                      required
                      autoComplete="off"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="icofont icofont-name"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      required
                      autoComplete="off"
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="icofont icofont-password"></i>
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      required
                      autoComplete="off"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="file"
                      title="Select Profile Image"
                      className="form-control"
                      required
                      autoComplete="off"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div className="m-t-10 text-left">
                    <div className="forgot-password">
                      Have an Account?
                      <Link to="/" className="text-right f-w-600 text-inverse">
                        <i className="icofont icofont-lock"></i> Login
                      </Link>
                    </div>
                  </div>
                  <br />
                  <div className="m-t-20">
                    <button
                      className="btn btn-primary btn-md btn-block m-b-10 signupbtn"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
