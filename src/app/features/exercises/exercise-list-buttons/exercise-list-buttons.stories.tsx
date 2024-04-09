import type { Meta, StoryObj } from '@storybook/react';
import { ExerciseListButtons } from './exercise-list-buttons';
import { exercises } from '../mocks/exercises';
import { Provider } from 'react-redux';
import { store } from './../../../store/store';

import { fn } from '@storybook/test';
const meta: Meta<typeof ExerciseListButtons> = {
  component: ExerciseListButtons,
  title: 'Exercise List Buttons',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {
    onDeleteClick: fn(),
    onEditClick: fn()
  }
};
export default meta;
type Story = StoryObj<typeof ExerciseListButtons>;

export const Primary = {
  args: {
    value: exercises[0]
  },
};

export const Secondary = {
  args: {
    value: exercises[1]
  },
};
