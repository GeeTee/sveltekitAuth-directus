import {DIRECTUS_URL} from './Env'

const logout = async (refresh_token) => {
    if (typeof refresh_token !== 'string') return

    const res = await fetch(`${DIRECTUS_URL}/graphql/system`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
            mutation ($refresh_token: String) {
                auth_logout(refresh_token: $refresh_token)
            }`,
            variables : {
                refresh_token
            }
        })
    })

    const {data} = await res.json()
    console.log('Logout : ', data)
    return data.auth_logout
}

const loging = async (email, password) => {
    if (typeof email !== 'string' || typeof password !== 'string') return

    const res = await fetch(`${DIRECTUS_URL}/graphql/system`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
            mutation {
                auth_login(email: "test-1@galites.net", password: "Gien++45500") {
                    access_token
                    refresh_token
                    expires
                }
            }`
        })
    })

    const {data} = await res.json()
    const {refresh_token, access_token, expires} = data.auth_login
    console.log('Loging : ', {refresh_token}, {access_token}, {expires})
    const credentials = {
        refresh_token,
        access_token,
        expires
    }
    return credentials

}

const getCurrentUser = async (access_token) => {
    const res = await fetch(`${DIRECTUS_URL}/graphql/system`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify({
            query: `
            query {
                users_me {
                    email
                    first_name
                }
            }`
        })
    })

    const {data} = await res.json()
    console.log('getCurrentUser json', data.users_me)
    return data.users_me
}

const reqServices = {
    loging,
    logout,
    getCurrentUser
}

export default reqServices;