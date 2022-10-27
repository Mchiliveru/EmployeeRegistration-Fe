import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const { text, type } = useSelector((state) => state.alertManagement);
  const notify = () => {
    toast[`${type}`](`${text}`)
  };

  useEffect(() => {
    notify();
  }, [text]);

  return (
    <>
        {
            text && <ToastContainer />
        }
    </>
  )
};

export default Toast;
