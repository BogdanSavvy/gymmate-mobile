import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExercises } from '../../api/api';

const initialState = {
	exercises: [],
	status: 'idle',
	error: null,
};

export const fetchExercises = createAsyncThunk(
	'exercises/fetchExercises',
	async (rateLimit, thunkAPI) => {
		const response = await getExercises(rateLimit);
		return response.data;
	},
);

export const exercisesSlice = createSlice({
	name: 'exercises',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchExercises.pending, (state, action) => {
			state.status = 'loading';
		});
		builder.addCase(fetchExercises.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.exercises = action.payload;
		});
		builder.addCase(fetchExercises.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		});
	},
});

//* Slice selectors
export const selectExercisesState = state => state.exercises.exercises;
export const selectExercisesStatus = state => state.exercises.status;
export const selectExercisesError = state => state.exercises.error;

//* Slice actions
export const {} = exercisesSlice.actions;

export default exercisesSlice.reducer;
