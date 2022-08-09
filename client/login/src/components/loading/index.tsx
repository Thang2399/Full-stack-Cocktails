import Spin from 'react-cssfx-loading/lib/Spin';
import React from "react";

export default function Loading (): JSX.Element {
    return (
        <div className='mt-40 flex justify-center items-center'>
            <Spin color="#9CA3AF" width="75px" height="75px" duration="3s" />
        </div>
    );
};
