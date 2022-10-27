import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateEmployeesFromFile } from '../../../redux/employee/employee.slice';
import Button, {Button_Variants} from '../../atoms/button/index';
import Input, { Input_Variants } from '../../atoms/input/index';

const CSVfileReader = () => {
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    dispatch(updateEmployeesFromFile(array));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div className='w-1/2 mx-auto'>
      <Input 
        type={Input_Variants.FILE}
        accept={".csv"}
        onChange = {handleOnChange}
      />

      <Button
        variant={Button_Variants.SUBMIT}
        click={(e) => handleOnSubmit(e)}
        additionalClass="mt-2 w-full justify-center"
      > 
        Process CSV
      </Button>
    </div>
  )
};

export default CSVfileReader;
