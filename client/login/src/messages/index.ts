export const HTTP_STATUS = {
    SUCCESS: 200,
    FORBIDDEN: 403
}

export const ERROR_CODE = {
    ER_DUP_ENTRY : 'ER_DUP_ENTRY',
    NOT_EXIST: 'NOT_EXIST',
    SERVER_ERROR: 'SERVER_ERROR'
}

export const MESSAGE_TYPE = {
    SUCCESS: 'success',
    DANGER: 'danger',
}

export const GENERAL = {
    NO_INPUT: 'Missing information!',
    NO_USERNAME: 'Username is required!',
    NO_PASSWORD: 'Password is required!',
    NO_REPEAT_PASSWORD: 'Repeat password is required!',
    NOT_ENOUGH_PASSWORD_CHARACTERS: 'Your password is not long enough! The password required at least 6 characters!',
    NOT_ENOUGH_REPEAT_PASSWORD_CHARACTERS: 'Your repeat password is not long enough! The password required at least 6 characters!',
}

export const LOGIN = {
    SUCCESS: 'Login successfully!',
    FAIL: 'Login fail! Please check your username and password carefully!',
    NOT_EXIST: 'This username is not exist!',
}

export const REGISTER = {
    SUCCESS: 'Register successfully! Please F5 to login again!',
    FAIL: 'Register fail! Please check your username and password carefully!',
    DUPLICATE_USERNAME: 'This username already exists! Please choose another username',
    REPEAT_PASSWORD_NOT_MATCH: 'Your repeat password is not match! Please check it again!'
}