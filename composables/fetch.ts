import { FetchOptions } from "ohmyfetch";
import { useTokenStore } from '@/stores/tokenStore';

const apiRoute: string = import.meta.env.VITE_API_URL;

export const useToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const useApi = async (url: string, options?: FetchOptions) => {
	let token = useToken();

	const headers: HeadersInit = {
		Accept: "application/json",
		"Authorization": "Bearer " + token,
		...options?.headers
	};

	const opts: FetchOptions = options ? (({ headers, ...opts }) => opts)(options) : null;

	const baseURL = !options?.baseURL ? apiRoute : options.baseURL;

	return useFetch(url, {
		baseURL: baseURL,
		credentials: "include", // Allow browser to handle cookies
		headers,
		...opts
	});
};