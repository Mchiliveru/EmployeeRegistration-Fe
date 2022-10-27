import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CsvFileReader from '../components/molecules/csvFileReader/index';
import TableContent from '../components/molecules/tableContent/index';
import { updateEmployeesFromFile } from '../redux/employee/employee.slice';

export default function AddMultipleEmployee() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateEmployeesFromFile([]));
  }, [dispatch]);

  return (
    <>
        <div>
            <CsvFileReader />
        </div>
        <div>
            <TableContent />
        </div>
    </>
  )
}
