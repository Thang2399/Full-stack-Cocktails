import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from './pages/CartPage';

export default function App(): JSX.Element {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/about' element={<AboutPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/cocktail/:id' element={<DetailPage/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

