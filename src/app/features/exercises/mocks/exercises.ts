import { ExerciseItem } from "../interfaces/exercise-item";

export const exercises: ExerciseItem[] = [
    {
        id: '1',
        name: '3 Mile Runx',
        type: 'Cardio',
        duration: 18,
        date: new Date(2024, 3, 1)
    },
    {
        id: '2',
        name: 'Bench Press',
        type: 'Strength',
        duration: null,
        date: new Date(2024, 3, 2)
    },
    {
        id: '3',
        name: 'Power Clean',
        type: 'Strength',
        duration: null,
        date: new Date(2024, 3, 3)
    },
    {
        id: '4',
        name: '5 Mile Run',
        type: 'Cardio',
        duration: 34,
        date: new Date(2024, 3, 4)
    },
];
