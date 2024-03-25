import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://exercisedb.p.rapidapi.com',
	headers: {
		'X-RapidAPI-Key': process.env.EXERCISESDB_API_KEY,
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
	},
});

export const getExercises = async (rateLimit = 10) => {
	return instance.get('/exercises', { params: { limit: rateLimit } });
};
