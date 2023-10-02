import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import { Base_URL } from "../Config/BaseURL";
import { useNavigate , useLocation } from "react-router-dom";




function Checkout(){

    const navigate = useNavigate()

    const {state} = useLocation()
    console.log(state)

    var[addressFlag ,setAddressFlag] = useState(false)
    var [getAddress , setgetAddress] = useState([])
    var [new_address, setNewAddress] = useState({
        house : "",
        street : "",
        landmark : "",
        city : "",
        state : "",
        pincode : "",
        alter_mobile :"",
        primary : true
    })


    function checkAddress (){
        var id = localStorage.getItem('auth-id')

        axios.get(Base_URL + '/get-user-addresses', {params : {u_id : id}}).then((res)=>{
            setgetAddress(res.data.data)
            toast.success(res.data.message)
            setAddressFlag(false)
        }).catch((err)=>{
            setAddressFlag(true)
            toast.error(err.response.data.message)
        })
    }


    useEffect(()=>{
        checkAddress()
    },[])


    const handleInput = (e) =>{
        setNewAddress({...new_address , [e.target.name] : e.target.value})
    }
    
    const handleAddNewAddressButton = () => {

        var data = {

            u_id : localStorage.getItem('auth-id'),
            addresses : [new_address]
        }
        axios.post(Base_URL + '/update-addresses', data).then((res)=>{
            toast.success(res.data.message)
            checkAddress()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }
    

    const PlaceMyOrder = ()=>{
        var data = {
            u_id : localStorage.getItem('auth-id'),
            order_data : state
        }
        axios.post(Base_URL + '/place_order', data).then((res)=>{
            toast.success(res.data.message)
            navigate('/mycart')
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }
    const handleAddNewAddress= ()=>{
        setAddressFlag(true)
    }


    return(
        

        <>
        
        {addressFlag == true ?
        <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
        <div class="row justify-content-center align-items-center h-100">
        <div class="col-12 col-lg-9 col-xl-7">
        <div class="card shadow-2-strong card-registration" >
        <div class="card-body p-4 p-md-5">
        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Address</h3>
        <form class="px-md-2">
        <div class="form-group">
        <div class="form-group">
            <label for="exampleFormControlInput1"></label>
            <input type="text" name="house"value={new_address.house} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="House Numer"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"></label>
            <input type="text" name ="street" value={new_address.street} onChange={handleInput}  class="form-control" id="exampleFormControlInput1" placeholder="Street"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"></label>
            <input type="text" name="landmark"value={new_address.landmark} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Landmark"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"></label>
            <input type="text" name="city"value={new_address.city} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="City"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"></label>
            <input type="text" name="state"value={new_address.state} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="State"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"></label>
            <input type="number" name="pincode" value={new_address.pincode} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Pincode"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"></label>
            <input type="tel" value={new_address.alter_mobile} name="alter_mobile" onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder= "Mobile Number"/>
        </div>
        <button type="submit" class="btn btn-primary btn-lg mb-1" onClick={handleAddNewAddressButton} >Add Address</button>
        
        
        </div>
        
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>:
        
        <div style={{ width :"80%" ,display:"flex" ,justifyContent : "center",alignItems : "center", margin : "auto" }}>
        <div class="card bg-light mb-3" style={{width: "18rem"}}>
        <div class="card-header">Your order is eligible for FREE delivery.Select this option at chechout.Details</div>
        <div class="card-body">
            <h5 class="card-title">Order Registered Successfully</h5>
            <button onClick={PlaceMyOrder} class="btn btn-warning" style={{width  :"100%" ,  borderRadius:10 ,  marginTop  :10}}>Place Order</button>
            <a onClick={()=>{handleAddNewAddress()}} class="btn btn-primary" style={{width  :"100%" ,  borderRadius:10 ,  marginTop  :10}}>Add New Address</a>
        </div>
        </div>
        
        </div>

        }

<hr></hr>

<>
{Array.isArray(getAddress) && getAddress.length > 0 ?

<>
{getAddress.map((el,i)=>(

<div class="card" style={{width: '18rem'}}>
    <div class="card-body">
    <h5 class="card-title">Primary Address</h5>
    <p class="card-text">
        <h5>{el.house}</h5>
        <h5>{el.street}</h5>
        <h5>{el.landmark}</h5>
        <h5>{el.pincode}</h5>
    </p>
    
    </div>
</div> 

))}
    </>
: null }    
</>
</>

    )
}
export default Checkout;