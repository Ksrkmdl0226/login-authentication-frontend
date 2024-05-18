import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteStudent,
  getStudentDetails,
  getStudents,
  updateStudent,
} from "../../Action/StudentAction";
import ModalComponent from "./ModalComponent";

const Home = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const dispatch = useDispatch();
  const [studentsList, setStudentsList] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    dispatch(getStudents(onSuccess, onError));
  };

  const onSuccess = (data) => {
    setStudentsList(
      data?.data?.sort((val1, val2) => val2?.marks - val1?.marks)
    );
  };
  const onError = (data) => {
    toast.error(data?.message)
  };

  const handleCloseModal = () => {
    document
      .getElementById("exampleModal")
      .classList.remove("show", "d-block", "modal-open");
  };

  const fetchDetails = async (id) => {
    dispatch(getStudentDetails({ id: id, onDetailsSuccess, onDetailsError }));
  };

  const onDetailsSuccess = (data) => {
    setStudentDetails(data?.data);
  };
  const onDetailsError = (data) => {
    toast.error(data?.message);
  };

  const onDeleteSuccess = (data) => {
    toast.success(data?.message);
    setCurrentData(null);
    initialFetch();
  };
  const onDeleteError = (data) => {
    toast.error(data?.message);
  };

  const deleteDetails = async (id) => {
    dispatch(deleteStudent({ id: id, onDeleteSuccess, onDeleteError }));
  };

  const initialValues = {
    name: studentDetails?.name ? studentDetails?.name : "",
    subject: studentDetails?.subject ? studentDetails?.subject : "",
    marks: studentDetails?.marks ? studentDetails?.marks : "",
  };

  const currentValidation = Yup.object().shape({
    name: Yup.string().required("Name Must be Filled."),
    subject: Yup.string().required("Subject Must be Filled."),
    marks: Yup.string().required("Marks must be Filled"),
  });

  const onAddSuccess = (data) => {
    ("success", data);
    toast.success(data?.message);
    initialFetch();
    handleCloseModal();
  };
  const onAddError = (data) => {
    toast.error(data?.message);
    handleCloseModal();
  };

  const onSubmit = async (values, { resetForm }) => {
    if (studentDetails) {
      dispatch(
        updateStudent({
          id: studentDetails._id,
          values: values,
          onAddSuccess,
          onAddError,
        })
      );
    } else {
      dispatch(addStudent({ values: values, onAddSuccess, onAddError }));
      resetForm();
    }
    resetForm();
  };

  return (
    <div>
      <div className="">
        <Navbar setCurrentData={setCurrentData} />
        <div className="p-5 mt-5">
          <div>
            <button
              className="btn btn-outline-dark fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setStudentDetails(null);
              }}
            >
              Add
            </button>
          </div>
          <table className="table table-responsive table-hover mt-4">
            <thead>
              <tr>
                <th className="text-secondary fs-6">Name</th>
                <th className="text-secondary fs-6">Subject</th>
                <th className="text-secondary fs-6">Marks</th>
                <th className="text-secondary fs-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {studentsList?.map((item, index) => (
                <tr key={index} className="lh-lg">
                  <td>
                    <span className="rounded-circle h6 p-2 px-3 fw-medium bg-info">
                      {item?.name?.charAt(0)}
                    </span>
                    <span className="ms-3 fs-6 fw-medium">{item?.name}</span>
                  </td>
                  <td className="fs-6 ps-2">{item?.subject}</td>
                  <td className="fs-6 ps-2">{item?.marks}</td>
                  <td className="fs-6 ps-2">
                    <div className="dropdown">
                      <button
                        className="btn btn-dark rounded-circle btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li>
                          <a
                            className="dropdown-item f-14 fw-medium"
                            style={{ cursor: "pointer" }}
                            onClick={() => fetchDetails(item?._id)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Update
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item f-14 fw-medium"
                            onClick={() => setCurrentData(item?._id)}
                            // onClick={() => deleteDetails(item?._id)}
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#customModal"
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {studentDetails ? "Update Details" : "Add Student"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={currentValidation}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  // innerRef={ref}
                >
                  {({ values, setFieldValue, errors }) => (
                    <Form>
                      <div className="form-group mt-2">
                        <label className="form-Label mb-1">
                          Name<strong className="text-danger">*</strong>
                        </label>
                        <Field
                          name={"name"}
                          className="form-control form-border"
                          type="text"
                        />
                        <ErrorMessage name={"name"}>
                          {(msg) => (
                            <div className="text-danger f-12">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="form-group mt-2">
                        <label className="form-Label mb-1">
                          Subject<strong className="text-danger">*</strong>
                        </label>
                        <Field
                          name={"subject"}
                          className="form-control form-border"
                          type="text"
                        />
                        <ErrorMessage name={"subject"}>
                          {(msg) => (
                            <div className="text-danger f-12">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="form-group mt-2">
                        <label className="form-Label mb-1">
                          Marks<strong className="text-danger">*</strong>
                        </label>
                        <Field
                          name={"marks"}
                          className="form-control form-border"
                          type="text"
                        />
                        <ErrorMessage name={"marks"}>
                          {(msg) => (
                            <div className="text-danger f-12">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="mt-3 float-end">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-success ms-2">
                          Save
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* delete modal */}
      <ModalComponent deleteFunc={deleteDetails} currentData={currentData} />
    </div>
  );
};

export default Home;
