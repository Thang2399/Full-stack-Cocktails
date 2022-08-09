import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../searchInput';
import {AiOutlineShoppingCart, AiOutlineClose} from "react-icons/ai";
import {BsFillCartFill} from 'react-icons/bs';
import {GiHamburgerMenu} from 'react-icons/gi';

const logoUrl =
    "https://react-projects-15-cocktails.netlify.app/static/media/logo.9a3d2645.svg";

const Navbar = () => {
    let cartLength: any[] = [];

    return (
        <div className='flex justify-between items-center w-full py-5 px-10 shadow-xl'>
            <div className='w-1/5 h-1/3'>
                <Link to={'/'}>
                    <img src={logoUrl} alt="logo" className='w-full h-full'/>
                </Link>
            </div>
            <div className='w-1/3'>
                <SearchBar/>
            </div>
            <div className='flex justify-between items-center text-lg cursor-pointer'>
                <div className='mr-4'>
                    <Link to={'/'}>Home</Link>
                </div>
                <div className='mr-4'>
                    <Link to={'/about'}>About</Link>
                </div>
                <div className='w-8 h-8'>
                    <Link to={'/cart'}>
                        {cartLength.length > 0
                            ? <BsFillCartFill className='w-full h-full'/>
                            : <AiOutlineShoppingCart className='w-full h-full'/>
                        }
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
