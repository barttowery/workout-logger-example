import type { Meta, StoryObj } from '@storybook/react';
import { ExerciseList } from './exercise-list';
import { exercises } from '../mocks/exercises';
import { Provider } from 'react-redux';
import { store } from './../../../store/store';

const meta: Meta<typeof ExerciseList> = {
  component: ExerciseList,
  title: 'Exercise List',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};
export default meta;
type Story = StoryObj<typeof ExerciseList>;

export const Primary = {
  args: {
    exercises: exercises
  },
};

export const Empty = {
  args: {
    exercises: []
  },
};
