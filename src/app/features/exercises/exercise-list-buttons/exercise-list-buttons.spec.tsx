import { render } from '@testing-library/react';

import ExerciseListButtons from './exercise-list-buttons';

describe('ExerciseListButtons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExerciseListButtons />);
    expect(baseElement).toBeTruthy();
  });
});
