import '../Styles/Login.css'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import { Base_URL } from '../Config/BaseURL';
import axios from 'axios';
import {toast} from 'react-toastify';


function Login(){


    const[values, setValues] = useState({

        email : "",
        password : "",

    })

    function handleInputs (e){
        setValues({...values , [e.target.name] : e.target.value})
    }

    function handleSubmit(){
        var reg_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        
        if(!reg_email.test(values.email))
        {
            toast.error('Please enter a valid  Email')
        }
        else if(values.password.trim().length < 7)
        {
            toast.error('Please enter a valid Password')
        }
        else
        {
            axios.post(Base_URL + '/login-user', values).then((res)=>{
                console.log(res)
                toast.success(res.data.message)
                localStorage.setItem('auth-id', res.data.data._id)
                window.location.reload()
            
            }).catch((err)=>{
                console.log(err)
                toast.error(err.response.data.message)

            })
        }
    }    



    return(
        <>
    <section class="vh-100">
    <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
    <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="https://img.freepik.com/free-photo/cyber-monday-retail-sales_23-2148688493.jpg?w=996&t=st=1694707048~exp=1694707648~hmac=a5685e1957092134a7a141c2831374e169544e26e692163cbb04223e3b60f1a2"
        class="img-fluid" alt="Phone image"/>
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
        
        <div class="form-outline mb-4">
            <input type="email" name = "email" values={values.email} onChange={handleInputs} id="form1Example13" class="form-control form-control-lg" placeholder="Email Address"/>
        </div>

        <div class="form-outline mb-4">
            <input type="password" name='password' value={values.password} onChange={handleInputs} id="form1Example23" class="form-control form-control-lg" placeholder="Password" />
        </div>
        <h5>Don't have an account <Link to='/register'>Register here</Link></h5>
        <button onClick={handleSubmit} type="submit" class="btn btn-primary btn-lg mb-1">Submit</button>
        </form>
        </div>
        </div>
        </div>
        </section>
        </>
    )
}
export default Login;