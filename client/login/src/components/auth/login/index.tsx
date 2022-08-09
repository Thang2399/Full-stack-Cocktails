import React, {useState, useEffect} from 'react';
import {useGlobalContext} from "../../../store";
import {ERROR_CODE, GENERAL, HTTP_STATUS, LOGIN, MESSAGE_TYPE} from "../../../messages";
import Notification from "../../notification";
import axios from "axios";

type Props = {
    url: string;
}

const Login: React.FC<Props> = ({url}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {notification, showNotification} = useGlobalContext();

    const handleError = (err: any) => {
        if (err &&
            err.response.data &&
            err.response.data.status === HTTP_STATUS.FORBIDDEN &&
            err.response.data.code === ERROR_CODE.NOT_EXIST
        ) {
            showNotification(true, LOGIN.NOT_EXIST, MESSAGE_TYPE.DANGER)
        } else showNotification(true, ERROR_CODE.SERVER_ERROR, MESSAGE_TYPE.DANGER)
    }

    const handleLogin = (e: any) => {
        e.preventDefault();
        if (!username || !password) {
            showNotification(true, GENERAL.NO_INPUT, MESSAGE_TYPE.DANGER)
        } else if (password.length < 6) {
            showNotification(true, GENERAL.NOT_ENOUGH_PASSWORD_CHARACTERS, MESSAGE_TYPE.DANGER)
        } else {
            axios.post(`${url}/login`, {username, password})
                .then((response: any) => {
                    console.log(response);
                    if (response) {
                        showNotification(true, LOGIN.SUCCESS, MESSAGE_TYPE.SUCCESS)
                    }
                }).catch((err: any) => {
                if (err) handleError(err)
            })
        }
    }

    return (
        <div>
            {notification.show && <Notification {...notification} removeNotification={showNotification}/>}
            <h1 className='text-3xl font-semibold mb-6'>Login</h1>
            <form className='w-4/5 mx-auto flex flex-col'>
                <div className='flex flex-col'>
                    <label htmlFor="username" className='text-lg mb-2'>Username:</label>
                    <input
                        type="text" name="username" id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e: any) => setUsername(e.target.value)}
                        className='p-3 bg-gray-200/80 rounded mb-4'
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
                    />
                </div>
                <button onClick={handleLogin}
                        className='w-1/3 mt-4 mx-auto p-3 bg-gray-200 hover:bg-gray-300 transition delay-150'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
