import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getEmployee } from "../redux/employee/employee.slice";
import Loader from "../components/atoms/loader/Loader";
import { useRouting } from "../helpers/routing.helper";
import EditEmployee from "../components/molecules/editEmployee/index";
import ConfirmationModal from "../components/molecules/confirmationModal/index";
import { setAlert } from "../redux/alerts/alert.slice";
import { ALERT_TYPES } from "../redux/alerts/alerts.constants";
import { Helper_Contants, ROUTE_VALUES } from "../helpers/helper.constants";
import Toast from "../components/molecules/toastr/index";
import moment from "moment";
import Commentsview from "../components/molecules/comments/index";
import { getEmployeeComments } from "../redux/comments/comments.slice";
import AllEmployeeList from "../components/molecules/allEmployeeList/index";

export default function EmployeeOverview() {
  const { id } = useParams();
  const { goToRoute } = useRouting();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { employeeDetails, isLoading } = useSelector(
    (state) => state.employeeManagement
  );

  const handleConfirmationChoice = (choice) => {
    setOpenConfirm(false);
    if(choice) {
      dispatch(deleteEmployee(employeeDetails._id))
      .unwrap()
      .then(() => {
        goToRoute(ROUTE_VALUES.HOME);
      }).catch((error) => {
        dispatch(setAlert({
          text: "Delete failed",
          type: ALERT_TYPES.ERROR
        }))
      })
    }
  };

  useEffect(() => { 
    dispatch(getEmployee(id));
    dispatch(getEmployeeComments(id));
  }, [id, dispatch]);

  return (
    <>
      <Toast />
      <main>
        {/* Page header */}
        {isLoading && employeeDetails ? (
          <Loader requireCount={10}/>
        ) : (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="relative">
                    {
                      employeeDetails.profileImgUrl ? (
                        <img
                          className="h-24 w-24 rounded-full"
                          src={`${Helper_Contants.BASEURL}/${employeeDetails.profileImgUrl}`}
                          alt="profile img"
                        />
                      ) : (
                        <svg
                          className="mx-auto h-24 w-24 rounded-full xl:h-24 xl:w-24 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )
                    }
                    <span
                      className="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {employeeDetails.lastName} {employeeDetails.firstName}
                  </h1>
                  <p className="text-sm font-medium text-gray-500">
                    Joined{" "}
                    on <time dateTime={employeeDetails.joinedOn}>{moment(employeeDetails.joinedOn).format("DD-MM-YYYY")}</time>
                  </p>
                </div>
              </div>
              <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <button
                  type="button"
                  onClick={() => setOpenEdit(true)}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200"
                >
                  Edit{" "}
                  <PencilIcon
                    className="h-5 w-5 ml-2 text-gray-500"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenConfirm(true)}
                  className="inline-flex items-center justify-center rounded-md border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-400"
                >
                  Delete{" "}
                  <TrashIcon
                    className="h-5 w-5 ml-2 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                {/* Description list*/}
                <section aria-labelledby="employee-information-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="employee-information-title"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Employee Information
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        About and information.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Role
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {employeeDetails.role}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {employeeDetails.email}
                          </dd>
                        </div>
                        {/* <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Salary expectation
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            $120,000
                          </dd>
                        </div> */}
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {employeeDetails.address}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            About
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {employeeDetails.about}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div></div>
                  </div>
                </section>

                {/* Comments*/}
                <section aria-labelledby="comments-title">
                  <Commentsview />
                </section>
              </div>

              <section
                aria-labelledby="timeline-title"
                className="lg:col-span-1 lg:col-start-3 shadow max-h-screen overflow-auto"
              >
               <AllEmployeeList />
              </section>
            </div>
          </>
        )}
      </main>
      <EditEmployee 
        open={openEdit}
        handleOpen={setOpenEdit}
        setOpenModal={() => setOpenEdit(false)}
      />
      <ConfirmationModal 
        open={openConfirm}
        handleOpen={setOpenConfirm}
        handleConfirmation = {handleConfirmationChoice}
      />
    </>
  );
}
