// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';

import { ExerciseHome } from './features/exercises/exercise-home/exercise-home';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ExerciseHome />}></Route>
    </Routes>
  );
}

export default App;
