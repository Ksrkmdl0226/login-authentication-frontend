import React, { useCallback, useContext, useEffect, useState } from "react";
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
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import StudentModal from "./StudentModal";

const Home = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = useState(null);
  const studentData = useSelector((state) => state?.students);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewCalendar, setViewCalendar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowDetails(true);
    document
      .getElementById("studentModal")
      ?.classList?.add("show", "d-block", "modal-open");
  };

  const getTileContent = ({ date }) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    const hasBirthdays = studentData?.some(
      (val) => moment(val?.dateOfBirth).format("YYYY-MM-DD") === dateString
    );
    return hasBirthdays ? (
      <div className="rounded-circle red-dot float-center position-absolute"></div>
    ) : null;
  };

  const initialFetch = useCallback(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  const handleCloseModal = () => {
    document
      .getElementById("exampleModal")
      .classList.remove("show", "d-block", "modal-open");
  };

  const fetchDetails = async (id) => {
    setStudentDetails(
      studentData?.find((value, index) => {
        return value?._id.toString() == id;
      })
    );
  };

  const initialValues = {
    name: studentDetails?.name ? studentDetails?.name : "",
    subject: studentDetails?.subject ? studentDetails?.subject : "",
    dateOfBirth: studentDetails?.dateOfBirth
      ? moment(studentDetails?.dateOfBirth).format("YYYY-MM-DD")
      : "",
    marks: studentDetails?.marks ? studentDetails?.marks : "",
  };

  const currentValidation = Yup.object().shape({
    name: Yup.string().required("Name Must be Filled."),
    subject: Yup.string().required("Subject Must be Filled."),
    dateOfBirth: Yup.string().required("Date of Birth must be Choose."),
    marks: Yup.string().required("Marks must be Filled"),
  });

  const deleteDetails = (id) => {
    dispatch(deleteStudent({ id: id }))
      .unwrap()
      .then((res) => {
        toast.success('Deleted Successfully.');
      })
      .catch((err) => toast.error(err?.message));
  };

  const submitHandler = async (values, { resetForm }) => {
    let extStudent = studentData?.find((item) => {
      return item?._id === studentDetails?._id;
    });

    if (extStudent) {
      let newData = {
        ...values,
        dateOfBirth: moment(values?.dateOfBirth).format(),
      };
      dispatch(updateStudent({ id: extStudent?._id, values: newData }))
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          handleCloseModal();
          resetForm();
        })
        .catch((err) => toast.error(err.message));
    } else {
      let exStudent = studentData?.find((item) => {
        return values?.name == item?.name && values?.subject == item?.subject;
      });
      let newData = {
        ...values,
        dateOfBirth: moment(values?.dateOfBirth).format(),
        marks: exStudent
          ? (parseInt(exStudent?.marks) + parseInt(values?.marks)).toString()
          : values?.marks,
      };
      if (exStudent) {
        dispatch(updateStudent({ id: exStudent?._id, values: newData }))
          .unwrap()
          .then((res) => {
            toast.success(res?.message);
            handleCloseModal();
            resetForm();
          })
          .catch((err) => toast.error(err.message));
      } else {
        dispatch(addStudent(newData))
          .unwrap()
          .then((res) => {
            toast.success(res?.message);
            handleCloseModal();
            resetForm();
          })
          .catch((err) => toast.error(err.message));
      }
    }
  };

  return (
    <div>
      <div className="">
        <Navbar setCurrentData={setCurrentData} />
        <div className="p-5 mt-5">
          <div>
            {!viewCalendar && (
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
            )}

            <button
              className="btn btn-outline-dark fw-bold ms-2"
              onClick={() => {
                setViewCalendar(!viewCalendar);
              }}
            >
              {!viewCalendar ? "View Calender" : "Close Calendar"}
            </button>
          </div>
          {viewCalendar ? (
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8 offset-0 offset-md-2">
                  <Calendar
                    tileContent={getTileContent}
                    onClickDay={handleDateClick}
                  />
                  {showDetails && (
                    <StudentModal
                      data={selectedDate}
                      studentData={studentData.find(
                        (item) =>
                          moment(item?.dateOfBirth).format(
                            "DD-MMM-YYYY hh:mm"
                          ) === moment(selectedDate).format("DD-MMM-YYYY hh:mm")
                      )}
                      onClose={() => setShowDetails(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <table className="table table-responsive table-hover mt-4">
              <thead>
                <tr>
                  <th className="text-secondary fs-6">Name</th>
                  <th className="text-secondary fs-6">Date of Birth</th>
                  <th className="text-secondary fs-6">Subject</th>
                  <th className="text-secondary fs-6">Marks</th>
                  <th className="text-secondary fs-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData?.map((item, index) => (
                  <tr key={index} className="lh-lg">
                    <td>
                      <span className="rounded-circle h6 p-2 px-3 fw-medium bg-info">
                        {item?.name?.charAt(0)}
                      </span>
                      <span className="ms-3 fs-6 fw-medium">{item?.name}</span>
                    </td>
                    <td className="fs-6 ps-2">
                      {moment(item?.dateOfBirth).format("DD-MMM-YYYY")}
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
          )}
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
                  onSubmit={submitHandler}
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
                          Date of Birth
                          <strong className="text-danger">*</strong>
                        </label>
                        <Field
                          name={"dateOfBirth"}
                          className="form-control form-border"
                          type="date"
                        />
                        <ErrorMessage name={"dateOfBirth"}>
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
