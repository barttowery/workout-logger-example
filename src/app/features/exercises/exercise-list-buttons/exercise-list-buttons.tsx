import { useState } from 'react';
import styles from './exercise-list-buttons.module.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteExerciseMutation, useEditExerciseMutation } from '../../../store/apiSlice';
import { ExerciseItem } from '../interfaces/exercise-item';
import ExerciseForm from '../exercise-form/exercise-form';

/* eslint-disable-next-line */
export interface ExerciseListButtonsProps {
  onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: ExerciseItem
}

export function ExerciseListButtons(props: ExerciseListButtonsProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteExercise] = useDeleteExerciseMutation();
  const [editExercise] = useEditExerciseMutation();

  const onCloseDelete = () => {
    deleteExercise(props.value.id);
    setOpenDelete(false);
  }
  const onCloseEdit = () => setOpenEdit(false);
  const onOpenEdit = () => {
    setOpenEdit(true);
  }
  const exercise: ExerciseItem = {
    id: props.value.id,
    name: props.value.name,
    duration: props.value.duration,
    type: props.value.type,
    date: props.value.date
  };

  return (
    <div className={styles['container']}>
      <IconButton onClick={() => onOpenEdit()}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => setOpenDelete(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Delete Exercise?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this exercise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenDelete(false)}>CANCEL</Button>
          <Button variant="contained" color="error" onClick={() => onCloseDelete()}>DELETE</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Edit Workout"}
        </DialogTitle>
        <DialogContent>
          <ExerciseForm closeDialog={() => setOpenEdit(false)} exercise={exercise}></ExerciseForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ExerciseListButtons;
