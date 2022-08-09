import React, {useRef} from 'react';
import {useGlobalContext} from '../../store';

const SearchBar = () => {
    const {setInputValue} = useGlobalContext();
    const value: any = useRef<string | null>('');
    const handleChange = (e: any) => setInputValue(e.target.value)

    return (
        <div className='w-full h-1/3'>
            <form onSubmit={(e: any) => e.preventDefault()}>
                <input type="text" id="search" placeholder={'Search your favorite drink'}
                       className='w-full bg-gray-100 py-2 px-3 rounded'
                       ref={value}
                       onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default SearchBar;
