import React, {useEffect, useState} from 'react';
import {useGlobalContext} from '../../../store';

import Notification from '../../notification'
import {ERROR_CODE, GENERAL, MESSAGE_TYPE, REGISTER} from "../../../messages";
import axios from "axios";

type Props = {
    url: string;
}

const Register: React.FC<Props> = ({url}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const {showNotification, notification} = useGlobalContext();
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleError = (err: any) => {
        if (err &&
            err.response.data &&
            err.response.data.code === ERROR_CODE.ER_DUP_ENTRY) {
            showNotification(true, REGISTER.DUPLICATE_USERNAME, MESSAGE_TYPE.DANGER)
        } else showNotification(true, ERROR_CODE.SERVER_ERROR, MESSAGE_TYPE.DANGER)

    }

    const handleRegister = (e: any) => {
        e.preventDefault();
        if (!username || !password || !repeatPassword) {
            showNotification(true, GENERAL.NO_INPUT, MESSAGE_TYPE.DANGER)
        } else if (password.length < 6) {
            showNotification(true, GENERAL.NOT_ENOUGH_PASSWORD_CHARACTERS, MESSAGE_TYPE.DANGER)
        } else if (repeatPassword.length < 6) {
            showNotification(true,
                GENERAL.NOT_ENOUGH_REPEAT_PASSWORD_CHARACTERS, MESSAGE_TYPE.DANGER)
        } else if (repeatPassword !== password) {
            showNotification(true, REGISTER.REPEAT_PASSWORD_NOT_MATCH, MESSAGE_TYPE.DANGER)
        } else {
            axios.post(`${url}/register`, {username, password})
                .then((response: any) => {
                    if (response) {
                        showNotification(true, REGISTER.SUCCESS, MESSAGE_TYPE.SUCCESS);
                        setDisabled(true);
                    }
                })
                .catch((err: any) => {
                    if (err) handleError(err)
                })
        }
    }

    return (
        <div>
            {notification.show && <Notification {...notification}/>}
            <h1 className='text-3xl font-semibold mb-6'>Register</h1>
            <form className='w-4/5 mx-auto flex flex-col'>
                <div className='flex flex-col'>
                    <label htmlFor="username" className='text-lg mb-2'>Username:</label>
                    <input
                        type="text" name="username" id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e: any) => setUsername(e.target.value)}
                        className='p-3 bg-gray-200/80 rounded mb-4'
                        disabled={disabled}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-lg mb-2'>Password:</label>
                    <input
                        type="password" name="password" id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        className='p-3 bg-gray-200/80 rounded mb-4'
                        disabled={disabled}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="repeatPassword" className='text-lg mb-2'>Repeat Password:</label>
                    <input
                        type="password" name="repeatPassword" id="repeatPassword"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={(e: any) => setRepeatPassword(e.target.value)}
                        className='p-3 bg-gray-200/80 rounded mb-4'
                        disabled={disabled}
                    />
                </div>
                <button onClick={handleRegister}
                        className='w-1/3 mt-4 mx-auto p-3 bg-gray-200 hover:bg-gray-300 transition delay-150'
                        disabled={disabled}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
