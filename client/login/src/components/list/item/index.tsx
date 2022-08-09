import React from 'react';
import {Link} from 'react-router-dom';
import {Drink} from "../../../types";

type Props = {
    drink: Drink
}

const SingleItem: React.FC<Props> = ({drink}) => {
    return (
        <div className='w-full h-full p-4 bg-white shadow-lg hover:shadow-xl transition delay-150 cursor-pointer'>
            <div className='w-full mb-4 pr-8'>
                <img src={drink.drinkThumb} alt={drink.drinkName} className='w-full'/>
            </div>
            <div>
                <h1 className='font-medium text-xl mb-1'>{drink.drinkName}</h1>
                <div className='flex flex-row justify-between items-center pr-8 mb-2'>
                    <p>{drink.drinkAlcoholic ? "Alcoholic" : "Not Alcoholic"}</p>
                    <h1 className='text-lg font-semibold'>$ {drink.drinkPrice}</h1>
                </div>
                <div className='flex flex-row justify-between items-center pr-8'>
                    <Link to={`/cocktail/${drink.id}`}>
                        <button
                            className='px-4 py-2 bg-gray-200 rounded-sm hover:bg-gray-500 hover:text-white transition delay-150'>
                            Details
                        </button>
                    </Link>
                    <button
                        className='px-4 py-2 bg-gray-500 rounded-sm hover:bg-gray-200 text-white hover:text-black transition delay-150'>
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleItem;
