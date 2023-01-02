const apiRoute = import.meta.env.VITE_API_URL;

export const useToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const useApi = async (url, options) => {
	let token = useToken();

	const headers = {
		Accept: "application/json",
		"Authorization": "Bearer " + token,
		...options?.headers
	};

	const opts = options ? (({ headers, ...opts }) => opts)(options) : null;

	const baseURL = !options?.baseURL ? apiRoute : options.baseURL;

	return useFetch(url, {
		baseURL: baseURL,
		credentials: "include", // Allow browser to handle cookies
		headers,
		...opts
	});
};