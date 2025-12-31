import { PUBLIC_BAKERY_URL } from '$env/static/public';

export const config = {
	name: 'bakery-ui-sdk'
};

/* ------------------ SDK Generator ------------------ */
export async function generateSDK(openapiUrl, { token } = {}) {
	const spec = await fetch(openapiUrl).then((r) => r.json());
	const baseUrl = openapiUrl.replace(/\/openapi\.json$/, '');

	return createProxy({
		spec,
		baseUrl,
		token,
		path: []
	});
}
export const sdk = await generateSDK(`${PUBLIC_BAKERY_URL}/openapi.json`);
export let session = JSON.parse(localStorage.getItem('bakerui_session')) ?? { token: false };

/* ------------------ Proxy Core ------------------ */

function createProxy({ spec, baseUrl, token, path }) {
	return new Proxy(() => {}, {
		get(_, key) {
			if (key === 'then') return undefined;
			if (typeof key === 'symbol') return undefined;

			// HTTP methods
			if (['get', 'post', 'put', 'patch', 'delete'].includes(key)) {
				return createCaller({
					spec,
					baseUrl,
					token,
					path,
					method: key
				});
			}

			// Path segment
			return createProxy({
				spec,
				baseUrl,
				token,
				path: [...path, key.toString()]
			});
		}
	});
}

/* ------------------ Request Executor ------------------ */

function createCaller({ spec, baseUrl, token, path, method }) {
	return async function (payload) {
		const openapiPath = findPath(spec.paths, path);

		if (!openapiPath) {
			throw new Error(`No endpoint matches /${path.join('/')}`);
		}

		const operation = spec.paths[openapiPath]?.[method];
		if (!operation) {
			throw new Error(`Method ${method.toUpperCase()} not supported on ${openapiPath}`);
		}

		const url = buildUrl(baseUrl, openapiPath, path);

		const hasBody = ['post', 'put', 'patch'].includes(method);

		const headers = {
			...(token && { Authorization: `Bearer ${token}` })
		};

		let body;

		if (hasBody && payload !== undefined) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(payload);
		}

		const res = await fetch(url, {
			method: method.toUpperCase(),
			headers,
			body
		});

		const text = await res.text();
		const data = text ? JSON.parse(text) : null;

		if (!res.ok) {
			return {
				status: res.status,
				error: data,
				path: openapiPath,
				method
			};
		}

		return data;
	};
}

/* ------------------ Helpers ------------------ */

function findPath(paths, actualSegments) {
	for (const template of Object.keys(paths)) {
		const t = template.split('/').filter(Boolean);
		if (t.length !== actualSegments.length) continue;

		let match = true;
		for (let i = 0; i < t.length; i++) {
			if (t[i].startsWith('{')) continue;
			if (t[i] !== actualSegments[i]) {
				match = false;
				break;
			}
		}

		if (match) return template;
	}
	return null;
}

function buildUrl(baseUrl, template, actualSegments) {
	let url = baseUrl + template;
	const t = template.split('/').filter(Boolean);

	for (let i = 0; i < t.length; i++) {
		if (t[i].startsWith('{')) {
			const param = t[i].slice(1, -1);
			url = url.replace(`{${param}}`, actualSegments[i]);
		}
	}

	return url;
}

// ------------------ authorization ------------------ //
export async function login({ email, password }) {
	const response = await sdk.auth.login.post({ email, password });

	if (response.token) {
		sdk.token = response.token;
		session.token = response.token;
	}

	console.debug(response);

	session = response;

	localStorage.setItem('bakerui_session', JSON.stringify(session));

	return response;
}

export async function logout() {
	sdk.token = null;
	session = { token: false };
	localStorage.removeItem('bakerui_session');
}
