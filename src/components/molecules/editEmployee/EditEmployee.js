import React from "react";
import DetailsForm from "../detailsForm/index";
import Modal from "../../atoms/modal/index";

const EditEmployee = ({ open, handleOpen, setOpenModal }) => {
  return (
    <Modal open={open} setOpen={handleOpen} width="w-1/2">
      <DetailsForm isFromEmployee={true} requireEdit={true} handleOpenModal={setOpenModal}/>
    </Modal>
  );
};

export default EditEmployee;
