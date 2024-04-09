import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { factory, primaryKey, nullable } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* MSW Data Model Setup */
export const db = factory({
    exercise: {
        id: primaryKey(nanoid),
        name: String,
        type: String,
        duration: nullable(Number),
        date: String
    }
});

//Create an initial set of exercises
db.exercise.create({
    name: '3 Mile Run',
    type: 'Cardio',
    duration: 18,
    date: (new Date(2024, 3, 1)).toISOString()
});
db.exercise.create({
    name: 'Bench Press',
    type: 'Strength',
    duration: null,
    date: (new Date(2024, 3, 2)).toISOString()
});
db.exercise.create({
    name: 'Power Clean',
    type: 'Strength',
    duration: null,
    date: (new Date(2024, 3, 3)).toISOString()
});
db.exercise.create({
    name: '5 Mile Run',
    type: 'Cardio',
    duration: 34,
    date: (new Date(2024, 3, 4)).toISOString()
});

const serializeExercise = (exercise: any) => ({
    ...exercise
});

type AddExerciseParams = {};
type AddExerciseRequestBody = {
    name: string;
    type: string;
    duration: number | null;
    date: string;
};
type AddExerciseResponseBody = {
    id: number;
}
type UpdateExerciseParams = {
   id: string;
};
type UpdateExerciseRequestBody = {
    id: string;
    name: string;
    type: string;
    duration: number | null;
    date: string;
};
type UpdateExerciseResponseBody = {
    id: string;
    name: string;
    type: string;
    duration: number | null;
    date: string;
}
type DeleteExerciseParams = {
    id: string;
};
type DeleteExerciseRequestBody = {}
type DeleteExerciseResponseBody = {}
export const handlers = [
    http.get('/fakeApi/exercises', async function() {
        const exercises = db.exercise.getAll().map(serializeExercise);
        return HttpResponse.json(exercises);
    }),
    http.post<AddExerciseParams, AddExerciseRequestBody, AddExerciseResponseBody, '/fakeApi/exercises'>
        ('/fakeApi/exercises', async function ({ request }) {
        const data = await request.json();

        const exercise = db.exercise.create(data);
        return HttpResponse.json(serializeExercise(exercise));
    }),
    http.patch<UpdateExerciseParams, UpdateExerciseRequestBody, UpdateExerciseResponseBody, '/fakeApi/exercises/:id'>
        ('/fakeApi/exercises/:id', async ({ request, params }) => {
        const data = await request.json();

        const updatedExercise = db.exercise.update({
            where: { id: { equals: params.id } },
            data,
        });
        return HttpResponse.json(serializeExercise(updatedExercise));
    }),
    http.delete<DeleteExerciseParams, DeleteExerciseRequestBody, DeleteExerciseResponseBody, '/fakeApi/exercises/:id'>
        ('/fakeApi/exercises/:id', async ({ request, params }) => {
        const updatedExercise = db.exercise.delete({ where: { id: { equals: params.id }}});
        return HttpResponse.json(serializeExercise(updatedExercise));
    }),
];

export const worker = setupWorker(...handlers);
