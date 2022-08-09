import React, {useState, useEffect, useContext, createContext} from 'react';
import {Drink, Notification} from '../types';
import {ERROR_CODE, MESSAGE_TYPE} from "../messages";

const url = "http://localhost:4400/api/drinks/?page="

const AppContext = createContext<any>(null);

const AppProvider = ({children}: { children: any }) => {
    const [notification, setNotification] = useState<Notification>({show: false, message: '', type: ''});
    const [inputValue, setInputValue] = useState<string>('a');
    const [loading, setLoading] = useState<boolean>(false);
    const [drinksList, setDrinksList] = useState<Drink[]>([]);

    // const [defaultPage, setDefaultPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    console.log(currentPage)

    const showNotification = (show: boolean, message: string, type: string) => {
        setNotification({show, message, type});
    };

    // const fetchDrinks = async () => {
    //     console.log(789);
    //     setLoading(true);
    //     try {
    //         // const res = await fetch(`${url}${inputValue}`);
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         console.log(data);
    //         console.log(456)
    //         // if (data.drinks !== null) {
    //         //     const drink = data.map((drink: any) => {
    //         //         const {
    //         //             id,
    //         //             drinkAlcoholic,
    //         //             drinkName,
    //         //             drinkThumb,
    //         //             drinkIngredient1,
    //         //             drinkIngredient2,
    //         //             drinkIngredient3,
    //         //             drinkIngredient4,
    //         //             drinkPrice
    //         //         } = drink;
    //         //         return {
    //         //             id,
    //         //             drinkAlcoholic,
    //         //             drinkName,
    //         //             drinkThumb,
    //         //             drinkIngredient1,
    //         //             drinkIngredient2,
    //         //             drinkIngredient3,
    //         //             drinkIngredient4,
    //         //             drinkPrice
    //         //         }
    //         //     });
    //         //     if (drink) {
    //         //         setDrinksList(drink);
    //         //         setLoading(false);
    //         //     }
    //         // } else {
    //         //     setDrinksList([]);
    //         //     setLoading(false);
    //         // }
    //     } catch (err: any) {
    //         if (err) {
    //             setLoading(false);
    //             showNotification(true, ERROR_CODE.SERVER_ERROR, MESSAGE_TYPE.DANGER)
    //         }
    //     }
    // }

    const handleChangePageSize = async (e: any, value: number) => {
        setCurrentPage(value);
        fetchDrinks(value);
    }

    const fetchDrinks = async (defaultPage: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}${defaultPage}`);
            const data = await response.json();
            console.log(data);
            if (data.drinks.length > 0) {
                const drinks = data.drinks.map((item: Drink) => {
                    const {
                        id,
                        drinkAlcoholic,
                        drinkName,
                        drinkThumb,
                        drinkIngredient1,
                        drinkIngredient2,
                        drinkIngredient3,
                        drinkIngredient4,
                        drinkPrice
                    } = item;
                    return {
                        id,
                        drinkAlcoholic,
                        drinkName,
                        drinkThumb,
                        drinkIngredient1,
                        drinkIngredient2,
                        drinkIngredient3,
                        drinkIngredient4,
                        drinkPrice
                    }
                });
                if (drinks) {
                    setDrinksList(drinks);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setDrinksList([])
                }
                if (data.pagination) {
                    console.log(data.pagination.current);
                    setCurrentPage(data.pagination.current);
                    setTotalPages(data.pagination.totalPages);
                }
            }
        } catch
            (err: any) {
            if (err) {
                setLoading(false);
                showNotification(true, ERROR_CODE.SERVER_ERROR, MESSAGE_TYPE.DANGER)
            }
        }
    }


    useEffect(() => {
        fetchDrinks(currentPage);
    }, [currentPage])

    return (
        <AppContext.Provider value={{
            notification,
            showNotification,
            setInputValue,
            loading,
            setLoading,
            drinksList,
            currentPage,
            totalPages,
            handleChangePageSize
        }}>
            {children}
        </AppContext.Provider>)
}

export const useGlobalContext = () => useContext<any>(AppContext);
export {AppContext, AppProvider}