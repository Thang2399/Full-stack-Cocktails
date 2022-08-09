import React from 'react';
import Navbar from "../components/navbar";
import List from '../components/list';

export default function HomePage(): JSX.Element {
    return (
        <div>
            <Navbar/>
            <List/>
        </div>
    );
};
