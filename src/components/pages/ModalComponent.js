import React from "react";
import { useNavigate } from "react-router-dom";

const ModalComponent = ({ deleteFunc, currentData }) => {
  const navigate = useNavigate();
  return (
    <div
      className="modal fade"
      id="customModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {currentData ? "Delete Confirmation ?" : "Logout Confirmation"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div
              className={`alert mb-0 ${
                currentData ? "alert-danger" : "alert-warning"
              }`}
            >
              {currentData
                ? "Are you sure want to delete this record?"
                : "Are you sure want to logout?"}
            </div>
          </div>
          <div className="modal-footer text-end">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              className={`btn ${currentData ? "btn-danger" : "btn-secondary"}`}
              onClick={() => {
                if (currentData) {
                  deleteFunc(currentData);
                } else {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                }
              }}
              data-bs-dismiss="modal"
            >
              {currentData ? "Delete" : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
