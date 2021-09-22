import axios from 'axios';

export function loginAPI(payload) {
	return axios.post('/login', payload)
		.then(function (response) {
			// handle success
			console.log(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
}