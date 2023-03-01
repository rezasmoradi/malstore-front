export const getAuth = () => {
    try {
        return JSON.parse(localStorage.getItem('auth'))
    } catch (err) {
        console.log(err);
    }
}

export const setAuth = authData => {
    if (authData !== null) {
        localStorage.setItem('auth', JSON.stringify(authData))
    } else {
        localStorage.removeItem('auth')
    }
}