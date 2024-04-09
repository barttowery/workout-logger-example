import { render } from '@testing-library/react';

import ExerciseHome from './exercise-home';

describe('ExerciseHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExerciseHome />);
    expect(baseElement).toBeTruthy();
  });
});
