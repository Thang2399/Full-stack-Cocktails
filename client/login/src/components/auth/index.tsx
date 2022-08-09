import React, {useState} from 'react';
import Login from "./login";
import Register from "./register";

const url = 'http://localhost:4400/api';

const Components = () => {
    const [showLogin, setShowLogin] = useState<boolean>(true);
    const toggleShowLogin = () => setShowLogin((showLogin: boolean) => !showLogin);

    return (
        <div className='w-full sm:w-3/5 xl:w-2/5 my-10 mx-auto p-6 rounded-md bg-white shadow-xl hover:shadow-2xl transition delay-150 text-center'>
            <div className='w-full xl:w-1/3 mx-auto flex justify-center xl:justify-between items-center mb-6'>
                <button
                    onClick={toggleShowLogin} disabled={showLogin}
                    className='py-2 px-5 bg-gray-200 rounded disabled:opacity-40 mr-2'
                >
                    Login
                </button>
                <button
                    onClick={toggleShowLogin} disabled={!showLogin}
                    className='py-2 px-5 bg-gray-200 rounded disabled:opacity-40'
                >
                    Register
                </button>
            </div>
            <div>
                {showLogin
                    ? <Login url={url}/>
                    : <Register url={url}/>
                }
            </div>
        </div>
    );
};

export default Components;
