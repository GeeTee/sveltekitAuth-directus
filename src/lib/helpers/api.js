import { v4 as uuidv4 } from 'uuid';
import d from '$lib/helpers/directus'

const users = [
	{
		email: 'mail@example.com',
		// ⚠️ CAUTION: Do not store a plain password like this. Use proper hashing and salting.
		password: 'thisisnotsecret',
	},
];

let sessions = [];

export const getCredentials = async (email, password) => {
	const credentials = await d.loging(email, password)
	if (!credentials) return Promise.resolve(null);
	return Promise.resolve(credentials)
}

// export const getUser = async (email, password) => {
// 	// USER EXIST ?
// 	const existingUser = users.find((user) => user.email === email);



// 	const user = await d.getCurrentUser()

// 	return Promise.resolve(existingUser);
// };

export const registerUser = (user) => {
	const existingUser = users.find((u) => u.email === user.email);
	if (!!existingUser) return Promise.reject(new Error('User already exists'));
	users.push(user);
	return Promise.resolve(user);
};

export const createSession = async (access_token) => {
	const {email} = await d.getCurrentUser(access_token)
	const session = {
		id: uuidv4(),
		email,
	};
	sessions.push(session);
	console.log('createSession sessions', sessions)
	return Promise.resolve(session);
};

export const getSession = (id) => {
	const session = sessions.find((session) => session.id === id);
	if (!session) return Promise.resolve(null);
	return Promise.resolve(session);
};

export const removeSession = (id) => {
	const session = sessions.find((session) => session.id === id);
	if (!session) return Promise.reject(new Error('Session not found'));
	sessions = sessions.filter((session) => session.id !== id);
	return Promise.resolve(session);
};