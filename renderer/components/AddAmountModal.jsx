import React, { useEffect, useState } from 'react';
import {
  Row,
  Modal,
  Input,
} from '@zeit-ui/react'

import electron from 'electron';

const ipcRenderer = electron.ipcRenderer || false;

const AddAmountModal = ({show,onClose,goal}) => {
  const [amount,setAmount]=useState(0);

  const onModalSubmit = () => {
    if(ipcRenderer){
      ipcRenderer.send('addAmount',{id:goal.id,value:amount});
      ipcRenderer.on('addAmountResult',(event,res)=>{
        onClose();
      })
    }
  }

  return (
    <Modal open={show} onClose={onClose}>
        <Modal.Title>Add Amount</Modal.Title>
        <Modal.Content>
          <Row className="p-sm">
            <Input type="number" placeholder="Amount" width="100%" onKeyUp={(e) => setAmount(e.target.value)} />
          </Row>
        </Modal.Content>
        <Modal.Action passive>Cancel</Modal.Action>
        <Modal.Action onClick={onModalSubmit}>Add</Modal.Action>
      </Modal>
  )
}

export default AddAmountModal;
