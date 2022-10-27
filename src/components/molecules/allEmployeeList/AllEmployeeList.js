import React, { useState } from "react";
import Input, { Input_Variants } from "../../atoms/input";
import { useSelector } from "react-redux";
import { useRouting } from "../../../helpers/routing.helper";
import { ROUTE_VALUES } from "../../../helpers/helper.constants";

const AllEmployeeList = () => {
  const { employees } = useSelector((state) => state.employeeManagement);
  const [allEmployees, setAllEmployees] = useState(employees);
  const { goToRoute } = useRouting();

  const handleFilteredEmployees = (searchKey) => {
    const filteredEmployees = allEmployees.filter((employee) => {
      return (
        employee.userName.toLowerCase().includes(searchKey.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchKey.toLowerCase())
      );
    });
    setAllEmployees(filteredEmployees);
    if(!searchKey) {
        setAllEmployees(employees);
    }
  };

  return (
    <div>
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Directory</h2>
        <p className="mt-1 text-sm text-gray-600">
          Search directory of {employees.length} employees
        </p>
        <div className="mt-6 flex space-x-4">
          <div className="min-w-0 flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {/* <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
              </div>
              <Input
                type={Input_Variants.TEXT}
                name="search"
                id="search"
                placeholder="Search employee"
                handleChange={(e) => handleFilteredEmployees(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
          {allEmployees.map((employee, key) => (
            <li key={key} className="cursor-pointer" onClick={() => goToRoute(`${ROUTE_VALUES.EMPLOYEEDETAILS}/${employee._id}`)}>
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <svg
                    className="mx-auto h-10 w-10 rounded-full xl:h-10 xl:w-10 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                    {employee.lastName} {employee.firstName} 
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {employee.role}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AllEmployeeList;
