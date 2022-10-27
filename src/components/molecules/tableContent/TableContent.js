import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTE_VALUES } from "../../../helpers/helper.constants";
import { useRouting } from "../../../helpers/routing.helper";
import { setAlert } from "../../../redux/alerts/alert.slice";
import { ALERT_TYPES } from "../../../redux/alerts/alerts.constants";
import { createMultipleEmployees, updateEmployeesFromFile } from "../../../redux/employee/employee.slice";
import Button, {Button_Variants} from "../../atoms/button/index";
import Toast from "../toastr/index";

const TableContent = () => {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { employeesFromFile } = useSelector(
    (state) => state.employeeManagement
  );
  const dispatch = useDispatch();
  const { goToRoute } = useRouting();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  useLayoutEffect(() => {
    const isIndeterminate =
      selectedEmployees.length > 0 &&
      selectedEmployees.length < employeesFromFile.length;
    setChecked(selectedEmployees.length === employeesFromFile.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) checkbox.current.indeterminate = isIndeterminate;
  }, [selectedEmployees]);

  function toggleAll() {
    setSelectedEmployees(checked || indeterminate ? [] : employeesFromFile);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleSaveMultipleEmployees = () => {
    dispatch(createMultipleEmployees(selectedEmployees))
    .unwrap()
    .then(() => {
        goToRoute(ROUTE_VALUES.HOME);
        dispatch(updateEmployeesFromFile([]));
    }).catch((error) => {
        dispatch(setAlert({
            text: "Something went wrong while creating",
            type: ALERT_TYPES.ERROR
        }))
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Toast />
      {employeesFromFile.length === 0 ? (
        <p className="text-center text-2xl italic py-12">
          Processed Data will be displayed here
        </p>
      ) : (
        <>
          <div className="sm:flex sm:items-center mt-4">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Employees</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of employees from file.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Button
                variant={Button_Variants.SUBMIT}
                isDisabled = {selectedEmployees.length === 0}
                click = {() => handleSaveMultipleEmployees()}
               >
                Add Selected Employees
              </Button>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  {/* {selectedEmployees.length > 0 && (
                    <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Bulk edit
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Delete all
                      </button>
                    </div>
                  )} */}
                  <table className="min-w-full table-fixed divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="relative w-12 px-6 sm:w-16 sm:px-8"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          User name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          First name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Last name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          About
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Joined on
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Addrees
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Zip
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Country
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {employeesFromFile.map((employee) => (
                        <tr
                          key={employee.email}
                          className={
                            selectedEmployees.includes(employee)
                              ? "bg-gray-50"
                              : undefined
                          }
                        >
                          <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                            {selectedEmployees.includes(employee) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                              value={employee.email}
                              checked={selectedEmployees.includes(employee)}
                              onChange={(e) =>
                                setSelectedEmployees(
                                  e.target.checked
                                    ? [...selectedEmployees, employee]
                                    : selectedEmployees.filter(
                                        (p) => p !== employee
                                      )
                                )
                              }
                            />
                          </td>
                          <td
                            className={classNames(
                              "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                              selectedEmployees.includes(employee)
                                ? "text-indigo-600"
                                : "text-gray-900"
                            )}
                          >
                            {employee.userName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.firstName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.lastName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.about}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.joinedOn}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.streetAddress}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.city}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.zip}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.country}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TableContent;
