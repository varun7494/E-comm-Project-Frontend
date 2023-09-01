import {Routes ,Route } from 'react-router-dom';
import Home from '../Screens/Home';
import About from '../Screens/About';
import Products from '../Screens/Products';
import Contacts from '../Screens/Contacts';
import Navbar from '../Layout/Navbar';
import ViewProduct from '../Screens/ViewProduct';
import Checkout from '../Screens/Checkout';
import Cart from '../Screens/Cart';



const AllRouting = ({countOfCart})=>{

    return(
        <>
        <Navbar countOfCart = {countOfCart} />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/mycart' element={<Cart/>} />
            <Route path='/products/:id' element={<ViewProduct/>} />
            <Route path='/contacts' element={<Contacts/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='*' element={<Home/>} />
        </Routes>
        
        
        </>
    )
}

export default AllRouting;