import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://localhost:5500/api/v1",
});

const StudentApi = {
  getLogin: (values) => {
    return axiosIns.request({
      method: "POST",
      url: `/auth/login`,
      data: values,
    });
  },
  getStudentAll: () => {
    return axiosIns.request({
      method: "GET",
      url: `/auth/getStudents`,
    });
  },
  getStudentDetails: (id) => {
    return axiosIns.request({
      method: "GET",
      url: `/auth/getStudentDetails/${id}`,
    });
  },
  addStudent: (values) => {
    return axiosIns.request({
      method: "POST",
      url: `/auth/addStudent`,
      data: values,
    });
  },
  patchStudent: (id, values) => {
    return axiosIns.request({
      method: "PATCH",
      url: `/auth/updateStudent/${id}`,
      data: values,
    });
  },
  deleteStudent: (id) => {
    return axiosIns.request({
      method: "DELETE",
      url: `/auth/deleteStudent/${id}`,
    });
  },
};

export default StudentApi;
