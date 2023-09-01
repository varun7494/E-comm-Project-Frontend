import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import { Base_URL } from "../Config/BaseURL";
import { useNavigate , useLocation } from "react-router-dom";




function Checkout(){

    const {state} = useLocation()
    console.log(state)

    var[addressFlag ,setAddressFlag] = useState(false)
    var [getAdress , setgetAddress] = useState([])
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
    return(

        <>
        {addressFlag == true ?
        <div style={{ width :"80%" , margin : "auto" }}>
        <div class="form-group">
            <label for="exampleFormControlInput1">House No.</label>
            <input type="text" name="house"value={new_address.house} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Enter House Numer"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Street</label>
            <input type="text" name ="street" value={new_address.street} onChange={handleInput}  class="form-control" id="exampleFormControlInput1" placeholder="Enter Street"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Landmark</label>
            <input type="text" name="landmark"value={new_address.landmark} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Enter Landmark"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">City</label>
            <input type="text" name="city"value={new_address.landmark} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Enter City"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">State</label>
            <input type="text" name="state"value={new_address.landmark} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Enter State"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Pin code</label>
            <input type="number" name="pincode"value={new_address.pincode} onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Enter Pincode"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Alter Mobile</label>
            <input type="number"value={new_address.alter_mobile} name="alter_mobile" onChange={handleInput} class="form-control" id="exampleFormControlInput1" placeholder="Enter Alter Mobile"/>
        </div>
        <button type="submit" class="btn btn-primary mb-2" onClick={handleAddNewAddressButton} >Add Address</button>
        
        </div>:

        <h1>This is Checkout Page</h1>
        }
        </>
    )
}
export default Checkout;