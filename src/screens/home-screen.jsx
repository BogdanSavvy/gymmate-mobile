import React, { useEffect } from 'react';
import { Button, Image, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchExercises,
	selectExercisesError,
	selectExercisesState,
	selectExercisesStatus,
} from '../redux/slices/exercisesSlice';

export const HomeScreen = () => {
	const dispatch = useDispatch();

	const exercises = useSelector(selectExercisesState);
	const status = useSelector(selectExercisesStatus);
	const error = useSelector(selectExercisesError);

	useEffect(() => {
		// if (status === 'idle') {
		// 	dispatch(fetchExercises(10));
		// }
	}, [status, dispatch]);

	const handlePress = () => {
		dispatch(fetchExercises(10));
	};

	return (
		<ScrollView>
			<Text>Home screen</Text>

			<Button onPress={handlePress} title="load exersices" />

			{status === 'loading' && <Text>Loading...</Text>}

			{status === 'error' && <Text>Error: {error}</Text>}

			{exercises.map(exercise => (
				<View key={exercise.id}>
					<Image
						source={{ uri: exercise.gifUrl }}
						style={{ width: 400, height: 400 }}
					/>
					<Text>{exercise.name}</Text>
				</View>
			))}
		</ScrollView>
	);
};
