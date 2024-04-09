import styles from './exercise-form.module.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ExerciseItem } from '../interfaces/exercise-item';
import { useAddNewExerciseMutation, useEditExerciseMutation } from '../../../store/apiSlice';

type Inputs = {
  exerciseName: string;
  exerciseType: string;
  exerciseDuration: number | null;
  exerciseDate: Date;
}

/* eslint-disable-next-line */
export interface ExerciseFormProps {
  closeDialog: any;
  exercise?: ExerciseItem;
}

export function ExerciseForm(props: ExerciseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onTouched',
    defaultValues: {
      exerciseName: props.exercise?.name,
      exerciseType: props.exercise?.type,
      exerciseDuration: props.exercise?.duration,
      exerciseDate: props.exercise?.date
    }
  });
  const [addNewPost] = useAddNewExerciseMutation();
  const [editPost] = useEditExerciseMutation();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const exercise = {
      name: data.exerciseName,
      type: data.exerciseType,
      duration: data.exerciseType === 'Strength' ? null : data.exerciseDuration,
      date: data.exerciseDate
    }
    if(props.exercise?.id) {
      editPost({ id: props.exercise?.id, ...exercise});
    }
    else {
      addNewPost(exercise);
    }
    props.closeDialog();
  };

  return (
    <div className={styles['container']}>
      <p>Please record workout details below. Note that the time is in minutes and can only be entered with Cardio exercise types.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['form-fields']}>
          <div className={styles['form-field-section']}>
            <label>Exercise Name</label>
            <div className={styles['field-wrapper']}>
              <input className={styles['field']} {...register("exerciseName", { required: true })} />
            </div>
            <div className={styles['error-wrapper']}>
              {errors.exerciseName?.type === "required" && (
                <span role="alert">Exercise Name is required</span>
              )}
            </div>
          </div>
          <div className={styles['form-field-section']}>
            <label>Exercise Type</label>
            <div className={styles['field-wrapper']}>
              <select className={styles['field-select']} {...register("exerciseType", { required: true })}>
                <option value=""></option>
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
              </select>
            </div>
            <div className={styles['error-wrapper']}>
              {errors.exerciseType?.type === "required" && (
                <span role="alert">Exercise Type is required</span>
              )}
            </div>
          </div>
          <div className={styles['form-field-section']}>
            <label>Time (in minutes)</label>
            <div className={styles['field-wrapper']}>
              <input type='number' disabled={watch('exerciseType') === 'Strength'} className={styles['field']}
                {...register("exerciseDuration", { required: watch('exerciseType') !== 'Strength', min: 1, max: 1440 })} />
            </div>
            <div className={styles['error-wrapper']}>
              {errors.exerciseName?.type === "required" && (
                <span role="alert">Exercise Duration is required</span>
              )}
            </div>
          </div>
          <div className={styles['form-field-section']}>
            <label>Date</label><br/>
            <div className={styles['field-wrapper']}>
              <Controller
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <ReactDatePicker className={styles['field']}
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    selected={value}
                    maxDate={new Date()}
                  />
                )}
                control={control}
                rules={{ required: true }}
                name="exerciseDate"
                />
            </div>
            <div className={styles['error-wrapper']}>
              {errors.exerciseDate?.type === "required" && (
                <span role="alert">Date is required</span>
              )}
            </div>
          </div>
        </div>
        <div className={styles['form-buttons']}>
          <Button variant="outlined" onClick={() => props.closeDialog()}>CANCEL</Button>
          <Button disabled={!isValid} type="submit" variant="contained" color="success">SAVE</Button>
        </div>
      </form>
    </div>
  );
}

export default ExerciseForm;
