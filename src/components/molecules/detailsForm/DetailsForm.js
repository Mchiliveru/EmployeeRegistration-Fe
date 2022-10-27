import React, { useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import Input from "../../atoms/input";
import validator from "validator";
import { detailsForm_constants } from "./detailsForm.constants";
import Button, { Button_Variants } from "../../atoms/button";
import { registration } from "../../../redux/login/login.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouting } from "../../../helpers/routing.helper";
import { ROUTE_VALUES } from "../../../helpers/helper.constants";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
  updateEmployeeProfileImg,
  uploadProfileImg,
} from "../../../redux/employee/employee.slice";
import Toast from "../toastr/Toast";
import { setAlert } from "../../../redux/alerts/alert.slice";
import { ALERT_TYPES } from "../../../redux/alerts/alerts.constants";

const DetailsForm = ({ isFromEmployee, requireEdit, handleOpenModal }) => {
  const dispatch = useDispatch();
  const { goToRoute } = useRouting();
  //const [uploadedFile, setUploadedFile] = useState(null);

  const { employeeDetails } = useSelector((state) => state.employeeManagement);

  const initialFormFields = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    about: "",
    joinedOn: "",
    address: "",
    profileImgurl: "",
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const [errorMsgs, setErrorMsgs] = useState(initialFormFields);
  const roles = [
    {
      id: "1",
      roleName: "Director",
    },
    {
      id: "2",
      roleName: "Manager",
    },
    {
      id: "3",
      roleName: "Assistant Manager",
    },
    {
      id: "4",
      roleName: "Project Manager",
    },
    {
      id: "5",
      roleName: "Team lead",
    },
    {
      id: "6",
      roleName: "Senior developer",
    },
    {
      id: "7",
      roleName: "Developer",
    },
    {
      id: "8",
      roleName: "Junior developer",
    },
    {
      id: "9",
      roleName: "Intern",
    },
    {
      id: "10",
      roleName: "Reception",
    },
  ];

  const handleFormChange = (field, value) => {
    const newValues = {
      ...formFields,
      [field]: value,
    };
    setFormFields(newValues);
    const newErrorMsgs = { ...initialFormFields };
    if (validator.isEmpty(newValues.userName.trim())) {
      newErrorMsgs.userName = detailsForm_constants.userName.required;
    }
    if (validator.isEmpty(newValues.firstName.trim())) {
      newErrorMsgs.firstName = detailsForm_constants.firstName.required;
    }
    if (validator.isEmpty(newValues.lastName.trim())) {
      newErrorMsgs.lastName = detailsForm_constants.lastName.required;
    }
    if (validator.isEmpty(newValues.email.trim())) {
      newErrorMsgs.email = detailsForm_constants.email.required;
    }
    if (!validator.isEmail(newValues.email.trim())) {
      newErrorMsgs.email = detailsForm_constants.email.invalid;
    }
    if (validator.isEmpty(newValues.role.trim())) {
      newErrorMsgs.role = detailsForm_constants.role.required;
    }
    if (!isFromEmployee) {
      if (validator.isEmpty(newValues.password.trim())) {
        newErrorMsgs.password = detailsForm_constants.password.required;
      }
      if (validator.isEmpty(newValues.confirmPassword.trim())) {
        newErrorMsgs.confirmPassword =
          detailsForm_constants.confirmPassword.required;
      }
      if (newValues.password.length <= 6) {
        newErrorMsgs.password = detailsForm_constants.password.lengthError;
      }
      if (newValues.confirmPassword !== newValues.password) {
        newErrorMsgs.confirmPassword =
          detailsForm_constants.confirmPassword.mismatch;
      }
    }
    if (validator.isEmpty(newValues.about.trim())) {
      newErrorMsgs.about = detailsForm_constants.about.required;
    }
    if (validator.isEmpty(newValues.joinedOn)) {
      newErrorMsgs.joinedOn = detailsForm_constants.joinedOn.required;
    }
    if (validator.isEmpty(newValues.address.trim())) {
      newErrorMsgs.address = detailsForm_constants.address.required;
    }
    setErrorMsgs(newErrorMsgs);
  };

  const handleUploadImg = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    const fileUrl = fileReader.readAsDataURL(file);
    dispatch(updateEmployeeProfileImg(fileUrl));
    //setUploadedFile(file);
  };

  useEffect(() => {
    dispatch(setAlert({ text: "" }));
    if (requireEdit) {
      setFormFields(employeeDetails);
    }
  }, []);

  const isSignupDisabled = !!(
    formFields.userName === "" ||
    formFields.lastName === "" ||
    formFields.firstName === "" ||
    formFields.email === "" ||
    formFields.password === "" ||
    formFields.confirmPassword === "" ||
    formFields.role === "" ||
    formFields.about === "" ||
    formFields.address === ""
  );

  const isAddEmployeeDisabled = !!(
    formFields.userName === "" ||
    formFields.lastName === "" ||
    formFields.firstName === "" ||
    formFields.email === "" ||
    formFields.role === "" ||
    formFields.about === "" ||
    formFields.address === ""
  );

  const addSingleEmployee = () => {
    dispatch(createEmployee(formFields))
      .unwrap()
      .then((res) => {
        goToRoute(ROUTE_VALUES.HOME);
      })
      .catch((error) => {
        console.log("Error in adding:", error);
        dispatch(
          setAlert({
            text: error.message,
            type: ALERT_TYPES.ERROR,
          })
        );
      });
  };

  const createUser = () => {
    dispatch(registration(formFields))
      .unwrap()
      .then(() => {
        goToRoute(ROUTE_VALUES.LOGIN);
      })
      .catch((error) => {
        console.log("Error in registration:", error);
      });
  };

  const updateSingleEmployee = () => {
    dispatch(updateEmployee(formFields))
      .unwrap()
      .then((res) => {
        // if(uploadedFile) {
        //   let formData = new FormData();
        //   formData.append("fileType", "picture");
        //   formData.append("empId", employeeDetails._id);
        //   formData.append("userName", employeeDetails.userName);
        //   formData.append("file", uploadedFile);
        //   dispatch(uploadProfileImg(formData))
        //   .then(() => {
        //     dispatch(getEmployee(employeeDetails._id));
        //     setUploadedFile(null);
        //     handleOpenModal(false);
        //   })
        // } else {

        // }
        dispatch(getEmployee(employeeDetails._id));
        handleOpenModal(false);
      })
      .catch((error) => {
        console.log("Error while updating:", error);
        setAlert({
          text: "Something went wrong",
          type: ALERT_TYPES.ERROR,
        });
      });
  };

  return (
    <>
      <Toast />
      <div
        className={`${
          isFromEmployee ? "" : "w-1/2 shadow"
        } pt-8 bg-white mx-auto p-4`}
      >
        {!isFromEmployee && (
          <img src={logo} alt="logo" className="mx-auto mb-4" />
        )}
        <div>
          {requireEdit ? (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit Employee info
            </h3>
          ) : (
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Employee Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Information will be displayed on details page.
                </p>
              </div>
              {
                isFromEmployee && 
                <Button
                  variant={Button_Variants.SUBMIT}
                  click={() => goToRoute(ROUTE_VALUES.ADDMULIPLE)}
                >
                  Add Multiple Employees from file
                </Button>
              }
            </div>
          )}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <div className="flex items-center">
              <span className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 mr-4">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              {/* <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload image</span>
                <Input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  handleChange={(e) => handleUploadImg(e)}
                />
              </label> */}
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              User name
            </label>
            <div className="mt-1">
              <Input
                id="userName"
                type="text"
                name="userName"
                value={formFields.userName}
                handleChange={(e) =>
                  handleFormChange("userName", e.target.value)
                }
                isError={!!errorMsgs.userName}
              />
              {!!errorMsgs.userName && (
                <div className="text-sm text-red-600">{errorMsgs.userName}</div>
              )}
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <div className="mt-1">
              <Input
                id="firstName"
                type="text"
                name="firstName"
                value={formFields.firstName}
                handleChange={(e) =>
                  handleFormChange("firstName", e.target.value)
                }
                isError={!!errorMsgs.firstName}
              />
              {!!errorMsgs.firstName && (
                <div className="text-sm text-red-600">
                  {errorMsgs.firstName}
                </div>
              )}
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <div className="mt-1">
              <Input
                id="lastName"
                type="text"
                name="lastName"
                value={formFields.lastName}
                handleChange={(e) =>
                  handleFormChange("lastName", e.target.value)
                }
                isError={!!errorMsgs.lastName}
              />
              {!!errorMsgs.lastName && (
                <div className="text-sm text-red-600">{errorMsgs.lastName}</div>
              )}
            </div>
          </div>
          {!isFromEmployee && (
            <>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    handleChange={(e) =>
                      handleFormChange("password", e.target.value)
                    }
                    isError={!!errorMsgs.password}
                  />
                  {!!errorMsgs.password && (
                    <div className="text-sm text-red-600">
                      {errorMsgs.password}
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    handleChange={(e) =>
                      handleFormChange("confirmPassword", e.target.value)
                    }
                    isError={!!errorMsgs.confirmPassword}
                  />
                  {!!errorMsgs.confirmPassword && (
                    <div className="text-sm text-red-600">
                      {errorMsgs.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <Input
                id="email"
                type="text"
                name="email"
                value={formFields.email}
                handleChange={(e) => handleFormChange("email", e.target.value)}
                isError={!!errorMsgs.email}
              />
              {!!errorMsgs.email && (
                <div className="text-sm text-red-600">{errorMsgs.email}</div>
              )}
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <div className="mt-1">
              <select
                id="role"
                name="role"
                autoComplete="role"
                onChange={(e) => handleFormChange("role", e.target.value)}
                className={`${
                  !!errorMsgs.role
                    ? "border border-red-600"
                    : "border border-gray-300"
                } mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
              >
                <option
                  default
                  disabled
                  value=""
                  selected={formFields.role === ""}
                >
                  Select role
                </option>
                {roles.map((role, key) => (
                  <option
                    key={key}
                    value={role.roleName}
                    selected={formFields.role === role.roleName}
                  >
                    {role.roleName}
                  </option>
                ))}
              </select>
              {!!errorMsgs.role && (
                <div className="text-sm text-red-600">{errorMsgs.role}</div>
              )}
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                value={formFields.about}
                onChange={(e) => handleFormChange("about", e.target.value)}
                className={`${
                  !!errorMsgs.about
                    ? "border border-red-600"
                    : "border border-gray-300"
                } mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
              />
              {!!errorMsgs.about && (
                <div className="text-sm text-red-600">{errorMsgs.about}</div>
              )}
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="joinedOn"
              className="block text-sm font-medium text-gray-700"
            >
              Joined on
            </label>
            <div className="mt-1">
              <Input
                id="joinedOn"
                type="date"
                name="joinedOn"
                value={formFields.joinedOn}
                handleChange={(e) =>
                  handleFormChange("joinedOn", e.target.value)
                }
                isError={!!errorMsgs.joinedOn}
              />
              {!!errorMsgs.joinedOn && (
                <div className="text-sm text-red-600">{errorMsgs.joinedOn}</div>
              )}
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <Input
                id="address"
                type="text"
                name="address"
                value={formFields.address}
                handleChange={(e) =>
                  handleFormChange("address", e.target.value)
                }
                isError={!!errorMsgs.address}
              />
              {!!errorMsgs.address && (
                <div className="text-sm text-red-600">{errorMsgs.address}</div>
              )}
            </div>
          </div>
        </div>
        {isFromEmployee ? (
          <Button
            variant={Button_Variants.SUBMIT}
            additionalClass="block w-full mt-6"
            click={() => {
              requireEdit ? updateSingleEmployee() : addSingleEmployee();
            }}
            isDisabled={isAddEmployeeDisabled}
          >
            {requireEdit ? "Update Employee" : "Add Employee"}
          </Button>
        ) : (
          <Button
            variant={Button_Variants.SUBMIT}
            additionalClass="block w-full mt-6"
            click={() => createUser()}
            isDisabled={isSignupDisabled}
          >
            Register
          </Button>
        )}
      </div>
    </>
  );
};

export default DetailsForm;
