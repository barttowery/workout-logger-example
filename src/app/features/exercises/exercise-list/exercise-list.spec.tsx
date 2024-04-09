import { render } from '@testing-library/react';

import ExerciseList from './exercise-list';

describe('ExerciseList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExerciseList />);
    expect(baseElement).toBeTruthy();
  });
});
