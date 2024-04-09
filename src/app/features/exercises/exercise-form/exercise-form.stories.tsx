import type { Meta, StoryObj } from '@storybook/react';
import { ExerciseForm } from './exercise-form';
import { exercises } from '../mocks/exercises';
import { Provider } from 'react-redux';
import { store } from './../../../store/store';

const meta: Meta<typeof ExerciseForm> = {
  component: ExerciseForm,
  title: 'Exercise Form',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};
export default meta;
type Story = StoryObj<typeof ExerciseForm>;

export const Primary = {
  args: {},
};
