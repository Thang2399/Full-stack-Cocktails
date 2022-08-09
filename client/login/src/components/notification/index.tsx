import React from 'react';
import {MESSAGE_TYPE} from '../../messages';

type Props = {
    message: string,
    type: string,
    removeNotification: any
}

const Notification: React.FC<Props> = ({message, type, removeNotification}) => {
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            removeNotification(false, '', '')
        }, 2500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className='mb-4'>
            <h1 className='text-lg font-medium'
                style={{color: type === MESSAGE_TYPE.SUCCESS ? 'rgb(52 211 153)' : ' rgb(244 63 94)'}}>
                {message}
            </h1>
        </div>
    );
};

export default Notification;
