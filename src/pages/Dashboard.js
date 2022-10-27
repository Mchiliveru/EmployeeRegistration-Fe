import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/atoms/loader/Loader";
import { ROUTE_VALUES } from "../helpers/helper.constants";
import { useRouting } from "../helpers/routing.helper";
import { getAllEmployees } from "../redux/employee/employee.slice";

export default function Dashboard() {
  const { goToRoute } = useRouting();
  const dispatch = useDispatch();
  const { employees, isLoading } = useSelector((state) => state.employeeManagement);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  return (
    <div>
      {/* <Toast /> */}
      <main >
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-2xl font-bold leading-6 text-gray-900 border-b-2 p-4">
              GMBH Employees list
            </h2>
            <div className="bg-white">
              <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-12">
                <div className="space-y-6">
                  {
                    isLoading ? (
                      <Loader requireCount={10}/>
                    ) : (
                      <>
                      <ul
                        role="list"
                        className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
                      >
                        {employees.map((employee, key) => (
                          <li
                            key={key}
                            className="rounded-lg bg-gray-800 py-10 px-6 text-center xl:px-10 xl:text-left transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
                            onClick={() =>
                              goToRoute(
                                `${ROUTE_VALUES.EMPLOYEEDETAILS}/${employee._id}`
                              )
                            }
                          >
                            <div className="space-y-6 xl:space-y-10">
                              <svg
                                className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56 text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                              <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                                <div className="space-y-1 text-lg font-medium leading-6">
                                  <h3 className="text-white">{employee.lastName} {employee.firstName}</h3>
                                  <p className="text-indigo-400">
                                    {employee.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
