import React from 'react';
import SingleItem from "./item";
import Loading from '../loading';
import {Pagination} from '@mui/material';
import {useGlobalContext} from '../../store';

export default function List(): JSX.Element {
    const {loading, drinksList, currentPage, totalPages, handleChangePageSize} = useGlobalContext();
    // const handleChangePageSize = (e: any) => {
    //     console.log(789);
    //     console.log(currentPage)
    // }

    if (loading) return <Loading/>
    else {
        if (drinksList.length > 0) {
            return (
                <div className='w-full'>
                    <div className='md:mx-20 py-10'>
                        <h1 className='text-center font-semibold text-2xl mb-4'>Your list:</h1>
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-4'>
                            {drinksList.map((drink: any) => <SingleItem key={drink.id} drink={drink}/>)}
                        </div>
                        <div className='flex justify-end mt-8'>
                            <Pagination count={totalPages} page={currentPage} shape='rounded' size='large'
                                        onChange={handleChangePageSize}/>
                        </div>
                    </div>
                </div>
            );
        } else return (
            <div className='mx-20 py-10'>
                <h1 className='text-center font-semibold text-2xl mb-4'>
                    Sorry! We don't have the drink you are looking for!
                </h1>
            </div>
        )
    }
};
