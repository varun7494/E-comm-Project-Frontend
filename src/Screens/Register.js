import '../Styles/Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react';
import { Base_URL } from '../Config/BaseURL';
import axios from 'axios';
import {toast} from 'react-toastify';


function Register(){
    const navigate = useNavigate()


    const[values, setValues] = useState({

        name : "",
        mobile : "",
        email : "",
        password : "",
        pincode : "",
        address : "",
        gender : "male",

    })

    function handleInputs (e){
        setValues({...values , [e.target.name] : e.target.value})
    }

    function handleSubmit(){
        var reg_mobile = /^[6-9]\d{9}$/
        var reg_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(values.name.trim() == "" || values.name.trim().length == 1)
        {
            toast.error('Please Enter Your Name')

        }
        else if(!reg_mobile.test(values.mobile))
        {
            toast.error('Please enter a valid  mobile number')

        }
        else if(!reg_email.test(values.email))
        {
            toast.error('Please enter a valid  Email')
        }
        else if(values.address.trim() == "" || values.address.trim().length == 1)
        {
            toast.error('Please enter a valid  Address')
        }
        else if(!values.gender)
        {
            toast.error('Please Select Your Gender')
        }
        else
        {
            axios.post(Base_URL + '/add-user', values).then((res)=>{
                console.log(res)
                toast.success(res.data.message)
                navigate('/login')
            
            }).catch((err)=>{
                console.log(err)
                toast.error(err.response.data.message)

            })
        }
    }
    function handleGenderSelect(e){
        setValues({...values, ['gender'] : e.target.value})
    }


    return(
        <>
        <section class="h-100 h-custom" style={{backgroundColor : "#8fc4b7" }}>
        <div class="container px-5">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-8 col-xl-6">
        <div class="card rounded-3">
        <img src="https://img.freepik.com/free-vector/e-commerce-illustration_1168-341.jpg?t=st=1694707594~exp=1694708194~hmac=0eb2a2b45833d7f6a167f6140397412665ae206150d4e637fdfe145d48e5a7c7"
            class="w-100 h-10"  alt="Sample photo"/>
            <div class="card-body p-4 p-md-5">
            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration</h3>

            <form class="px-md-2">
        <div class="form-group">
                <label for="exampleInputEmail1"></label>
                <input type="text" name="name" onChange={handleInputs} class="form-control" id="exampleInputEmail1" placeholder="Full Name"/>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"></label>
                <input type="email" name='email' onChange={handleInputs} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address"/>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"></label>
                <input type="tel" name='mobile' onChange={handleInputs} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mobile number"/>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"></label>
                <input type="number" name='pincode' onChange={handleInputs} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Pincode"/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail1"></label>
                <input type="text" name="address" onChange={handleInputs} class="form-control" id="exampleInputEmail1" placeholder="Address"/>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"></label>
                <select onChange={handleGenderSelect} class="form-control">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1"></label>
                <input type="text" name="password" onChange={handleInputs} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div class="form-group">
            <h5>Already have an account <Link to='/login'>Login here</Link></h5>
            </div>
            <div>
            <button type="submit" onClick={handleSubmit} class="btn btn-success btn-lg mb-1">Submit</button>
            </div>
        </form>
        </div>
        </div>
    </div>
    </div>
    </div>
    </section>
        </>
    )
}
export default Register;