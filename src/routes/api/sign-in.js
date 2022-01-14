import { createSession, getCredentials, getUserByEmail } from '$lib/helpers/api';
import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body: { email, password } }) {
	const credentials = await getCredentials(email, password);
	await createSession(credentials.access_token)

  // ⚠️ CAUTION: Do not store a plain password like this. Use proper hashing and salting.
	// if (!user || user.password !== password) {
	// 	return {
	// 		status: 401,
	// 		body: {
	// 			message: 'Incorrect user or password',
	// 		},
	// 	};
	// }

	// const { id } = await createSession(email);
	return {
		status: 200,
		headers: {
			'Set-Cookie': serialize('directus_refresh_token', credentials.refresh_token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				Expires: credentials.expires, // 9000
			}),
		},
		body: {
			message: 'Successfully signed in',
		},
	};
}