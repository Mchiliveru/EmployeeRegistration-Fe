import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import {
  Helper_Contants,
  ROUTE_VALUES,
} from "../../../helpers/helper.constants";
import { useRouting } from "../../../helpers/routing.helper";
import { setSessionVariable } from "../../../helpers/session.maintainance";
import logo from "../../../images/logo.png";
import { login } from "../../../redux/login/login.slice";
import Button, { Button_Variants } from "../../atoms/button/index";
import Input, { Input_Variants } from "../../atoms/input/index";
import Loader from "../../atoms/loader/Loader";

export default function LoginForm() {
  const { goToRoute } = useRouting();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.userManagement);

  const initialFormFields = {
    userName: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(initialFormFields);
  const [errorMsgs, setErrorMsgs] = useState(initialFormFields);

  const handleFormChange = (field, value) => {
    const newValues = {
      ...formFields,
      [field]: value,
    };
    setFormFields(newValues);
    const newErrorMsgs = { ...initialFormFields };
    if (validator.isEmpty(newValues.userName.trim())) {
      newErrorMsgs.userName = "Required *";
    }
    if (validator.isEmpty(newValues.password.trim())) {
      newErrorMsgs.password = "Required *";
    }
    setErrorMsgs(newErrorMsgs);
  };

  const isLoginDisabled = !!(
    formFields.userName === "" || formFields.password === ""
  );

  const handleLogin = () => {
    console.log("FormFields:", formFields);
    dispatch(login(formFields))
      .unwrap()
      .then((res) => {
        console.log("response:", res);
        setSessionVariable(Helper_Contants.USERINFO, JSON.stringify(res));
        goToRoute(ROUTE_VALUES.HOME);
      });
  };

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <img src={logo} alt="logo" className="mx-auto mb-4" />
          {isLoading ? (
            <Loader requireCount={8} />
          ) : (
            <>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username / Email address
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="userName"
                      additionalClasses="block w-full"
                      type={Input_Variants.TEXT}
                      handleChange={(e) =>
                        handleFormChange("userName", e.target.value)
                      }
                    />
                    {
                        !!errorMsgs.userName && (
                        <div className="text-sm text-red-600">
                            {errorMsgs.userName}
                        </div>
                        )
                    }
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={Input_Variants.PASSWORD}
                      additionalClasses="block w-full"
                      handleChange={(e) =>
                        handleFormChange("password", e.target.value)
                      }
                    />
                    {
                        !!errorMsgs.password && (
                        <div className="text-sm text-red-600">
                            {errorMsgs.password}
                        </div>
                        )
                    }
                  </div>
                </div>
                {
                    errorMessage && 
                    <div className="py-4 w-full justify-center mt-4 bg-red-300 rounded-md shadow text-center text-red-700">
                        {errorMessage}
                    </div>
                }
                
                <div>
                  <Button
                    variant={Button_Variants.SUBMIT}
                    additionalClass="w-full justify-center mt-4"
                    click={() => handleLogin()}
                    isDisabled={isLoginDisabled}
                  >
                    Sign in
                  </Button>
                </div>
              </div>
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Not yet register?
                  </span>
                </div>
              </div>
              <div>
                <Button
                  variant={Button_Variants.SUBMIT}
                  additionalClass="w-full justify-center mt-4"
                  click={() => goToRoute(ROUTE_VALUES.REGISTRATION)}
                >
                  Register
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
