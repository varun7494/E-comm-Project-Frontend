import "../Styles/Home.css";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import { Base_URL } from "../Config/BaseURL";
import { useNavigate } from "react-router-dom";

function Home({color}){
    const navigate = useNavigate()

    var [data , setData] = useState([])

    function getProductsData(){

        axios.get(Base_URL + '/get-product').then((res_of_products)=>{

            let u_id = localStorage.getItem('auth-id')
            axios.get(Base_URL + '/get-cart-count', {params : {u_id : u_id} }).then((res_of_cart)=>{
            
            let prod_arr = res_of_products.data.data;
            let cart_arr = res_of_cart.data.data;

            for(let i = 0 ; i < prod_arr.length ; i++ )
            {
                for(let j = 0 ; j < cart_arr.length ; j++ )
                {
                    if(prod_arr[i]._id == cart_arr[j].p_id)
                    {
                    prod_arr[i] ['disable'] = true
                    }
                }
            }
            console.log(prod_arr)
            setData(prod_arr)
            
            }).catch((err)=>{
                setData([])
        
        })

        }).catch((err)=>{
            setData([])
        })

    }

    useEffect(()=>{

    getProductsData()




    },[])

    const addToCart = (item) =>{
        console.log(item)
        var u_id =localStorage.getItem('auth-id')
        let data = {
            u_id : u_id,
            p_id : item._id,
            quantity : 1
        }
        axios.post(Base_URL + '/add-to-cart', data).then((res)=>{
                toast.success(res.data.message)
                window.location.reload()
        }).catch((err)=>{
            toast.error((err.response.data.message))
        })
    }

    const handleViewMore = (item)=>{

        console.log(item)
        

        navigate(`/products/${item._id}` , {state : item} )
            

    }



    return(
        <>
        <div class="container">
        <div class="column">
        <div class="col-8">
        {Array.isArray(data) && data.length > 0 ?
        <>
        {data.map((el,i)=>(

            <div class="card bg-light mb-3" style={{width: "18rem" }}>
            <img class="card-img-top bg-light mb-3" src={el.image} alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">{el.p_name}</h5>
                <p class="card-text"><span style={{color : 'red' ,fontWeight : "bold" ,fontSize : "15px"}}>{`-${el.discount}%`}</span><span style = {{marginLeft : 10 ,fontSize : 20}}>&#x20B9; </span>{(el.price - (el.discount / 100) * el.price)} <span></span></p>
                <p class="card-text">M.R.P. <span>&#x20B9;</span><del>{el.price}</del></p>
                <a onClick={()=>{handleViewMore(el)}} class="btn btn-primary" style = {{marginRight : 10}}>View More</a>
                <button disabled={el.disable == true ? true : false} onClick={()=>{addToCart(el)}}  class="btn btn-success">{el.disable == true ? "Already Added" : "Add To Cart"}</button>
            </div>
            </div>
            
        ))}
        
        
        </> : null }
        </div>
        </div>
        </div>
        </>
    )



    
}
export default Home;