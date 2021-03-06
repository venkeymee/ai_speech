import axios from 'axios';
const baseURL = process.env.baseURL || "http://localhost:8445";

export function loginAPI(payload) {
	return axios.post(`${baseURL}/user/login`, payload)
		.then(function (response) {
			// handle success
			const {data} = response;
			return data || {};
		})
		.catch(function (error) {
			// handle error
			console.log('error: ', error);
			// debugger;
			return error.response && error.response.data;
		})
}

export function signUpAPI(payload) {
	return axios.post(`${baseURL}/user/signup`, payload)
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

export function getUserInfoByIdAPI(userId, payload) {
	return axios.get(`${baseURL}/user/userbyid?id=${userId}`, payload)
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

export function deleteUserInfoByIdAPI(userId) {
	return axios.post(`${baseURL}/user/delete-user?id=${userId}`)
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

export function updateUserInfoByIdAPI(userId, payload) {
	return axios.post(`${baseURL}/user/update-user`, payload)
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

export function fetchUsersListAPI() {
	return axios.get(`${baseURL}/user/all-users`)
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
