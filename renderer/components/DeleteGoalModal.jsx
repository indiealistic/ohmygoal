import React from 'react';
import {
  Row,
  Modal,
  Input,
} from '@zeit-ui/react'

import electron from 'electron';

const ipcRenderer = electron.ipcRenderer || false;

const DeleteGoalModal = ({show,onClose,goal}) => {
  
  const onModalSubmit = () => {
    if(ipcRenderer){
      ipcRenderer.send('deleteGoal',{id:goal.id});
      ipcRenderer.on('deleteGoalResult',(event,res)=>{
        onClose();
      })
    }
  }

  return (
    <Modal open={show} onClose={onClose}>
        <Modal.Title>Delete Goal?</Modal.Title>
        <Modal.Action passive>Cancel</Modal.Action>
        <Modal.Action onClick={onModalSubmit} type="error">Delete</Modal.Action>
      </Modal>
  )
}

export default DeleteGoalModal;
