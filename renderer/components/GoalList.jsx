import React, { useEffect, useState } from 'react';
import {
  Row,
  Button,
  Modal,
  Input,
  Spacer,
} from '@zeit-ui/react'

import GoalCard from './GoalCard';

import electron from 'electron';

const ipcRenderer = electron.ipcRenderer || false;

const GoalList = () => {
  const [allGoals, setAllGoals] = useState([]);
  const [modelState, setModelState] = useState(false);
  const [newGoalData, setNewGoalData] = useState({ name: '', value: '' });

  const openModel = () => {
    setModelState(true);
  }

  const onModalClose = () => {
    setModelState(false);
  }

  const onModalSubmit = () => {
    if (ipcRenderer) {
      ipcRenderer.send('addGoal', newGoalData)
    }

    ipcRenderer.on('addGoalResult', () => {
      fetchGoals();
      onModalClose();
    });
  }

  const handleCardEvent = (event) => {
    fetchGoals();
  }

  const fetchGoals = () => {
    if (ipcRenderer) {
      ipcRenderer.send('fetchAllGoals', {});

      ipcRenderer.on('fetchAllGoalsResult', (event, res) => {
        setAllGoals(res.data);
      });
    }
  }

  useEffect(() => {
    fetchGoals()

    return () => {

    }
  }, [])

  return (
    <>
      <Row justify="end" style={{ marginBottom: '10px' }}>
        <Button shadow type="secondary" size="small" onClick={() => openModel()}>
          Add Goal
          </Button>
      </Row>

      {allGoals.filter(Boolean).map(goalItem => (
        <>
          <Row key={goalItem.id} style={{ marginBottom: '15px' }}>
            <GoalCard goal={goalItem} onEvent={handleCardEvent}></GoalCard>
          </Row>
          <Spacer y={1} />
        </>
      ))
      }

      <Modal open={modelState} onClose={onModalClose}>
        <Modal.Title>Add New Goal</Modal.Title>
        <Modal.Content>
          <Row className="p-sm">
            <Input placeholder="Name" width="100%" onKeyUp={(e) => setNewGoalData({ ...newGoalData, name: e.target.value })} />
          </Row>
          <Row className="p-sm">
            <Input type="number" placeholder="Target Value" width="100%" onKeyUp={(e) => setNewGoalData({ ...newGoalData, value: e.target.value })} />
          </Row>

        </Modal.Content>
        <Modal.Action passive>Cancel</Modal.Action>
        <Modal.Action onClick={onModalSubmit}>Add</Modal.Action>
      </Modal>
    </>
  )
}

export default GoalList;
