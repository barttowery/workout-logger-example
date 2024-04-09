import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExerciseItem } from '../features/exercises/interfaces/exercise-item';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/fakeApi'}),
    tagTypes: ['Exercises'],
    endpoints: (builder) => ({
        getExercises: builder.query<ExerciseItem[], void>({
            query: () => '/exercises',
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({ id }) => ({ type: 'Exercises' as const, id })),
                      { type: 'Exercises', id: 'LIST' },
                    ]
                  : [{ type: 'Exercises', id: 'LIST' }],
        }),
        addNewExercise: builder.mutation({
            query: (initialExercise) => ({
                url: '/exercises',
                method: 'POST',
                body: initialExercise
            }),
            invalidatesTags: ['Exercises']
        }),
        editExercise: builder.mutation({
            query: (exercise) => ({
                url: `exercises/${exercise.id}`,
                method: 'PATCH',
                body: exercise
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Exercises', id: arg.id} ],
        }),
        deleteExercise: builder.mutation({
            query: (id) => ({
                url: `exercises/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (exercise) => [{ type: 'Exercises', id: exercise?.id} ],
        })
    })
});

export const { useGetExercisesQuery, useEditExerciseMutation, useAddNewExerciseMutation, useDeleteExerciseMutation } = apiSlice;
