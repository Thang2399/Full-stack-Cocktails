import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

import {useGlobalContext} from "../store";
import Loading from "../components/loading";

import {Drink} from "../types";
import {ERROR_CODE, MESSAGE_TYPE} from "../messages";

const url = "http://localhost:4400/api/drinks/"

export default function DetailPage(): JSX.Element {
    const {id} = useParams();
    const {loading, setLoading, showNotification} = useGlobalContext();
    const [item, setItem] = useState<Drink | null>(null);

    const handleError = (err: any) => {
        if (err) {
            showNotification(true, ERROR_CODE.SERVER_ERROR, MESSAGE_TYPE.DANGER);
            console.log(err.response.data)
        }
    }

    const fetchDrink = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${url}${id}`);
            const data = await res.json();
            if (data) {
                setItem(data[0]);
                setLoading(false);
            } else {
                setItem(null);
                setLoading(false);
            }
        } catch (err: any) {
            setLoading(false);
            handleError(err);
        }
    }

    useEffect(() => {
        fetchDrink();
    }, [])

    if (loading) return <Loading/>
    return (
        <div className='md:mt-10 md:mx-4 lg:mx-20 p-6 bg-white shadow-xl h-full'>
            <div className='flex flex-col md:flex-row items-center'>
                <div className='w-full md:w-1/2 md:mr-10 md:pr-6 mb-4 md:mb-0'>
                    <img src={item?.drinkThumb} alt={item?.drinkName} className='w-full'/>
                </div>
                <div className='text-lg'>
                    <h1 className='font-semibold text-2xl mb-2'>{item?.drinkName}</h1>
                    <h1 className='font-semibold mb-2'>
                        Type: <span
                        className='font-normal'>{item?.drinkAlcoholic ? "Alcoholic" : "Not Alcoholic"}</span>
                    </h1>
                    <h1 className='font-semibold mb-2'>Ingredients:</h1>
                    {item?.drinkIngredient1 && <li>{item?.drinkIngredient1}</li>}
                    {item?.drinkIngredient2 && <li>{item?.drinkIngredient2}</li>}
                    {item?.drinkIngredient3 && <li>{item?.drinkIngredient3}</li>}
                    {item?.drinkIngredient4 && <li>{item?.drinkIngredient4}</li>}
                    <h1 className='font-semibold mb-2 mt-2'>
                        Price: <span
                        className='font-normal'>${item?.drinkPrice}</span>
                    </h1>
                    <div className='mt-2'>
                        <Link to='/'>
                            <button className='py-2 px-4 bg-gray-100 mr-4 hover:bg-gray-200'>
                                Back home
                            </button>
                        </Link>
                        <button className='py-2 px-4 bg-gray-500 text-white'>Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
