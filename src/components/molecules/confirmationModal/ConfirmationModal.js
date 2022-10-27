import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button, {Button_Variants} from '../../atoms/button/index';
import Modal from '../../atoms/modal/index';

const ConfirmationModal = ({open, handleOpen, setOpenModal, handleConfirmation}) => {
  return (
    <Modal open={open} setOpen={handleOpen} width="w-1/4">
        <div className='text-center'>
            <p className='text-red-600 text-xl'>Are you sure to delete ?</p>
            <div className='flex justify-center space-x-6 pt-3'>
                <Button
                    variant={Button_Variants.DEFAULT}
                    click={() => handleConfirmation(false)}
                    additionalClass= "w-1/4 justify-center"
                >Cancel</Button>
                <Button
                    variant={Button_Variants.CANCEL}
                    click={() => handleConfirmation(true)}
                    additionalClass= "w-1/4 justify-center"
                >Sure</Button>
            </div>
        </div>
    </Modal>
  )
};

export default ConfirmationModal;
