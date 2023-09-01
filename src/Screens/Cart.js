import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import { Base_URL } from "../Config/BaseURL";
import { useNavigate } from "react-router-dom";
import "../Styles/Cart.css";





function Cart() {
    const navigate = useNavigate()

    const [data, setCartData] = useState(0)

    function getCartCount(){
        let u_id = localStorage.getItem('auth-id')
        axios.get(Base_URL + '/get-cart-with-products',{params : {u_id : u_id} }).then((res)=>{
        console.log(res.data.data)
            setCartData(res.data.data)
        }).catch((err)=>{
        setCartData([])
        
        })
    
    }


    useEffect(()=>{
        getCartCount()
    },[])

    const incre= (item) =>{
        axios.post (Base_URL + '/update-cart-quantity', {c_id : item._id , type : "INCRE"}).then((res)=>{
            toast.success(res.data.message)
            window.location.reload()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    const decre= (item) => {
        axios.post (Base_URL + '/update-cart-quantity', {c_id : item._id , type : "DECRE"}).then((res)=>{
            toast.success(res.data.message)
            window.location.reload()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }
    const calculateSubtotal = () =>{

        var temp = data;
        var subt = 0

        for(let i=0 ; i < temp.length ; i++)
        {
            subt = subt + (Number(temp[i].pro_data.price) - Number(temp[i].pro_data.discount / 100) * Number(temp[i].pro_data.price))
        }

        console.log(subt)
        return subt;


    }
    
    
    
    return(
        
        <>
        <div class="container">
        <div class="row">
        <div class="col-8">
        {Array.isArray(data) && data.length > 0 ?
        <>
        {data.map((el,i)=>(

            <div class="card bg-light mb-3" style={{width: "18rem" }}>
            <img class="card-img-top bg-light mb-3" src={el.pro_data.image} alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">{el.pro_data.p_name}</h5>
                <p class="card-text"><span style={{color : 'red' ,fontWeight : "bold" ,fontSize : "15px"}}>{`-${el.pro_data.discount}%`}</span><span style = {{marginLeft : 10 ,fontSize : 20}}>&#x20B9; </span><span>{(el.pro_data.price - (el.pro_data.discount / 100) * el.pro_data.price)} </span></p>
                <p class="card-text">M.R.P. <span>&#x20B9; </span><del>{el.pro_data.price}</del></p>
                <button onClick={()=>{decre(el)}}  class="btn btn-danger">-</button>
                <input style ={{textAlign : "center" , width : "20%" , height :"35px" ,marginLeft : 1 ,marginRight : 1 }} disabled ={true} value={el.quantity}/>
                <button onClick={()=>{incre(el)}}  class="btn btn-success">+</button>
                {/* <a onClick={()=>{handleViewMore(el)}} class="btn btn-primary" style = {{marginRight : 10}}>View More</a>
                <button disabled={el.disable == true ? true : false} onClick={()=>{addToCart(el)}}  class="btn btn-success">{el.disable == true ? "Already Added" : "Add To Cart"}</button> */}
            </div>
            </div>
            
        ))}
        
        
        </> : null }
        </div>
        <div class="col-4">
        <div class="card bg-light mb-3" style={{width: "18rem"}}>
        <div class="card-header">Your order is eligible for FREE delivery.Select this option at chechout.Details</div>
        <div class="card-body">
            <h5 class="card-title">Subtotal : ( {`${data.length} Items`} : {calculateSubtotal()}) </h5>
            <a onClick={()=>navigate('/Checkout' , {state : data})} class="btn btn-warning">Proceed to Checkout</a>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        
        </>

    )
    


}

export default Cart;