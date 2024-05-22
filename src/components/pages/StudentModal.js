import moment from "moment";
import React, { useEffect } from "react";

function StudentModal({ data, studentData, onClose }) {
  useEffect(() => {
    console.log(data);
    console.log(studentData);
  }, []);
  return (
    <div>
      <div
        class="modal fade"
        id="studentModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content shadow-lg">
            <div class="modal-header p-2">
              <h6 class="modal-title" id="exampleModalLabel">
                Student Details
              </h6>
              <button
                type="button"
                class="btn btn-sm btn-dark ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onClose()}
              >
                Close
              </button>
            </div>
            <div class="modal-body">
                {
                    studentData ? <div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Name :</span>
                      <span className="fw-medium">{studentData?.name}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Date of Birth :</span>
                      <span className="fw-medium">
                        {moment(studentData?.dateOfBirth).format("DD-MMM-YYYY")}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Subject :</span>
                      <span className="fw-medium">{studentData?.subject}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Marks :</span>
                      <span className="fw-medium">{studentData?.marks}</span>
                    </div>
                  </div> : <div className="text-center">
                    <h6>No Record</h6>
                  </div>
                }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentModal;
