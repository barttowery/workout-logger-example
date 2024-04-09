import { render } from '@testing-library/react';

import ExerciseForm from './exercise-form';

describe('ExerciseForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExerciseForm />);
    expect(baseElement).toBeTruthy();
  });
});
