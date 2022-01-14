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
                }
            }`
        })
    })

    const {data} = await res.json()
    const {refresh_token} = data.auth_login
    console.log('Loging : ', {refresh_token})
    return refresh_token

}

const getCurrentUser = async () => {
    const res = await fetch(`${DIRECTUS_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    const json = await res.json()
    // console.log('???', json)
    return json
}

const reqServices = {
    loging,
    logout,
    getCurrentUser
}

export default reqServices;