import styles from './exercise-home.module.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExerciseList from '../exercise-list/exercise-list';
import ExerciseForm from '../exercise-form/exercise-form';
import { useGetExercisesQuery } from '../../../store/apiSlice';

/* eslint-disable-next-line */
export interface ExerciseHomeProps {}

export function ExerciseHome(props: ExerciseHomeProps) {
  const [openAdd, setOpenAdd] = useState(false);
  const {
    data: exercises = [],
    error,
    isLoading
  } = useGetExercisesQuery();

  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <h1>Workout Logger</h1>
      </header>
      <Button variant="contained" onClick={() => setOpenAdd(true)}>Record Workout</Button>
      <br/><br/>
      {error? (
        <p>Error occurred retrieving data</p>
      ) : isLoading ? (
        <p>Loading</p>
      ) : exercises ? (
        <div>
        <ExerciseList exercises={exercises}></ExerciseList>
        </div>
      ) : null }
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Record Workout"}
        </DialogTitle>
        <DialogContent>
          <ExerciseForm closeDialog={() => setOpenAdd(false)}></ExerciseForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ExerciseHome;
