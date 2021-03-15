import {
  Button,
  Row,
  Spacer,
  Text,
  Progress,
  Card
} from '@zeit-ui/react'
import { useState } from 'react'
import DeleteGoalModal from './DeleteGoalModal';
import AddAmountModal from './AddAmountModal';


const GoalCard = ({ goal, onEvent }) => {
  const [addAmountModalState, setAddAmountModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);


  const openDeleteConfirmation = () => {
    setDeleteModalState(true);
  }

  const openAddAmountModal = () => {
    setAddAmountModalState(true);
  }

  const onCloseDeleteConfirmation = () => {
    setDeleteModalState(false);
    onEvent({
      type: 'Delete'
    });
  }

  const onCloseAddAmountModal = () => {
    setAddAmountModalState(false);
    onEvent({
      type: 'Amount Addition'
    });
  }

  const goalPercentage = () => {
    return Math.round((goal.currentValue / goal.targetValue) * 100);
  }

  return (
    <>
      <Card>
        <Text h3>{goal.name}</Text>
        <Text small>({goalPercentage()}%)</Text>
        <Row>
          <Text>
            <Text b> Target: </Text> {goal.targetValue}
            <Text b> Current: </Text> {goal.currentValue}
          </Text>
        </Row>
        <Row justify="end" style={{ marginBottom: '10px' }}>
            <Button type="secondary" size="mini" onClick={openAddAmountModal}>Add Amount</Button>
            <Spacer x={1}/>
            <Button ghost type="error" size="mini" onClick={openDeleteConfirmation}>Delete</Button>
        </Row>
        <Progress value={goal.currentValue / goal.targetValue * 100} />
      </Card>

      <DeleteGoalModal goal={goal} show={deleteModalState} onClose={onCloseDeleteConfirmation} />
      <AddAmountModal goal={goal} show={addAmountModalState} onClose={onCloseAddAmountModal} />

    </>
  );
}

export default GoalCard;
