import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLogin } from "../../Action/StudentAction";
import logo from "../assets/logo1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const currentValidation = Yup.object().shape({
    email: Yup.string()
      .email("Email Incorrect")
      .required("Email Must be Filled."),
    password: Yup.string().required("Password must be filled."),
  });

  const onLoginSuccess = (data) => {
    console.log("success", data);
    toast.success(data?.message);
  };

  const onLoginError = (data) => {
    console.log("success", data);
    toast.success(data?.message);
  };

  const submitHandler = (values, { resetForm }) => {
    // dispatch(getLogin(values))
    //   .unwrap()
    //   .then((res) => {
    //     console.log(res);
    //     toast.success(res?.message);
    //     localStorage.setItem("accessToken", res?.token);
    //     navigate("/home");
    //   })
    //   .catch((err) => {
    //     toast.error(err?.message);
    //     console.log(err);
    //   });

    let res = axios
      .post(`http://localhost:5500/api/v1/auth/login`, values)
      .then((response) => {
        toast.success(response?.data?.message);
        localStorage.setItem("accessToken", response?.data?.token);
        resetForm();
        navigate("/home");
      })
      .catch((error) => toast.error(error?.response?.data?.message));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mt-3 mb-3">
          <img src={logo} alt="" height={80} width={180} />
        </div>
      </div>
      <div className="d-flex">
        <div
          className="mx-auto p-5 border-1 shadow-lg"
          style={{ width: "450px" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={submitHandler}
          >
            {({ values, setFieldValue, errors }) => (
              <Form autoComplete="true">
                <div className="form-group mt-2 mb-4">
                  <label className="form-Label mb-1">
                    Email<strong className="text-danger ms-2">*</strong>
                  </label>
                  <div className="input-group form-border">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <Field
                      name={"email"}
                      className="form-control"
                      type="text"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <ErrorMessage name={"email"}>
                    {(msg) => (
                      <div className="text-danger f-12 fw-medium">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-group mt-2 mb-2">
                  <label className="form-Label mb-1">
                    Password<strong className="text-danger ms-2">*</strong>
                  </label>
                  <div className="input-group form-border">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <Field
                      name={"password"}
                      className="form-control"
                      type="password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <ErrorMessage name={"password"}>
                    {(msg) => (
                      <div className="text-danger f-12 fw-medium">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="text-end">
                  <h6 className="f-14 text-primary">Forgot Password ?</h6>
                </div>

                <div className="mt-4 text-center">
                  <button type="submit" className="btn btn-dark w-75">
                    Login
                  </button>
                  <button type="reset" className="btn btn-secondary mt-2 w-75">
                    Reset
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
