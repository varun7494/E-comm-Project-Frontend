import {Routes ,Route } from 'react-router-dom';
import Login from '../Screens/Login';
import Register from '../Screens/Register';




const AuthRouting = ()=>{

    return(
        <>
        
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Register' element={<Register/>} />
            <Route path='*' element={<Login/>} />

        </Routes>
        </>
    )
}

export default AuthRouting;