import axios from 'axios';
const baseURL = process.env.baseURL || "http://localhost:8445";

export function uploadAudioFileAPI(formData) {
	return axios.post(`${baseURL}/audio/upload_audio_file`, formData)
		.then(function (response) {
			// handle success
			const {data} = response;
			return data || {};
		})
		.catch(function (error) {
			// handle error
			console.log('error: ', error);
			return error.response && error.response.data;
		})
}

export function fetchAllFilesAPI() {
	return axios.get(`${baseURL}/audio/all-audios`)
		.then(function (response) {
			// handle success
			const {data} = response;
			return data || {};
		})
		.catch(function (error) {
			// handle error
			console.log('error: ', error);
			return error.response && error.response.data;
		})
}

export function downloadFileAPI(fileName) {
	return axios.get(`${baseURL}/audio/download?filename=${fileName}`,{method: 'GET',
	responseType: 'blob'})
		.then(function (response) {
			// handle success
			const {data} = response;
			return data || {};
		})
		.catch(function (error) {
			// handle error
			console.log('error: ', error);
			return error.response && error.response.data;
		})
}


export function deletAudioByIdAPI(audioId) {
	return axios.post(`${baseURL}/audio/delete-audio?id=${audioId}`)
		.then(function (response) {
			// handle success
			const {data} = response;
			return data || {};
		})
		.catch(function (error) {
			// handle error
			console.log(error);
			return error.response && error.response.data;
		})
}