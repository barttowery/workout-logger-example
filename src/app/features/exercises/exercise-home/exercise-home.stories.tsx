import type { Meta, StoryObj } from '@storybook/react';
import { ExerciseHome } from './exercise-home';
import { exercises } from '../mocks/exercises';
import { Provider } from 'react-redux';
import { store } from './../../../store/store';

const meta: Meta<typeof ExerciseHome> = {
  component: ExerciseHome,
  title: 'Exercise Home',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};
export default meta;
type Story = StoryObj<typeof ExerciseHome>;

export const Primary = {
  args: {},
};
