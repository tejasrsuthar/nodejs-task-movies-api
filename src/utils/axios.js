'use strict';

const axios = require("axios");

//apply base url for axios
const API_URL = process.env.OMDB_API_URL;

// create axios instance
const axiosApi = axios.create();

const DEBUG = process.env.NODE_ENV === "development"

// Interceptors
axiosApi.interceptors.request.use(
	config => {
		/** In dev, intercepts request and logs it into console for dev */
		if (DEBUG) {
			console.info("✉️ ", config)
		}
		return config
	},
	error => {
		if (DEBUG) {
			console.error("✉️ ", error)
		}
		return Promise.reject(error)
	}
)

axiosApi.interceptors.response.use(
	response => response.data,
	error => Promise.reject(error)
);


/**
 * axios get function 
 * @param {*} url 
 * @param {*} config 
 * @returns 
 */
async function get(url, config = {}) {
	return await axiosApi.get(url, { ...config }).then(response => response);
}

/**
 * axios post function 
 * @param {*} url 
 * @param {*} config 
 * @returns 
 */
function post(url, data, config = {}) {
	return axiosApi
		.post(url, { ...data }, { ...config })
		.then(response => response.data)
}

/**
 * axios put function 
 * @param {*} url 
 * @param {*} config 
 * @returns 
 */
function put(url, data, config = {}) {
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then(response => response.data)
}

/**
 * axios delete function 
 * @param {*} url 
 * @param {*} config 
 * @returns 
 */
async function del(url, config = {}) {
	return await axiosApi
		.delete(url, { ...config })
		.then(response => response.data)
}

module.exports = {
	get,
	post,
	axiosApi
}
